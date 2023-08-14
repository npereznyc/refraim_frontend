import { useState, useEffect, useContext } from 'react';
import AuthContext from '../auth';

const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000' // Your local Django server's URL
  : 'https://refraim-backend-e8c71717cd42.herokuapp.com'; // Your deployed Django server's URL

function useFavorites(userId) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  let { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchFavorites = async () => {
        try {
            const response = await fetch(`${API_URL}/allconversations/${user.user_id || user.id}/favorites/`);
            if (response.ok) {
                const data = await response.json();
                setFavorites(data);
            } else {
                console.error('Error:', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }finally {
            setLoading(false);
          }
    }

    fetchFavorites();
  }, [userId]);

  return { favorites, loading };
}

export default useFavorites;
