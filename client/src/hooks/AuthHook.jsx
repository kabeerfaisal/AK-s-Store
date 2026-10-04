import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const navigate = useNavigate();
    const [user, setUser] = useState(()=>{
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(()=>{
        return localStorage.getItem('token') || null;
    });
    const [isLogin, setIsLogin] = useState(()=>{
        return localStorage.getItem('isLogin') === 'true' || false;
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const saveAuthData = (data) => {
        const userData = data.user || {
            name: data.name,
            email: data.email,
        };
        const tokenData = data.token;

        setUser(userData);
        setToken(tokenData);
        setIsLogin(true);
        setError('');

        localStorage.setItem('email', userData.email);
        if (tokenData) localStorage.setItem('token', tokenData);
        localStorage.setItem('isLogin', 'true');
    }
    
    const handleLogin = async (credentials) => {
        setLoading(true);
        setError('');
        try {
            const data = await loginUser(credentials);
            saveAuthData(data);
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Login failed. Please try again.');
        }finally {
            setLoading(false);
        }
    }
    
   let handleRegister = async (credentials) => {
        setLoading(true);
        setError('');
        try {
            const data = await registerUser(credentials);
            saveAuthData(data);
            navigate('/');
        }catch (error) {
            setError(error.response?.data?.message || error.message || 'Registration failed. Please try again.');
        }finally {
            setLoading(false);
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsLogin(false);
        localStorage.clear();
        navigate('/');
    }

    return (
    <AuthContext.Provider value={{isLogin, user, token, loading, error, handleLogin, handleRegister, logout, setError}}>
        {children}
    </AuthContext.Provider>
);
}

export const useAuth = () => useContext(AuthContext);

