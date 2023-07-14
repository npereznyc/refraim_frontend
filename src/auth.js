import React  from 'react';
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()
export default AuthContext;

export const AuthProvider = ({ children}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [accessToken, setAccessToken] = useState(() =>
      localStorage.getItem('access_token')
      ? localStorage.getItem('access_token')
      : null
    )
    const [user, setUser] = useState(()=>
      localStorage.getItem('access_token')
      ? jwt_decode(localStorage.getItem('access_token'))
      : null
    );
  
    const register = async (username, password, email, first_name, last_name) => {
      try {
        const response = await axios.post('http://localhost:8000/register/', {
        username,
        password,
        email,
        first_name,
        last_name,
      });
      return response;
      } catch(error){
        console.error("Error during registration:", error);
        throw error;
        // Here you might want to do something with the error
        // Maybe re-throw it or return a value indicating failure
      }
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8000/token/', {
              username,
              password,
            });
  
            if (response.status === 200) {
                const { access, refresh } = response.data;
                setAccessToken(access)
                setUser(jwt_decode(access))
                localStorage.setItem('access_token', access);
                localStorage.setItem('refresh_token', refresh);
  
                // Decode the access token
                const decodedToken = jwt_decode(access);
                navigate('/pre-prompt');
                // const username = decodedToken.username;
                // const userId = decodedToken.user_id;
  
                // Return the decoded token information
            } else {
                // Handle error, user was not logged in
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Here you might want to do something with the error
            // Maybe re-throw it or return a value indicating failure
        }
    };

    const contextData = {
      user,
      login,
      register,
    }

    useEffect(() => {
      setLoading(true)
      if (accessToken) {
        setUser(jwt_decode(accessToken))
      }
      setLoading(false)
    }, [accessToken])

    if(loading) return<p>User Info Loading</p>

    return(
      <AuthContext.Provider value={contextData}>
          {children}
      </AuthContext.Provider>
    );
}

