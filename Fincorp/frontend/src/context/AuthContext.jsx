import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem('fincorp_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await API.get('/auth/me');
      if (res.data.success) {
        setUser(res.data.user);
      } else {
        localStorage.removeItem('fincorp_token');
        setUser(null);
      }
    } catch (error) {
      localStorage.removeItem('fincorp_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    if (res.data.success && res.data.token) {
      localStorage.setItem('fincorp_token', res.data.token);
      setUser(res.data.user);
    }
    return res.data;
  };

  const register = async (name, email, mobile, password, role = 'user') => {
    const res = await API.post('/auth/register', { name, email, mobile, password, role });
    if (res.data.success && res.data.token) {
      localStorage.setItem('fincorp_token', res.data.token);
      setUser(res.data.user);
    }
    return res.data;
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout');
    } catch (error) {
      console.error(error);
    }
    localStorage.removeItem('fincorp_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
