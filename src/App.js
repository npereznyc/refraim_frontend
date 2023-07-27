import './App.css';
import React from 'react';
import Main from './pages/Main';
import axios from 'axios';
import { AuthProvider } from './auth';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#123356',
    },
    secondary: {
      main: '#4845E1',
    },
    background: {
      default: '#F3F6FF',
    },
  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
    h1: {
      fontSize: '24px',
      fontWeight: 'bold'
    },
    body1: {
      fontSize: '18px',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { // applied to the root element.
          textTransform: 'none',
          backgroundColor: '#FFCA3B', // This will be the primary button color
          color: '#123356', // This will be the button text color
          '&:hover': {
            backgroundColor: '#E0B034', // use a slightly darker shade of your primary button color
          },
   
        },
      },
    },
  },
});

function App() {

  // Set up interceptor that attaches a token to every request:
  axios.interceptors.request.use((config) => {
    // Get the token from local storage
    const token = localStorage.getItem('access_token');

    // If the token exists, attach it to the Authorization header
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }

    // Set the content type to JSON
    config.headers['Content-Type'] = 'application/json';
    return config;
  });


  return (
    <div className="App" style={{ 
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3) }}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
