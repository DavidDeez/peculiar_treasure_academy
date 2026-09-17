import React, { useEffect, useState } from 'react';
import { BookOpen, Search, Download, ArrowLeft, FileText } from 'lucide-react';
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

  useEffect(() => {
    const fetchMaterials = async () => {
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
    fetchMaterials();
  }, []);

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
        <div className="w-24"></div> {/* Spacer for alignment */}
      </div>

      <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-dark font-serif mb-4">Study <span className="italic font-light text-brand-gold">Materials.</span></h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Download notes and study guides uploaded by your teachers.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by subject or title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-brand-gold focus:bg-white transition-all outline-none"
            />
          </div>
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="py-3 px-4 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-brand-gold outline-none min-w-[180px] cursor-pointer"
          >
            {classes.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
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
                  <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg mb-4 line-clamp-3 italic">
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
