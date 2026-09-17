import React, { useEffect, useState } from 'react';
import { BookOpen, Search, Download, ArrowLeft, FileText, Lock, Plus, Upload, X } from 'lucide-react';
import { sanityClient } from '../sanityClient';
import { motion } from 'framer-motion';
import Footer from './Footer';

interface StudyMaterial {
  _id: string;
  title: string;
  classLevel: string;
  subject: string;
  notes?: string;
  fileUrl?: string;
  dateAdded: string;
}

interface StudentPortalProps {
  onBack: () => void;
}

const StudentPortal: React.FC<StudentPortalProps> = ({ onBack }) => {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Upload form states
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    classLevel: 'primary-5',
    subject: '',
    notes: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState({ type: '', text: '' });

  const classes = [
    { label: 'All Classes', value: 'all' },
    { label: 'Primary 5', value: 'primary-5' },
    { label: 'Primary 6', value: 'primary-6' },
    { label: 'JSS 1', value: 'jss-1' },
    { label: 'JSS 2', value: 'jss-2' },
    { label: 'JSS 3', value: 'jss-3' },
    { label: 'SSS 1', value: 'sss-1' },
    { label: 'SSS 2', value: 'sss-2' },
    { label: 'SSS 3', value: 'sss-3' },
  ];

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const query = `*[_type == "studyMaterial"] | order(dateAdded desc) {
        _id,
        title,
        classLevel,
        subject,
        notes,
        "fileUrl": file.asset->url,
        dateAdded
      }`;
      const data = await sanityClient.fetch(query);
      setMaterials(data || []);
    } catch (error) {
      console.error("Failed to fetch study materials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAdmin(true);
      setShowLogin(false);
      setLoginError('');
      setPassword('');
    } else {
      setLoginError('Incorrect password');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.subject) {
      setUploadMessage({ type: 'error', text: 'Title and Subject are required.' });
      return;
    }
    
    setIsUploading(true);
    setUploadMessage({ type: 'info', text: 'Uploading note...' });

    try {
      let fileAssetId = null;
      
      // We must create a dedicated write client since the default client has useCdn: true which blocks mutations
      // In a real app, the token would be strictly kept secret
      const writeClient = sanityClient.withConfig({
        token: import.meta.env.VITE_SANITY_WRITE_TOKEN,
        useCdn: false
      });

      // 1. Upload file if exists
      if (selectedFile) {
        setUploadMessage({ type: 'info', text: 'Uploading PDF document...' });
        const asset = await writeClient.assets.upload('file', selectedFile, {
          filename: selectedFile.name
        });
        fileAssetId = asset._id;
      }

      setUploadMessage({ type: 'info', text: 'Saving study material...' });
      
      // 2. Create document
      const doc = {
        _type: 'studyMaterial',
        title: formData.title,
        classLevel: formData.classLevel,
        subject: formData.subject,
        notes: formData.notes,
        dateAdded: new Date().toISOString().split('T')[0],
        ...(fileAssetId && {
          file: {
            _type: 'file',
            asset: {
              _type: 'reference',
              _ref: fileAssetId
            }
          }
        })
      };

      await writeClient.create(doc);
      
      setUploadMessage({ type: 'success', text: 'Note uploaded successfully!' });
      
      // Reset form
      setFormData({ title: '', classLevel: 'primary-5', subject: '', notes: '' });
      setSelectedFile(null);
      
      // Refresh list
      setTimeout(() => {
        setShowUploadForm(false);
        setUploadMessage({ type: '', text: '' });
        fetchMaterials();
      }, 1500);

    } catch (error: any) {
      console.error("Upload failed:", error);
      if (error.message && error.message.includes("Mutation")) {
         setUploadMessage({ type: 'error', text: 'Write token is missing. Please add VITE_SANITY_WRITE_TOKEN to your .env file.' });
      } else {
         setUploadMessage({ type: 'error', text: 'Failed to upload. Check console for details.' });
      }
    } finally {
      setIsUploading(false);
    }
  };

  const filteredMaterials = materials.filter(material => {
    const matchesClass = selectedClass === 'all' || material.classLevel === selectedClass;
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          material.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col relative z-[60]">
      <div className="bg-brand-dark text-white py-4 px-6 md:px-12 flex items-center justify-between shadow-lg">
        <button onClick={onBack} className="flex items-center text-sm font-medium hover:text-brand-gold transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Website
        </button>
        <div className="flex items-center font-serif text-xl font-bold">
          <BookOpen className="w-6 h-6 text-brand-gold mr-2" />
          Student Portal
        </div>
        <div>
          {!isAdmin ? (
            <button 
              onClick={() => setShowLogin(true)} 
              className="text-xs md:text-sm font-medium text-gray-300 hover:text-white flex items-center"
            >
              <Lock className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" /> Teacher Login
            </button>
          ) : (
            <button 
              onClick={() => setIsAdmin(false)} 
              className="text-xs md:text-sm font-medium text-brand-gold hover:text-white"
            >
              Log Out
            </button>
          )}
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Admin Login Modal */}
        {showLogin && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
              <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold font-serif mb-2">Teacher Login</h2>
              <p className="text-gray-500 mb-6 text-sm">Enter the admin password to upload notes.</p>
              
              <form onSubmit={handleLogin}>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none mb-4"
                  autoFocus
                />
                {loginError && <p className="text-red-500 text-sm mb-4">{loginError}</p>}
                <button type="submit" className="w-full py-3 bg-brand-dark text-white rounded-lg font-bold hover:bg-gray-800 transition-colors">
                  Login
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-dark font-serif mb-4">Study <span className="italic font-light text-brand-gold">Materials.</span></h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Download notes and study guides uploaded by your teachers.</p>
          
          {isAdmin && (
            <button 
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="mt-6 mx-auto flex items-center px-6 py-3 bg-brand-gold text-white rounded-full font-bold shadow-lg hover:bg-yellow-600 transition-all transform hover:scale-105"
            >
              {showUploadForm ? <X className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
              {showUploadForm ? 'Cancel Upload' : 'Upload New Note'}
            </button>
          )}
        </div>

        {/* Upload Form */}
        {isAdmin && showUploadForm && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-12 bg-white rounded-2xl shadow-xl border border-brand-gold/20 overflow-hidden"
          >
            <div className="p-6 md:p-8 bg-brand-dark text-white">
              <h2 className="text-2xl font-bold font-serif flex items-center">
                <Upload className="w-6 h-6 mr-3 text-brand-gold" /> Upload Study Material
              </h2>
            </div>
            
            <form onSubmit={handleUpload} className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Week 1: Introduction to Algebra"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Mathematics"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class Level <span className="text-red-500">*</span></label>
                  <select 
                    value={formData.classLevel}
                    onChange={(e) => setFormData({...formData, classLevel: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                  >
                    {classes.filter(c => c.value !== 'all').map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PDF Document (Optional)</label>
                  <input 
                    type="file" 
                    accept="application/pdf"
                    onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-gold/10 file:text-brand-dark hover:file:bg-brand-gold/20"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Text Notes (Optional)</label>
                  <textarea 
                    rows={4}
                    placeholder="Type notes here if you don't have a PDF to upload..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                  ></textarea>
                </div>
              </div>

              {uploadMessage.text && (
                <div className={`p-4 rounded-lg ${uploadMessage.type === 'error' ? 'bg-red-50 text-red-700' : uploadMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                  {uploadMessage.text}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isUploading}
                className={`w-full md:w-auto px-8 py-3 rounded-lg font-bold text-white flex items-center justify-center transition-colors ${isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-dark hover:bg-gray-800'}`}
              >
                {isUploading ? (
                  <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div> Uploading...</>
                ) : (
                  <><Upload className="w-5 h-5 mr-2" /> Publish Note</>
                )}
              </button>
            </form>
          </motion.div>
        )}

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-10 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by subject or title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-brand-gold focus:bg-white transition-all outline-none"
            />
          </div>
          
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {classes.map(c => (
              <button
                key={c.value}
                onClick={() => setSelectedClass(c.value)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedClass === c.value 
                    ? 'bg-brand-dark text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-gold"></div>
          </div>
        ) : filteredMaterials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={material._id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-brand-gold/10 text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    {classes.find(c => c.value === material.classLevel)?.label || material.classLevel}
                  </span>
                  <span className="text-gray-400 text-xs">{new Date(material.dateAdded).toLocaleDateString()}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1">{material.subject}</h3>
                <h4 className="text-md text-gray-600 mb-4">{material.title}</h4>
                
                {material.notes && (
                  <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg mb-4 whitespace-pre-wrap italic">
                    "{material.notes}"
                  </div>
                )}
                
                <div className="mt-auto pt-4 border-t border-gray-50">
                  {material.fileUrl ? (
                    <a 
                      href={material.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-2.5 bg-brand-gold text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" /> Download PDF
                    </a>
                  ) : (
                    <div className="flex items-center justify-center w-full py-2.5 bg-gray-100 text-gray-500 rounded-lg font-medium">
                      <FileText className="w-4 h-4 mr-2" /> Text Note Only
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 border-dashed">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No materials found</h3>
            <p className="text-gray-500 mt-1">Check back later or try a different search.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default StudentPortal;
