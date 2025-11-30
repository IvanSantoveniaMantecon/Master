import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [medico, setMedico] = useState(null);

  useEffect(() => {
    const storedMedico = JSON.parse(localStorage.getItem('medico'));
    if (storedMedico) {
      setMedico(storedMedico);
    }
  }, []);

  const login = (data) => {
    localStorage.setItem('medico', JSON.stringify(data));
    setMedico(data);
  };

  const logout = () => {
    localStorage.removeItem('medico');
    setMedico(null);
  };

  return (
    <AuthContext.Provider value={{ medico, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
