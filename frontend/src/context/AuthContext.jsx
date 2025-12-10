import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token && role) {
            setUser({ token, role });
            axios.defaults.headers.common['x-auth-token'] = token;
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token, role } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            setUser({ token, role });
            axios.defaults.headers.common['x-auth-token'] = token;
            return role;
        } catch (error) {
            console.error('Login error', error);
            throw error;
        }
    };

    const register = async (email, password, role) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { email, password, role });
            const { token, role: userRole } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('role', userRole);
            setUser({ token, role: userRole });
            axios.defaults.headers.common['x-auth-token'] = token;
            return userRole;
        } catch (error) {
            console.error('Registration error', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setUser(null);
        delete axios.defaults.headers.common['x-auth-token'];
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
