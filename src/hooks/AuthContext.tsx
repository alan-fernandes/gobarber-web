import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthData {
  token: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  logout(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthData>(() => {
    const token = localStorage.getItem('@goBarber:token');
    const user = localStorage.getItem('@goBarber:user');
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthData;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });
    const { token, user } = response.data;
    localStorage.setItem('@goBarber:token', token);
    localStorage.setItem('@goBarber:user', JSON.stringify(user));
    setData({ token, user });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('@goBarber:token');
    localStorage.removeItem('@goBarber:user');
    setData({} as AuthData);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContext');
  }
  return context;
}
