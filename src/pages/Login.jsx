import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import { TextField } from 'formik-material-ui';
import { Button } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth';

export default function Login() {
  let {login} = useContext(AuthContext) 
  const navigate = useNavigate();

  const onSubmit = (values, { setSubmitting }) => {
      login(values.username, values.password);
      // Here you might want to do something with the response
      // Maybe set a user state or redirect the user
      
      setSubmitting(false);
    }

  return (
    <>
      <h1>Log In to Your Account</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
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
                  id="outlined-password-input"
                  component={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
                <br></br>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1em' }}
                  disabled={isSubmitting}
                >
                  Log in
                </Button>
              </div>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}