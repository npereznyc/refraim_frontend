import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import { TextField } from 'formik-material-ui';
import { Button } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth';

export default function Registration() {
  let {register} = useContext(AuthContext)
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
      if (response.status === 200) {
        const { access, refresh } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        alert('Registration successful!');
        resetForm({});
        setSubmitting(false);
        navigate('/session');
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
      <h1>Let's get you started</h1>
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