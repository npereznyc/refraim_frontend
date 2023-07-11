import * as React from 'react';
import Box from '@mui/material/Box';
import { TextField } from 'formik-material-ui';
import { Button } from '@mui/material';
import { Formik, Field, Form } from 'formik'
import axios from 'axios';

export default function Registration() {
    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: '',
                first_name: '',
                last_name: ''
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                axios.post('http://localhost:8000/register/', values).then((response) => {
                    //will need to replace localhost with database url
                    console.log(response.data)
                    alert("Registration successful!");
                    resetForm({});
                    setSubmitting(false)
                }).catch((error) => {
                    console.error('There was an error', error)
                    //handle error here
                    setSubmitting(false)
                })
            }}
        >
            {({ submitForm, isSubmitting }) => (
                <Form>
                    <Box
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
                                name='first_name'
                                label="First Name"
                            />
                            <Field
                                id="outlined-last-name-input"
                                component={TextField}
                                name='last_name'
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