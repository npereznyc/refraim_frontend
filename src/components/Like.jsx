import React from "react"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState, useEffect } from "react";

function Like({conversationId, initialFavorite}) {

    const [isFavorite, setIsFavorite] = useState(initialFavorite)

    const API_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000' // Your local Django server's URL
    : 'https://refraim-backend-e8c71717cd42.herokuapp.com'; // Your deployed Django server's URL

    useEffect(()=> {
        setIsFavorite(initialFavorite);
    }, [initialFavorite])

    const handleClick = () => {
        if (conversationId) {
            toggleFavorite(conversationId)
        }
    }

    async function toggleFavorite(conversationId){
        const newFavoriteStatus = !isFavorite;
        const response = await fetch(`${API_URL}/conversation/${conversationId}/`,{
        method:'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            is_favorite: newFavoriteStatus
        })
    })

    if(response.ok) {
        setIsFavorite(newFavoriteStatus)
        console.log(`convo ${newFavoriteStatus ? "marked" : "unmarked"} as favorite`);
    } else {
        console.error('Error: ', response)
    }
    }
    
    return(
        <>
        {isFavorite ?
        <FavoriteIcon onClick={handleClick}/> :
        <FavoriteBorderIcon onClick={handleClick}/>}
        </>
    )
}

export default Like;