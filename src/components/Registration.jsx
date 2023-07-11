import * as React from 'react';
import Box from '@mui/material/Box';
import { TextField } from 'formik-material-ui';
import { Button } from '@mui/material';
import {Formik, Field, Form} from 'formik'

export default function Registration() {
  return (
    <Formik
      initialValues={{ 
        username: '', 
        email: '', 
        password: '', 
        firstName: '',
        lastName: ''
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ submitForm, isSubmitting }) => (
    <Form>
       <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    //   noValidate
    //   autoComplete="off"
    >
      <div>
        <Field
          required
          id="outlined-required"
          component={TextField}
          name='username'
          type='text'
          label="Username"
        />
        <Field
          required
          id="outlined-disabled"
          component={TextField}
          name='email'
          label="Email"
          type="email"
        />
        <Field
          id="outlined-password-input"
          component={TextField}
          name='password'
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Field
          id="outlined-fist-name-input"
          component={TextField}
          name='firstName'
          label="First Name"
        />
        <Field
          id="outlined-last-name-input"
          component={TextField}
          name='lastName'
          label="Last Name"
        />
        <Button 
        type="submit"
        variant="contained" 
        color="primary" 
        style={{ marginTop: '1em' }}>
        Register
      </Button>
      </div>
    </Box> 
    </Form>
      )}
    </Formik>
  );
}