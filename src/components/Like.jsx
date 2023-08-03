import React from "react"
import FavoriteIcon from '@mui/icons-material/Favorite';

function Like({conversationId}) {

    const API_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000' // Your local Django server's URL
    : 'https://refraim-backend-e8c71717cd42.herokuapp.com'; // Your deployed Django server's URL

    const handleClick = () => {
        if (conversationId) {
            addFavorite(conversationId)
        }
    }

    async function addFavorite(conversationId){
        const response = await fetch(`${API_URL}/conversation/${conversationId}/`,{
        method:'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            is_favorite: true
        })
    })

    if(response.ok) {
        console.log('convo marked favorite')
    } else {
        console.error('Error: ', response)
    }
    }
    
    return(
        <>
        <FavoriteIcon onClick={handleClick}/>
        </>
    )
}

export default Like;