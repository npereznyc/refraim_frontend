import axios from "axios";

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
    try{
        const response = await axios.post('http://localhost:8000/token/', {
        username,
        password,
    });

    if (response.status === 200) {
        // Store tokens in local storage
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
    } else {
        // Handle error, user was not logged in
    }
    } catch(error){
        console.error("Error during registration:", error);
        // Here you might want to do something with the error
        // Maybe re-throw it or return a value indicating failure
    }
};

export { register, login }