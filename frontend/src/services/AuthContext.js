import React, {useEffect } from 'react';
import Cookies from 'js-cookie';
import { validateToken } from './service';

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = React.useState(null);

    const login = (user, token) => {
        setUser(user);
        Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' });
    }

    const logout = () => {
        setUser(null);
        Cookies.remove('token');
    }

    useEffect(()=> {
        const token = Cookies.get('token');
        if(token){
            validateToken()
                .then((response) => {
                    if(response.success){
                        setUser(response.user);
                    }else{
                        Cookies.remove('token');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    Cookies.remove('token');
                });
        }
    }, []);


    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

