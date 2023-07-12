import * as React from 'react';
import Box from '@mui/material/Box';
import { TextField } from 'formik-material-ui';
import { Button } from '@mui/material';
import { Formik, Field, Form } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


export default function Registration() {
    const navigate = useNavigate()
    return (
        <>
        <h1>Let's get you started</h1>
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
                    localStorage.setItem('token', response.data.token)
                    alert("Registration successful!");
                    resetForm({});
                    setSubmitting(false)
                    navigate('/')
                }).catch((error) => {
                    console.error('There was an error', error)
                    //handle error here
                    setSubmitting(false)
                })
            }}
        >
            {({isSubmitting }) => (
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
                                name='username'
                                type='text'
                                label="Username"
                            />
                            <Field
                                required
                                id="outlined-fist-name-input"
                                component={TextField}
                                name='first_name'
                                label="First Name"
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
                                required
                                id="outlined-password-input"
                                component={TextField}
                                name='password'
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />                          
                            <Field
                                id="outlined-last-name-input"
                                type="hidden"
                                name='last_name'
                                
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '1em' }}
                                disabled={isSubmitting}>
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