import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { availableSounds, positions } from '../data/sampleWords';
import { ArrowLeft, Trash2, Plus, Users, BookOpen } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const { students, customWords, addCustomWord, deleteCustomWord } = useAdmin();
  
  const [activeTab, setActiveTab] = useState('students'); // 'students' or 'words'
  const [newWord, setNewWord] = useState({ sound: 'P', position: 'Initial', word: '', image: '❓' });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewWord({ ...newWord, imageData: reader.result, image: '' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewWord({ ...newWord, audioData: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddWord = (e) => {
    e.preventDefault();
    if (!newWord.word) return;
    addCustomWord(newWord);
    setNewWord({ sound: 'P', position: 'Initial', word: '', image: '❓', imageData: null, audioData: null });
    alert("Word added successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/')}
            className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-md hover:scale-105 transition-transform"
            aria-label="Back to Home"
          >
            <ArrowLeft className="text-slate-700 dark:text-slate-200" />
          </button>
          <h1 className="text-4xl font-display font-bold text-slate-800 dark:text-white">Therapist Admin Portal</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 flex flex-col gap-2">
            <button
              onClick={() => setActiveTab('students')}
              className={`flex items-center gap-3 p-4 rounded-2xl font-bold transition-colors ${
                activeTab === 'students' 
                  ? 'bg-cyan-500 text-white shadow-lg' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-slate-700'
              }`}
            >
              <Users size={24} />
              Student Progress
            </button>
            <button
              onClick={() => setActiveTab('words')}
              className={`flex items-center gap-3 p-4 rounded-2xl font-bold transition-colors ${
                activeTab === 'words' 
                  ? 'bg-pink-500 text-white shadow-lg' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-700'
              }`}
            >
              <BookOpen size={24} />
              Custom Words
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 glass-panel p-6 md:p-8 rounded-3xl min-h-[500px]">
            
            {activeTab === 'students' && (
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white border-b-2 border-slate-200 dark:border-slate-700 pb-4">
                  Student Profiles & Progress
                </h2>
                
                {students.length === 0 ? (
                  <p className="text-slate-500 dark:text-slate-400">No students found. Add them from the Home screen.</p>
                ) : (
                  <div className="grid gap-4">
                    {students.map(student => (
                      <div key={student.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-bold text-slate-800 dark:text-white">{student.name}</h3>
                          <span className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400 font-bold px-4 py-1 rounded-full">
                            {student.coins} 🪙
                          </span>
                        </div>
                        
                        <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Recent Games</h4>
                        {student.history.length === 0 ? (
                          <p className="text-sm text-slate-400">No games played yet.</p>
                        ) : (
                          <ul className="text-sm text-slate-700 dark:text-slate-300 flex flex-col gap-2">
                            {student.history.slice(-3).reverse().map((h, i) => (
                              <li key={i} className="flex justify-between bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg">
                                <span>{h.sound} - {h.position}</span>
                                <span className={h.score.correct > h.score.incorrect ? 'text-green-500' : 'text-red-500'}>
                                  {h.score.correct} / {h.score.correct + h.score.incorrect} Correct
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'words' && (
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white border-b-2 border-slate-200 dark:border-slate-700 pb-4 mb-6">
                    Add Custom Word
                  </h2>
                  <form onSubmit={handleAddWord} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="flex flex-col gap-2">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Target Sound</label>
                      <select 
                        value={newWord.sound} 
                        onChange={e => setNewWord({...newWord, sound: e.target.value})}
                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 dark:text-white"
                      >
                        {availableSounds.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Position</label>
                      <select 
                        value={newWord.position} 
                        onChange={e => setNewWord({...newWord, position: e.target.value})}
                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 dark:text-white"
                      >
                        {positions.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Word/Sentence Text</label>
                      <input 
                        type="text" 
                        required
                        value={newWord.word} 
                        onChange={e => setNewWord({...newWord, word: e.target.value})}
                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 dark:text-white"
                        placeholder="e.g. Purple"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Upload Image (Optional)</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="p-2 text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Upload Audio (Optional)</label>
                      <input 
                        type="file" 
                        accept="audio/*"
                        onChange={handleAudioUpload}
                        className="p-2 text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
                      />
                    </div>

                    <div className="md:col-span-2 mt-4">
                      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl transition-colors">
                        <Plus size={20} />
                        Add Word
                      </button>
                    </div>
                  </form>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white border-b-2 border-slate-200 dark:border-slate-700 pb-2 mb-4">
                    Your Custom Words
                  </h2>
                  {customWords.length === 0 ? (
                    <p className="text-slate-500 dark:text-slate-400 text-sm">No custom words added yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {customWords.map(cw => (
                        <div key={cw.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                          <div>
                            <p className="font-bold text-slate-800 dark:text-white">{cw.word}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{cw.sound} - {cw.position}</p>
                          </div>
                          <button onClick={() => deleteCustomWord(cw.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
