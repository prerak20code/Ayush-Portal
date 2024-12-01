import axios from 'axios';
import { response } from 'express';
import { sessionService } from 'redux-react-session';
import axios from 'axios';
import { response } from 'express';
import { sessionService } from 'redux-react-session';

export const loginUser = (
    credentials,
    history,
    setSubmitmiting,
    setFieldError
) => {
    axios
        .post('http://localhost:4000/login', credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            const { data } = response;

            if (data.status === 'FAILED') {
                const { message } = data;

                // Check for specific error
                if (message.includes('credentials')) {
                    setFieldError('email', message);
                    setFieldError('password', message);
                } else if (message.includes('password')) {
                    setFieldError('password', message);
                }
            } else if (data.status === 'SUCCESS') {
                const userData = data.data[0];
                const token = userData._id;

                sessionService
                    .saveSession(token)
                    .then(() => {
                        sessionService
                            .saveUser(userData)
                            .then(() => {
                                history.push('/dashboard');
                            })
                            .catch((err) => console.error(err));
                    })
                    .catch((err) => console.error(err));
            }
        })
        .catch((err) => {
            console.error(err);
        });
};
export const signupUser = (
    credentials,
    history,
    setFieldError,
    setSubmitting
) => {
    axios
        .post('https://localhost:4000/signin', credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            const { data } = response;

            if (data.status === 'FAILED') {
                const { message } = data;
                if (data.status === 'FAILED') {
                    const { message } = data;

                    // checking for specific error
                    if (message.includes('name')) {
                        setFieldError('name', message);
                    } else if (message.includes('email')) {
                        setFieldError('email', message);
                    } else if (message.includes('date')) {
                        setFieldError('dateOfBirth', message);
                    } else if (message.includes('password')) {
                        setFieldError('password', message);
                    }
                }
            }
        });
};
