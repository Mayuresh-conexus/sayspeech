import React, { createContext, useState, useEffect, useContext } from 'react';
import { sampleWords } from '../data/sampleWords';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('break-say-students');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeStudentId, setActiveStudentId] = useState(() => {
    return localStorage.getItem('break-say-active-student') || null;
  });

  const [customWords, setCustomWords] = useState(() => {
    const saved = localStorage.getItem('break-say-custom-words');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('break-say-students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    if (activeStudentId) {
      localStorage.setItem('break-say-active-student', activeStudentId);
    } else {
      localStorage.removeItem('break-say-active-student');
    }
  }, [activeStudentId]);

  useEffect(() => {
    localStorage.setItem('break-say-custom-words', JSON.stringify(customWords));
  }, [customWords]);

  const addStudent = (name) => {
    const newStudent = {
      id: Date.now().toString(),
      name,
      coins: 0,
      badges: [],
      history: []
    };
    setStudents([...students, newStudent]);
    return newStudent;
  };

  const addRewardToStudent = (id, coins, badge = null) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          coins: s.coins + coins,
          badges: badge && !s.badges.includes(badge) ? [...s.badges, badge] : s.badges
        };
      }
      return s;
    }));
  };

  const saveGameHistory = (id, gameData) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          history: [...s.history, { ...gameData, date: new Date().toISOString() }]
        };
      }
      return s;
    }));
  };

  const addCustomWord = (wordData) => {
    setCustomWords([...customWords, { ...wordData, id: `custom_${Date.now()}` }]);
  };

  const deleteCustomWord = (id) => {
    setCustomWords(customWords.filter(w => w.id !== id));
  };

  // Combine sample words and custom words
  const allWords = [...sampleWords, ...customWords];

  const activeStudent = students.find(s => s.id === activeStudentId) || null;

  return (
    <AdminContext.Provider value={{
      students,
      activeStudentId,
      setActiveStudentId,
      activeStudent,
      addStudent,
      addRewardToStudent,
      saveGameHistory,
      customWords,
      addCustomWord,
      deleteCustomWord,
      allWords
    }}>
      {children}
    </AdminContext.Provider>
  );
};
