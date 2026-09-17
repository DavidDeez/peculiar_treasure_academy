import React, { useEffect, useState } from 'react';
import { BookOpen, Search, Download, ArrowLeft, FileText, Lock, Plus, Upload, X, Trash2, Edit, Image as ImageIcon } from 'lucide-react';
import { sanityClient } from '../sanityClient';
import { motion } from 'framer-motion';

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

const StudentPortal: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    classLevel: 'primary-5',
    subject: '',
    notes: '',
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadMessage, setUploadMessage] = useState({ type: '', text: '' });

  const classes = [
    { value: 'all', label: 'All Classes' },
    { value: 'primary-5', label: 'Primary 5' },
    { value: 'primary-6', label: 'Primary 6' },
    { value: 'jss-1', label: 'JSS 1' },
    { value: 'jss-2', label: 'JSS 2' },
    { value: 'jss-3', label: 'JSS 3' },
    { value: 'sss-1', label: 'SSS 1' },
    { value: 'sss-2', label: 'SSS 2' },
    { value: 'sss-3', label: 'SSS 3' },
  ];

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const query = `*[_type == "studyMaterial"] | order(dateAdded desc)[0...200] {
        _id,
        title,
        classLevel,
        subject,
        notes,
        "fileUrl": file.asset->url,
        "fileUrls": files[].asset->url,
        dateAdded
      }`;
      // Bypass CDN to ensure freshly edited notes appear immediately
      const readClient = sanityClient.withConfig({ useCdn: false });
      const data = await readClient.fetch(query);
      setMaterials(data);
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

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) return resolve(file);
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 1200;
          let { width, height } = img;
          
          if (width > height && width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: 'image/jpeg' }));
            } else {
              resolve(file);
            }
          }, 'image/jpeg', 0.7);
        };
        img.onerror = () => resolve(file);
      };
      reader.onerror = () => resolve(file);
    });
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.subject) {
      setUploadMessage({ type: 'error', text: 'Title and Subject are required.' });
      return;
    }
    
    setIsUploading(true);
    setUploadMessage({ type: 'info', text: editingId ? 'Updating note...' : 'Uploading note...' });

    try {
      const writeClient = sanityClient.withConfig({
        token: import.meta.env.VITE_SANITY_WRITE_TOKEN,
        useCdn: false
      });

      // 1. Upload files if exist
      const fileAssets = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const isImage = file.type.startsWith('image/');
        setUploadMessage({ type: 'info', text: `Uploading file ${i + 1} of ${selectedFiles.length} (${isImage ? 'Image' : 'PDF'})...` });
        const optimizedFile = await compressImage(file);
        
        const asset = await writeClient.assets.upload('file', optimizedFile, {
          filename: optimizedFile.name
        });
        fileAssets.push({
          _key: `file-${Date.now()}-${i}`,
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        });
      }

      setUploadMessage({ type: 'info', text: 'Saving study material...' });
      
      // 2. Create or Update document
      const docData: any = {
        _type: 'studyMaterial',
        title: formData.title,
        classLevel: formData.classLevel,
        subject: formData.subject,
        notes: formData.notes,
      };

      if (fileAssets.length > 0) {
        docData.files = fileAssets;
      }

      if (editingId) {
        await writeClient.patch(editingId).set(docData).commit();
        setUploadMessage({ type: 'success', text: 'Note updated successfully!' });
      } else {
        await writeClient.create({
          _type: 'studyMaterial',
          dateAdded: new Date().toISOString().split('T')[0],
          ...docData
        });
        setUploadMessage({ type: 'success', text: 'Note uploaded successfully!' });
      }
      
      // Reset form
      setFormData({ title: '', classLevel: 'primary-5', subject: '', notes: '' });
      setSelectedFiles([]);
      setEditingId(null);
      
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
         setUploadMessage({ type: 'error', text: 'Failed to save. Check console for details.' });
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditClick = (material: StudyMaterial) => {
    setFormData({
      title: material.title,
      classLevel: material.classLevel,
      subject: material.subject,
      notes: material.notes || '',
    });
    setEditingId(material._id);
    setShowUploadForm(true);
    setUploadMessage({ type: '', text: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setFormData({ title: '', classLevel: 'primary-5', subject: '', notes: '' });
    setEditingId(null);
    setShowUploadForm(false);
    setUploadMessage({ type: '', text: '' });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this study material?")) return;
    
    try {
      const writeClient = sanityClient.withConfig({
        token: import.meta.env.VITE_SANITY_WRITE_TOKEN,
        useCdn: false
      });
      await writeClient.delete(id);
      fetchMaterials();
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Failed to delete. Make sure your write token is correct.");
    }
  };

  const filteredMaterials = materials.filter(material => {
    const matchesClass = selectedClass === 'all' || material.classLevel === selectedClass;
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          material.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  return (
    <div className="flex flex-col relative z-10 min-h-screen">
      <div className="bg-brand-dark text-white py-4 px-4 md:px-12 shadow-lg relative flex items-center justify-between">
        <div className="flex-1 flex justify-start z-10">
          <button 
            onClick={onBack} 
            className="flex items-center text-xs md:text-sm font-medium hover:text-white text-gray-300 transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4 md:mr-2" /> 
            <span className="hidden md:inline">Back to Website</span>
            <span className="md:hidden ml-1">Back</span>
          </button>
        </div>
        
        <div className="flex items-center justify-center font-serif text-lg md:text-xl font-bold absolute left-1/2 transform -translate-x-1/2 w-max">
          <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-brand-gold mr-2" />
          <span className="hidden md:inline">Student&nbsp;</span>Portal
        </div>
        
        <div className="flex-1 flex justify-end z-10">
          {!isAdmin ? (
            <button 
              onClick={() => setShowLogin(true)} 
              className="text-[11px] md:text-sm font-bold text-brand-dark bg-brand-gold hover:bg-yellow-500 px-3 md:px-4 py-2 rounded-full flex items-center shadow-md transition-colors"
            >
              <Lock className="w-3 h-3 md:w-4 md:h-4 mr-1.5" /> Login
            </button>
          ) : (
            <button 
              onClick={() => setIsAdmin(false)} 
              className="text-[11px] md:text-sm font-bold text-white border border-red-500/50 bg-red-500/20 hover:bg-red-500/40 px-3 md:px-4 py-2 rounded-full transition-colors"
            >
              Logout
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
              onClick={() => {
                if (editingId) cancelEdit();
                else setShowUploadForm(!showUploadForm);
              }}
              className="mt-6 mx-auto flex items-center px-6 py-3 bg-brand-gold text-white rounded-full font-bold shadow-lg hover:bg-yellow-600 transition-all transform hover:scale-105"
            >
              {showUploadForm ? <X className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
              {showUploadForm ? (editingId ? 'Cancel Edit' : 'Cancel Upload') : 'Upload New Note'}
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
                {editingId ? <Edit className="w-6 h-6 mr-3 text-brand-gold" /> : <Upload className="w-6 h-6 mr-3 text-brand-gold" />} 
                {editingId ? 'Edit Study Material' : 'Upload Study Material'}
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
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Text Notes</label>
                  <textarea 
                    rows={4}
                    placeholder="Type study notes or instructions here..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {editingId ? 'Replace Attached File (PDF or Image, Optional)' : 'Attach a File (PDF or Image, Optional)'}
                  </label>
                    <input 
                      type="file" 
                      multiple
                      accept="application/pdf, image/*"
                      onChange={(e) => setSelectedFiles(e.target.files ? Array.from(e.target.files) : [])}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-gold/10 file:text-brand-dark hover:file:bg-brand-gold/20"
                    />
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
                  <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div> {editingId ? 'Updating...' : 'Uploading...'}</>
                ) : (
                  <><Upload className="w-5 h-5 mr-2" /> {editingId ? 'Save Changes' : 'Publish Note'}</>
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
          
          <div className="grid grid-cols-3 md:flex md:flex-wrap gap-1.5 md:gap-2 md:justify-center">
            {classes.map(c => (
              <button
                key={c.value}
                onClick={() => setSelectedClass(c.value)}
                className={`px-1.5 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-full text-[10px] md:text-sm font-bold md:font-medium transition-colors text-center ${
                  selectedClass === c.value 
                    ? 'bg-brand-dark text-white shadow-sm md:shadow-md' 
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
                className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group flex flex-col h-full ${expandedNoteId === material._id ? 'md:col-span-2 lg:col-span-3' : ''}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-brand-gold/10 text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    {classes.find(c => c.value === material.classLevel)?.label || material.classLevel}
                  </span>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-gray-400 text-xs">{new Date(material.dateAdded).toLocaleDateString()}</span>
                    {isAdmin && (
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEditClick(material)} 
                          className="text-blue-500 hover:text-blue-700 text-[10px] font-bold bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors flex items-center"
                          title="Edit Material"
                        >
                          <Edit className="w-3 h-3 mr-1" /> Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(material._id)} 
                          className="text-red-500 hover:text-red-700 text-[10px] font-bold bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition-colors flex items-center"
                          title="Delete Material"
                        >
                          <Trash2 className="w-3 h-3 mr-1" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1">{material.subject}</h3>
                <h4 className="text-md text-gray-600 mb-4">{material.title}</h4>
                
                {material.notes && (
                  <div 
                    onClick={() => setExpandedNoteId(expandedNoteId === material._id ? null : material._id)}
                    className={`text-sm text-gray-500 bg-gray-50 p-3 rounded-lg mb-4 whitespace-pre-wrap italic cursor-pointer hover:bg-gray-100 transition-all duration-300 ${expandedNoteId === material._id ? '' : 'line-clamp-3'}`}
                    title="Click to expand/collapse"
                  >
                    "{material.notes}"
                  </div>
                )}
                {material.notes && material.notes.length > 120 && expandedNoteId !== material._id && (
                  <div className="text-center -mt-3 mb-4">
                    <button 
                      onClick={() => setExpandedNoteId(material._id)}
                      className="text-[10px] text-brand-gold font-bold uppercase tracking-wider bg-yellow-50 px-2 py-0.5 rounded-full"
                    >
                      Read More
                    </button>
                  </div>
                )}
                
                  <div className="mt-auto pt-4 border-t border-gray-50 flex flex-col gap-2">
                    {(material.fileUrls?.length ? material.fileUrls : material.fileUrl ? [material.fileUrl] : []).map((url, index, arr) => (
                      <a 
                        key={index}
                        href={`${url}?dl=`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full py-2 bg-brand-gold text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors text-sm"
                      >
                        {url.match(/\.(jpeg|jpg|gif|png|webp)/i) ? (
                          <><ImageIcon className="w-4 h-4 mr-2" /> View Image {arr.length > 1 ? index + 1 : ''}</>
                        ) : (
                          <><Download className="w-4 h-4 mr-2" /> Download PDF {arr.length > 1 ? index + 1 : ''}</>
                        )}
                      </a>
                    ))}
                    {!material.fileUrl && (!material.fileUrls || material.fileUrls.length === 0) && (
                      <div className="flex items-center justify-center w-full py-2 bg-gray-100 text-gray-500 rounded-lg font-medium text-sm">
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
    </div>
  );
};

export default StudentPortal;
