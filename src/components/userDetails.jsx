import { useState, useEffect, useContext } from 'react';
import AuthContext from '../auth';

const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000' // Your local Django server's URL
  : 'https://refraim-backend-e8c71717cd42.herokuapp.com'; // Your deployed Django server's URL

function useUserDetails(userId) {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
  let { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`${API_URL}/user/${user.user_id || user.id}`);
            if (response.ok) {
                const data = await response.json();
                setUserDetails(data[0]);
            } else {
                console.error('Error:', response);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }finally {
            setLoading(false);
          }
    }

    fetchUserDetails();
  }, [userId]);

  return { userDetails, loading };
}

export default useUserDetails;