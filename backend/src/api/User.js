import express from 'express';
import bcrypt from 'bcrypt'; //password handler
import User from './../models/User.js'; //user model
import UserVerification from './../models/UserVerification.js'; //user Verification model
import PasswordReset from './../models/PasswordReset.js'; //password reset model
import nodemailer from 'nodemailer'; //email handeler
import { v4 as uuidv4 } from 'uuid'; //unique string
import 'dotenv/config'; //env variables
import path from 'path'; //path for static verified page
import { error } from 'console';

const router = express.Router();

//signup route
router.post('/signup', async (req, res) => {
    let { name, email, password, dateOfBirth, phone } = req.body;
    name = name.trim();
    email = email.trim();
    dateOfBirth = dateOfBirth.trim();
    phone = phone.trim();

    if (name === '' || email === '' || password === '' || dateOfBirth === '') {
        return res.json({
            status: 'FAILED',
            message: 'Empty input fields!',
        });
    }

    if (!/^[a-zA-Z ]*$/.test(name)) {
        return res.json({
            status: 'FAILED',
            message: 'Invalid name entered',
        });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.json({
            status: 'FAILED',
            message: 'Invalid email entered',
        });
    }

    if (isNaN(new Date(dateOfBirth).getTime())) {
        return res.json({
            status: 'FAILED',
            message: 'Invalid DOB entered',
        });
    }

    if (password.length < 8) {
        return res.json({
            status: 'FAILED',
            message: 'Password length should be at least 8 characters',
        });
    } else {
        //cehck user already exists
        User.find({ email })
            .then((result) => {
                if (result.length) {
                    //Already exists
                    res.json({
                        status: 'FAILED',
                        message: 'User exists with this email',
                    });
                } else {
                    //create new user

                    //password handling
                    const saltRounds = 10;
                    bcrypt
                        .hash(password, saltRounds)
                        .then((hashedPassword) => {
                            const newUser = new User({
                                name,
                                email,
                                password: hashedPassword,
                                dateOfBirth,
                                phone,
                                verified: false,
                            });
                            newUser
                                .save()
                                .then((result) => {
                                    //handle account verification
                                    sendVerificationEmail(result, res);
                                })
                                .catch((err) => {
                                    res.json({
                                        status: 'FAILED',
                                        message:
                                            'An error occured while saving user',
                                    });
                                });
                        })
                        .catch((err) => {
                            res.json({
                                status: 'FAILED',
                                message:
                                    'An error occured while hashing password !',
                            });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    status: 'FAILED',
                    message:
                        'An error occured while checking for existing user !',
                });
            });
    }
});

//send verification email
const sendVerificationEmail = ({ _id, email }, res) => {
    // url
    const currentUrl = 'http://localhost:4000/';

    const uniqueString = uuidv4() + _id;

    //mail opt.

    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: 'Verify your Email',
        html: `<p>Verify your email address to complete the signup and login into your account.</p> 
        <p> This link <b>expires in 1 hours.</b> </p> 
        <p> Press <a href=${currentUrl + 'user/verify/' + _id + '/' + uniqueString}
        > here </a> to proceed.</p>`,
    };

    //hash the unique string
    const saltRounds = 10;
    bcrypt
        .hash(uniqueString, saltRounds)
        .then((hashedUniqueString) => {
            //set values in Userverification collection
            const newVerificaion = new UserVerification({
                userId: _id,
                uniqueString: hashedUniqueString,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000,
            });
            newVerificaion
                .save()
                .then(() => {
                    transporter
                        .sendMail(mailOptions)
                        .then(() => {
                            //email sent and verification record saved
                            res.json({
                                status: 'PENDING',
                                message: 'EMAIL VERIFICATION SENT!',
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                            res.json({
                                status: 'FAILED',
                                message: 'Verification email failed!',
                            });
                        });
                })
                .catch((error) => {
                    console.log(error);
                    res.json({
                        status: 'FAILED',
                        message: 'colud not save verification email data!',
                    });
                });
        })
        .catch(() => {
            res.json({
                status: 'FAILED',
                message: 'An error occured while hashing email data !',
            });
        });
};

// verify email
router.get('/verify/:userId/:uniqueString', (req, res) => {
    let { userId, uniqueString } = req.params;
    UserVerification.find({ userId })
        .then((result) => {
            if (result.length > 0) {
                //user verification record exists
                const { expiresAt } = result[0];
                const hashedUniqueString = result[0].uniqueString;

                // checking for expired unique string
                if (expiresAt < Date.now()) {
                    // record has expired so we delete it
                    UserVerification.deleteOne({ userId })
                        .then((result) => {
                            User.deleteOne({ _id: userId })
                                .then(() => {
                                    let message =
                                        'Link has expired please sign up again.';
                                    res.redirect(
                                        `/user/verified/error=true&message=${message}`
                                    );
                                })
                                .catch((error) => {
                                    console.log(error);
                                    let message =
                                        'Clearing user with existing record failed';
                                    res.redirect(
                                        `/user/verified/error=true&message=${message}`
                                    );
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                            let message =
                                'An error occured while clearing expired user verification record';
                            res.redirect(
                                `/user/verified/error=true&message=${message}`
                            );
                        });
                } else {
                    //valid record exists validate user string
                    //first compare the hashed unique string

                    bcrypt
                        .compare(uniqueString, hashedUniqueString)
                        .then((result) => {
                            if (result) {
                                //strings match
                                User.updateOne(
                                    { _id: userId },
                                    { verified: true }
                                ).then(() => {
                                    UserVerification.deleteOne({ userId })
                                        .then(() => {
                                            UserVerification.deleteOne({
                                                userId,
                                            })
                                                .then(() => {
                                                    res.sendFile(
                                                        path.join(
                                                            __dirname,
                                                            'Ayush-portal/backend/src/views/verified.html'
                                                        )
                                                    );
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                    let message =
                                                        'An error occured while finalizing successful verification.';
                                                    res.redirect(
                                                        `/user/verified/error=true&message=${message}`
                                                    );
                                                });
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                            let message =
                                                'An error occured while updating user record to show verified.';
                                            res.redirect(
                                                `/user/verified/error=true&message=${message}`
                                            );
                                        });
                                });
                            } else {
                                // existing record but incorrect verification details
                                let message =
                                    'Invalid verification details passed check verification details';
                                res.redirect(
                                    `/user/verified/error=true&message=${message}`
                                );
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            let message =
                                'An error occured while comparing unique string';
                            res.redirect(
                                `/user/verified/error=true&message=${message}`
                            );
                        });
                }
            } else {
                //user verification record doesnt exist
                let message =
                    'Account record doesnt exist or has been verified already. Please sign up or login';
                res.redirect(`/user/verified/error=true&message=${message}`);
            }
        })
        .catch((error) => {
            console.log(error);
            let message =
                'An error occured while checking for existing user verification record';
            res.redirect(`/user/verified/error=true&message=${message}`);
        });
});

//verified page route
router.get('/verified', (req, res) => {
    res.sendFile(path.join(__dirname, './../views/verified.html'));
});

//signin route
router.post('/signin', (req, res) => {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (email === '' || password === '') {
        res.json({
            status: 'FAILED',
            message: 'Empty credentials provided !',
        });
    } else {
        //check user exists
        User.find({ email }).then((data) => {
            if (data.length) {
                //user exists

                //check if user verified
                if (!data[0].verified) {
                    res.json({
                        status: 'FAILED',
                        message:
                            'Email has not been verified yet. Check your inbox',
                    });
                } else {
                    const hashedPassword = data[0].password;
                    bcrypt
                        .compare(password, hashedPassword)
                        .then((result) => {
                            if (result) {
                                //password match
                                res.json({
                                    status: 'SUCCESS',
                                    message: 'Sign in successful',
                                    data: data,
                                });
                            } else {
                                res.json({
                                    status: 'FAILED',
                                    message: 'Invalid password !',
                                });
                            }
                        })
                        .catch((err) => {
                            res.json({
                                status: 'FAILED',
                                message:
                                    'An error occured while comparing password',
                            });
                        });
                }
            } else {
                res.json({
                    status: 'FAILED',
                    message: 'Invalid credentials entered !',
                }).catch((err) => {
                    res.json({
                        status: 'FAILED',
                        message:
                            'An error occured while checking for existing user ',
                    });
                });
            }
        });
    }
});

//node mailer logics
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'preraknagpal276@gmail.com',
        pass: 'bqgrxpdjutjcyfnx',
    },
});

//testing success
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Ready for messages');
        console.log(success);
    }
});

// password reset logics
router.post('/requestPasswordReset', (req, res) => {
    const { email, redirectUrl } = req.body;

    //check if mail exists
    User.find({ email })
        .then((data) => {
            if (data.length) {
                // user exists

                //check if user is verified
                if (!data[0].verified) {
                    res.json({
                        status: 'FAILED',
                        message:
                            'Email hasnt been verified yet. Check your inbox',
                    });
                } else {
                    //proceed with email to reset password
                    sendResetEmail(data[0], redirectUrl, res);
                }
            } else {
                res.json({
                    status: 'FAILED',
                    message: 'No account with the supplied email exists !',
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.json({
                status: 'FAILED',
                message: 'An error while checking for existing user',
            });
        });
});

// send password reset email
const sendResetEmail = ({ _id, email }, redirectUrl, res) => {
    const resetString = uuidv4() + _id;

    //Clear existing reset records
    PasswordReset.deleteMany({ userId: _id }).then((result) => {
        //reset records deleted successfully

        //No we send the email

        //mail options
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Password reset',
            html: `<p>Reset password with below link and login into your account.</p> 
        <p> This link <b>expires in 1 hours.</b> </p> 
        <p> Press <a href=${redirectUrl + 'user/verify/' + _id + '/' + resetString}
        > here </a> to proceed.</p>`,
        };
        // hash the reset string
        const saltRounds = 10;
        bcrypt
            .hash(resetString, saltRounds)
            .then((hashedResetString) => {
                //set values in password reset collection
                const newPasswordReset = new PasswordReset({
                    userId: _id,
                    resetString: hashedResetString,
                    createdAt: Date.now(),
                    expiresAt: Date.now() + 3600000,
                });
                newPasswordReset
                    .save()
                    .then(() => {
                        transporter
                            .sendMail(mailOptions)
                            .then(() => {
                                //reset email sent and password reset record saved
                                res.json({
                                    status: 'PENDING',
                                    message: 'Password reset email sent!',
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                                res.json({
                                    status: 'FAILED',
                                    message: 'Password reset email failed!',
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                                res.json({
                                    status: 'FAILED',
                                    message:
                                        'Couldnt save the password reset data!',
                                });
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                        res.json({
                            status: 'FAILED',
                            message:
                                'An error occurred while hashing the password reset data!',
                        });
                    });
            })
            .catch((error) => {
                //error while crearing existing records
                console.log(error);
                res.json({
                    status: 'FAILED',
                    message: 'Clearing existing password reset records failed',
                });
            });
    });

    //Actual reset password
    router.post('/resetPassword', (req, res) => {
        let { userId, resetString, newPassword } = req.body;

        PasswordReset.find({ userId })
            .then((result) => {
                if (result.length > 0) {
                    //password reset record exists so we proceed
                    const { expiresAt } = result[0];
                    const hashedResetString = result[0].resetString;
                    //checking for expired reset string
                    if (expiresAt < Date.now()) {
                        PasswordReset.deleteOne({ userId })
                            .then(() => {
                                // Reset record deleted successfully
                                res.json({
                                    status: 'FAILED',
                                    message: 'Password reset link has expired',
                                });
                            })
                            .catch((error) => {
                                //deletion failed
                                console.log(error);
                                res.json({
                                    status: 'FAILED',
                                    message:
                                        'Clearing password reset record failed',
                                });
                            });
                    } else {
                        //valid reset record exists so we validate the reset string
                        //first compare the hashed reset string

                        bcrypt
                            .compare(resetString, hashedResetString)
                            .then((result) => {
                                if (result) {
                                    //strings matched
                                    //hash password again

                                    const saltRounds = 10;
                                    bcrypt
                                        .hash(newPassword, saltRounds)
                                        .then((hashedNewPassword) => {
                                            //update user password
                                            User.updateOne(
                                                { _id: userId },
                                                { password: hashedNewPassword }
                                            )
                                                .then(() => {
                                                    //update complete delete reset record
                                                    PasswordReset.deleteOne(
                                                        { userId }
                                                            .then(() => {
                                                                //both user record and reset record updated
                                                                res.json({
                                                                    status: 'SUCCESS',
                                                                    message:
                                                                        'Password has been reset successfully',
                                                                });
                                                            })
                                                            .catch((error) => {
                                                                console.log(
                                                                    error
                                                                );
                                                                res.json({
                                                                    status: 'FAILED',
                                                                    message:
                                                                        'An error occured while finalizing password reset',
                                                                });
                                                            })
                                                    );
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                    res.json({
                                                        status: 'FAILED',
                                                        message:
                                                            'Updating user password failed',
                                                    });
                                                });
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                            res.json({
                                                status: 'FAILED',
                                                message:
                                                    'An Error while hashing new password',
                                            });
                                        });
                                } else {
                                    //existing record but incorrect reset string
                                    res.json({
                                        status: 'FAILED',
                                        message:
                                            'Invalid password reset details passed',
                                    });
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                                res.json({
                                    status: 'FAILED',
                                    message:
                                        'Comparing password resetr string failed',
                                });
                            });
                    }
                } else {
                    // password reset account doesnt exists
                    res.json({
                        status: 'FAILED',
                        message: 'Password reset request not found.',
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                res.json({
                    status: 'FAILED',
                    message:
                        'Checking for existing password reset records failed',
                });
            });
    });
};

export default router;
