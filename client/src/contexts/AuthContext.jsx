import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedToken = Cookies.get('user_token');
        const storedUserData = JSON.parse(localStorage.getItem('user_data'));
        if (storedToken && storedUserData) {
            setToken(storedToken);
            setUserData(storedUserData);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (newToken, newData) => {
        Cookies.set('user_token', newToken, { expires: 7 }); // Token will expire in 7 days
        
        setToken(newToken);
        setUserData(newData);
        setIsAuthenticated(true);
        alert("Autentificare reusita")
    };

    const logout = () => {
        Cookies.remove('user_token');
       
        setToken(null);
        setUserData(null);
        setIsAuthenticated(false);
        
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout, userData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export { AuthProvider };
