import { createContext, useState } from "react";
import * as React from 'react';
const AuthContext = createContext({auth:{}, setAuth:()=>{}});

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({'account':'','status':'logout'});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };
export default AuthContext;