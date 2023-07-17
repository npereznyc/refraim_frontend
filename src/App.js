import './App.css';
import React from 'react';
import Nav from './components/Nav';
import Main from './pages/Main';
import axios from 'axios';
import { AuthProvider } from './auth';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';




const theme = createTheme({
  palette: {
    primary: {
      main: '#FFCA3B',
    },
    secondary: {
      main: '#4845E1',
    },
    background: {
      default: '#F3F6FF',
    }
  },
  text: {
    primary: '#123356',
    secondary: '#AFAFAF'
  },
  typography: {
    fontFamily: 'Nunito (20 Bold)',
    color: '#123356'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { // applied to the root element.
          textTransform: 'none',
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
    <div className="App" style={{ height: '100vh',
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
