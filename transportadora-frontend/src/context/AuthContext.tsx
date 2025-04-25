import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextData {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('❌ Erro no login:', response.status, errText);
        throw new Error('Credenciais inválidas');
      }

      const data = await response.json();

      // Suporte tanto para 'token' quanto 'access_token'
      const receivedToken = data.access_token ?? data.token;

      if (!receivedToken) {
        console.error('❌ Token não retornado pelo backend:', data);
        throw new Error('Login mal-sucedido, sem token');
      }

      localStorage.setItem('token', receivedToken);
      setToken(receivedToken);

      console.log('✅ Login OK, token salvo:', receivedToken);
    } catch (err) {
      console.error('⚠️ Erro geral no login:', err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
