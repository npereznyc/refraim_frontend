import axios from "axios";
import jwt_decode from 'jwt-decode';


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
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
  
        // Decode the access token
        const decodedToken = jwt_decode(access);
        const username = decodedToken.username;
        const userId = decodedToken.user_id;
  
        // Return the decoded token information
        console.log('username: ', username, 'userId: ', userId)
        return { username, userId };
      } else {
        // Handle error, user was not logged in
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Here you might want to do something with the error
      // Maybe re-throw it or return a value indicating failure
    }
  };

export { register, login }