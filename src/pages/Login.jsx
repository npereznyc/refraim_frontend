import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import { TextField } from 'formik-material-ui';
import { Button } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import AuthContext from '../auth';
import {Typography} from '@mui/material';

export default function Login() {
  let {login} = useContext(AuthContext) 

  const onSubmit = (values, { setSubmitting }) => {
      login(values.username, values.password);
      // Here you might want to do something with the response
      // Maybe set a user state or redirect the user
      setSubmitting(false);
    }

  return (
    <>
      <Typography variant="h1" color='primary' >Log In to Your Account</Typography>
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
                  sx={{ textTransform: 'none' }}
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