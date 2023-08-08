import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import { TextField } from 'formik-material-ui';
import { Button } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth';
import jwt_decode from 'jwt-decode'
import {Typography} from '@mui/material';

export default function Registration() {
  let { register, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await register(
        values.username,
        values.password,
        values.email,
        values.first_name,
        values.last_name
      );
      console.log(response.status); 
      if (response.status === 200 || response.status === 201) {
        const { access, refresh } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        const decodedToken = jwt_decode(access); // Decode the access token
        setUser(decodedToken); // Set the user in context
        alert('Registration successful!');
        resetForm({});
        setSubmitting(false);
        navigate('/pre-prompt');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('There was an error', error);
      // Handle error here
      setSubmitting(false);
    }
  };

  return (
    <>
      <Typography variant="h1" color='primary'>Let's get you started</Typography>
      
      <Formik
        initialValues={{
          username: '',
          password: '',
          email: '',
          first_name: '',
          last_name: '',
        }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
            >
              <div>
                <Field
                  required
                  id="outlined-required"
                  component={TextField}
                  name="username"
                  type="text"
                  label="Username"
                />
                <Field
                  required
                  id="outlined-fist-name-input"
                  component={TextField}
                  name="first_name"
                  label="First Name"
                />
                <Field
                  required
                  id="outlined-disabled"
                  component={TextField}
                  name="email"
                  label="Email"
                  type="email"
                />
                
                <Field
                  required
                  id="outlined-password-input"
                  component={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
                <p>* Password must be at least 9 characters, can’t be all numbers, and can't be too common (ex. password1234)</p>
                <Field
                  id="outlined-last-name-input"
                  type="hidden"
                  name="last_name"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1em' }}
                  sx={{ textTransform: 'none' }}
                  disabled={isSubmitting}
                >
                  Create Account
                </Button>
              </div>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}