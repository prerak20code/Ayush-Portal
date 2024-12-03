import bcrypt from 'bcrypt';
import { User, UserVerification, PasswordReset } from '../models/index.js';
import { v4 as uuid } from 'uuid';
import path from 'path';
import {
    sendVerificationEmail,
    validateRegex,
    getTranporter,
    generateTokens,
    validatePassword,
} from '../utils/index.js';
import {
    OK,
    SERVER_ERROR,
    BAD_REQUEST,
    PENDING,
} from '../constants/statusCodes.js';
import { cookieOptions } from '../constants/cookie.js';

// verify email
const verifyEmail = async (req, res) => {
    try {
        let { userId, uniqueString } = req.params;
        const verificationRecord = await UserVerification.findOne({ userId });
        if (verificationRecord) {
            //user verification record exists
            const { expiresAt } = verificationRecord;
            const hashedUniqueString = verificationRecord.uniqueString;

            // checking for expired unique string
            if (expiresAt < Date.now()) {
                // record has expired so we delete it
                const deletedVerificationRecord =
                    await UserVerification.deleteOne({ userId });
                if (deletedVerificationRecord) {
                    const deletedUser = await User.deleteOne({ _id: userId });
                    if (deletedUser) {
                        // let message = 'Link has expired please sign up again.';
                        // res.redirect(
                        //     `/users/verified/error=true&message=${message}`
                        // );
                        res.status(BAD_REQUEST).json({
                            message:
                                'your verification link has expired please sign up again',
                        });
                    }
                    // else {
                    //     let message =
                    //         'Clearing user with existing record failed';
                    //     res.redirect(
                    //         `/users/verified/error=true&message=${message}`
                    //     );
                    // }
                }
                // else {
                //     let message =
                //         'An error occured while clearing expired user verification record';
                //     res.redirect(
                //         `/users/verified/error=true&message=${message}`
                //     );
                // }
            } else {
                //valid record exists (link is not expired) validate user string
                //first compare the hashed unique string

                const doesStringsMatch = await bcrypt.compare(
                    uniqueString,
                    hashedUniqueString
                );
                if (doesStringsMatch) {
                    //strings match
                    const updatedUser = await User.updateOne(
                        { _id: userId },
                        { verified: true }
                    );
                    if (updatedUser) {
                        const deletedVerificationRecord =
                            await UserVerification.deleteOne({ userId });
                        if (deletedVerificationRecord) {
                            // res.redirect('/users/verified');
                            res.status(OK).json({
                                message: 'email verified successfully',
                            });
                        }
                        // else {
                        //     let message =
                        //         'An error occured while finalizing successful verification.';
                        //     res.redirect(
                        //         `/users/verified/error=true&message=${message}`
                        //     );
                        // }
                    }
                    // else {
                    //     let message =
                    //         'An error occured while updating user record to show verified.';
                    //     res.redirect(
                    //         `/users/verified/error=true&message=${message}`
                    //     );
                    // }
                } else {
                    // existing record but incorrect verification details (strings doesn't match)
                    // let message = 'Invalid verification details passed';
                    // res.redirect(
                    //     `/users/verified/error=true&message=${message}`
                    // );
                    res.status(BAD_REQUEST).json({
                        message: 'invalid verification details provided.',
                    });
                }
            }
        } else {
            //user verification record doesnt exist
            // let message =
            //     'Account record doesnt exist or has been verified already. Please sign up or login';
            // res.redirect(`/users/verified/error=true&message=${message}`);
            res.status(BAD_REQUEST).json({
                message:
                    "account record doesn't exits or has been verified already, please sign up or login",
            });
        }
    } catch (err) {
        console.log(err);
        // let message =
        //     'An error occured while checking for existing user verification record';
        // res.redirect(`/users/verified/error=true&message=${message}`);
        res.status(SERVER_ERROR).json({
            message: 'error occured while email verification.',
            error: err.message,
        });
    }
};

const register = async (req, res) => {
    try {
        let { name, email, password, dateOfBirth, phone } = req.body;
        name = name.trim();
        email = email.trim();
        dateOfBirth = dateOfBirth.trim();
        phone = phone.trim();
        console.log(name, email, password, dateOfBirth, phone);
        console.log('1');

        if (!name || !email || !password || !dateOfBirth) {
            return res.status(BAD_REQUEST).json({
                message: 'Empty input fields!',
            });
        }

        // regex validation
        let isValid = validateRegex('name', name);
        if (!isValid) {
            return res.status(BAD_REQUEST).json({
                message:
                    'only letters are allowed and should not exceed 15 characters.',
            });
        }

        isValid = validateRegex('email', email);
        if (!isValid) {
            return res.status(BAD_REQUEST).json({
                message: 'please enter a valid email.',
            });
        }

        isValid = validateRegex('password', password);
        if (!isValid) {
            return res.status(BAD_REQUEST).json({
                message: 'Password length should be at least 8 characters',
            });
        }

        isValid = validateRegex('dateOfBirth', dateOfBirth);
        if (!isValid) {
            return res.status(BAD_REQUEST).json({
                message: 'Invalid DOB entered',
            });
        }
        console.log('2');
        //check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            //Already exists
            console.log('3');
            res.status(BAD_REQUEST).json({
                message: 'user already exists with this email',
            });
        } else {
            console.log('4');
            //create new user

            //password hashing ( auto done using pre hook )

            // create user
            const newUser = await User.create({
                name,
                email,
                password,
                dateOfBirth,
                phone,
                verified: false,
            });

            // send mail
            if (newUser) {
                console.log('5');
                await sendVerificationEmail(newUser, res);
            }
        }
        console.log('6');
    } catch (err) {
        res.status(SERVER_ERROR).json({
            message: 'An error occured while registering user !',
            error: err.message,
        });
    }
};

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.trim();
        password = password.trim();
        console.log('login:', email, password);

        if (!email || !password) {
            res.status(BAD_REQUEST).json({
                message: 'Empty credentials provided !',
            });
        }

        //check if user exists
        const user = await User.findOne({ email });
        if (user) {
            //user exists

            //check if user is verified
            if (!user.verified) {
                res.status(BAD_REQUEST).json({
                    message:
                        'Email has not been verified yet. Check your inbox',
                });
            } else {
                const isPasswordVerified = validatePassword(
                    password,
                    user.password // hashed password
                );
                if (isPasswordVerified) {
                    // generate tokens
                    const { accessToken, refreshToken } = generateTokens(user);

                    // send cookies
                    res.status(OK)
                        .cookie('accessToken', accessToken, {
                            ...cookieOptions,
                            maxAge: parseInt(process.env.ACCESS_TOKEN_MAXAGE),
                        })
                        .cookie('refreshToken', refreshToken, {
                            ...cookieOptions,
                            maxAge: parseInt(process.env.REFRESH_TOKEN_MAXAGE),
                        })
                        .json(user);
                } else {
                    res.status(BAD_REQUEST).json({
                        message: 'invalid credentials !!',
                    });
                }
            }
        } else {
            res.status(BAD_REQUEST).json({
                message: 'user not found.',
            });
        }
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while logging the user.',
            error: err.message,
        });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        return res.status(OK).json(req.user);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while fetching the current logged in user',
            err: err.message,
        });
    }
};

// reset password logics
const requestResetPassword = async (req, res) => {
    try {
        const { email, redirectUrl } = req.body;

        //check if user exists
        const user = await User.findOne({ email });
        if (user) {
            //check if user is verified
            if (!user.verified) {
                res.status(BAD_REQUEST).json({
                    message:
                        'Email has not been verified yet. Check your inbox',
                });
            } else {
                //user is verified so we can proceed with reset email
                //Clear existing reset records
                const deletedResetRecords = await PasswordReset.deleteMany({
                    userId: user._id,
                });
                if (deletedResetRecords) {
                    //reset records deleted successfully
                    // hash the reset string (auto done using pre hook)
                    const newPasswordResetRecord = await PasswordReset.create({
                        userId: _id,
                        resetString,
                        createdAt: Date.now(),
                        expiresAt: Date.now() + 3600000,
                    });
                    if (newPasswordResetRecord) {
                        // send the email
                        await sendPasswordResetEmail(user, redirectUrl, res);
                    } else {
                        throw new Error(
                            'error occured while creating new reset record'
                        );
                    }
                } else {
                    throw new Error(
                        'error occured while deleting existing reset records'
                    );
                }
            }
        } else {
            res.status(BAD_REQUEST).json({
                message: 'user not found',
            });
        }
    } catch (error) {
        res.status(SERVER_ERROR).json({
            message: 'error occured while requesting for reset password',
            error,
        });
    }
};

const sendPasswordResetEmail = async (user, redirectUrl, res) => {
    try {
        const { _id, email } = user;
        const resetString = uuid() + _id;
        const url = `${redirectUrl}/users/verify/${_id}/${resetString}`;

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Reset Password',
            html: `
                    <p>Reset password with below link and login to your account.</p>
                    <p>This link will <b>expire in an hour.</b></p>
                    <p>Press <a href=${url}> here</a> to proceed.</p>
                `,
        };
        const transporter = getTranporter();
        await transporter.sendMail(mailOptions);
        //reset email sent and password reset record saved
        res.status(PENDING).json({
            message: 'Password reset email sent!',
        });
    } catch (err) {
        res.status(SERVER_ERROR).json({
            message: 'error occured while sending password reset email',
            error: err.message,
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        let { userId, resetString, newPassword } = req.body;

        const resetRecord = await PasswordReset.findOne({ userId });

        if (resetRecord) {
            //password reset record exists so we proceed
            const { expiresAt } = resetRecord;
            const hashedResetString = resetRecord.resetString;
            //check for expired reset string
            if (expiresAt < Date.now()) {
                const deletedResetRecord = await PasswordReset.deleteOne({
                    userId,
                });
                if (deletedResetRecord) {
                    // Reset record deleted successfully
                    res.status(BAD_REQUEST).json({
                        message: 'Password reset link has expired',
                    });
                } else {
                    //deletion failed
                    throw new Error(
                        'string is expired, but deleting password reset record failed'
                    );
                }
            } else {
                //valid reset record exists so we validate the reset string
                //first compare the hashed reset string

                const doesResetStringsMatch = bcrypt.compare(
                    resetString,
                    hashedResetString
                );
                if (doesResetStringsMatch) {
                    //strings matched
                    //so we can directly update the password hashing will be auto done using pre hook

                    //update user password
                    const updatedUser = User.updateOne(
                        { _id: userId },
                        { password: newPassword }
                    );
                    if (updatedUser) {
                        //update complete now delete reset record
                        const deletedResetRecord = PasswordReset.deleteOne({
                            userId,
                        });
                        if (deletedResetRecord) {
                            //reset reset record deleted
                            res.status(OK).json({
                                message: 'Password has been reset successfully',
                            });
                        } else {
                            // deletion failed
                            throw new Error(
                                'password reset successfully, but error occured while deleting reset record'
                            );
                        }
                    } else {
                        throw new Error(
                            'error occured while updating user password'
                        );
                    }
                } else {
                    //existing record but incorrect reset string
                    res.status(BAD_REQUEST).json({
                        message: 'invalid reset string.',
                    });
                }
            }
        } else {
            res.status(BAD_REQUEST).json({
                message: 'No reset record with privided string found.',
            });
        }
    } catch (err) {
        console.log(err);
        res.status(SERVER_ERROR).json({
            message: 'error occured while reseting password',
            error: err.message,
        });
    }
};

export {
    register,
    verifyEmail,
    login,
    getCurrentUser,
    resetPassword,
    requestResetPassword,
    sendPasswordResetEmail,
};

//  BEFORE CODE
// verify email
// userRouter.get('/verify/:userId/:uniqueString', (req, res) => {
//     let { userId, uniqueString } = req.params;
//     UserVerification.find({ userId })
//         .then((result) => {
//             if (result.length > 0) {
//                 //user verification record exists
//                 const { expiresAt } = result[0];
//                 const hashedUniqueString = result[0].uniqueString;

//                 // checking for expired unique string
//                 if (expiresAt < Date.now()) {
//                     // record has expired so we delete it
//                     UserVerification.deleteOne({ userId })
//                         .then((result) => {
//                             User.deleteOne({ _id: userId })
//                                 .then(() => {
//                                     let message =
//                                         'Link has expired please sign up again.';
//                                     res.redirect(
//                                         `/user/verified/error=true&message=${message}`
//                                     );
//                                 })
//                                 .catch((error) => {
//                                     console.log(error);
//                                     let message =
//                                         'Clearing user with existing record failed';
//                                     res.redirect(
//                                         `/user/verified/error=true&message=${message}`
//                                     );
//                                 });
//                         })
//                         .catch((error) => {
//                             console.log(error);
//                             let message =
//                                 'An error occured while clearing expired user verification record';
//                             res.redirect(
//                                 `/user/verified/error=true&message=${message}`
//                             );
//                         });
//                 } else {
//                     //valid record exists validate user string
//                     //first compare the hashed unique string

//                     bcrypt
//                         .compare(uniqueString, hashedUniqueString)
//                         .then((result) => {
//                             if (result) {
//                                 //strings match
//                                 User.updateOne(
//                                     { _id: userId },
//                                     { verified: true }
//                                 ).then(() => {
//                                     UserVerification.deleteOne({ userId })
//                                         .then(() => {
//                                             UserVerification.deleteOne({
//                                                 userId,
//                                             })
//                                                 .then(() => {
//                                                     res.sendFile(
//                                                         path.join(
//                                                             __dirname,
//                                                             'Ayush-portal/backend/src/views/verified.html'
//                                                         )
//                                                     );
//                                                 })
//                                                 .catch((error) => {
//                                                     console.log(error);
//                                                     let message =
//                                                         'An error occured while finalizing successful verification.';
//                                                     res.redirect(
//                                                         `/user/verified/error=true&message=${message}`
//                                                     );
//                                                 });
//                                         })
//                                         .catch((error) => {
//                                             console.log(error);
//                                             let message =
//                                                 'An error occured while updating user record to show verified.';
//                                             res.redirect(
//                                                 `/user/verified/error=true&message=${message}`
//                                             );
//                                         });
//                                 });
//                             } else {
//                                 // existing record but incorrect verification details
//                                 let message =
//                                     'Invalid verification details passed check verification details';
//                                 res.redirect(
//                                     `/user/verified/error=true&message=${message}`
//                                 );
//                             }
//                         })
//                         .catch((error) => {
//                             console.log(error);
//                             let message =
//                                 'An error occured while comparing unique string';
//                             res.redirect(
//                                 `/user/verified/error=true&message=${message}`
//                             );
//                         });
//                 }
//             } else {
//                 //user verification record doesnt exist
//                 let message =
//                     'Account record doesnt exist or has been verified already. Please sign up or login';
//                 res.redirect(`/user/verified/error=true&message=${message}`);
//             }
//         })
//         .catch((error) => {
//             console.log(error);
//             let message =
//                 'An error occured while checking for existing user verification record';
//             res.redirect(`/user/verified/error=true&message=${message}`);
//         });
// });

// //verified page route
// userRouter.get('/verified', (req, res) => {
//     res.sendFile(path.join(__dirname, './../views/verified.html'));
// });

// reset password logics
// const requestResetPassword = async (req, res) => {
//     try {
//         const { email, redirectUrl } = req.body;

//         //check if user exists
//         const user = await User.find({ email });
//         if (user) {
//             //check if user is verified
//             if (!user.verified) {
//                 res.status(BAD_REQUEST).json({
//                     message:
//                         'Email has not been verified yet. Check your inbox',
//                 });
//             } else {
//                 //proceed with email to reset password
//                 sendPasswordResetEmail(user, redirectUrl, res);
//             }
//         } else {
//             res.status(BAD_REQUEST).json({
//                 message: 'No user with the provided email exists !',
//             });
//         }
//     } catch (err) {
//         res.status(SERVER_ERROR).json({
//             message: 'error occured while requesting for reset password',
//             error: err.message,
//         });
//     }
// };

// const sendPasswordResetEmail = async (user, redirectUrl, res) => {
//     try {
//         const { _id, email } = user;
//         const resetString = uuid() + _id;

//         //Clear existing reset records
//         PasswordReset.deleteMany({ userId: _id }).then((result) => {
//             //reset records deleted successfully

//             //send the email
//             const mailOptions = {
//                 from: process.env.AUTH_EMAIL,
//                 to: email,
//                 subject: 'Password reset',
//                 html: `
//                         <p>Reset password with below link and login to your account.</p>
//                         <p>This link will <b>expire in an hour.</b></p>
//                         <p>Press <a href=${redirectUrl + 'user/verify/' + _id + '/' + resetString}> here </a> to proceed.</p>
//                     `,
//             };

//             // hash the reset string
//             bcrypt
//                 .hash(resetString, 10)
//                 .then((hashedResetString) => {
//                     //set values in password reset collection
//                     const newPasswordReset = new PasswordReset({
//                         userId: _id,
//                         resetString: hashedResetString,
//                         createdAt: Date.now(),
//                         expiresAt: Date.now() + 3600000,
//                     });
//                     newPasswordReset
//                         .save()
//                         .then(() => {
//                             const transporter = getTranporter();
//                             transporter
//                                 .sendMail(mailOptions)
//                                 .then(() => {
//                                     //reset email sent and password reset record saved
//                                     res.status(PENDING).json({
//                                         message: 'Password reset email sent!',
//                                     });
//                                 })
//                                 .catch((error) => {
//                                     console.log(error);
//                                     throw new Error(
//                                         `Password reset email failed!, error: ${error}`
//                                     );
//                                 })
//                                 .catch((error) => {
//                                     console.log(error);
//                                     throw new Error(
//                                         `Couldnt save the password reset data! , error: ${error}`
//                                     );
//                                 });
//                         })
//                         .catch((error) => {
//                             console.log(error);
//                             throw new Error(
//                                 `An error occurred while hashing the password reset data!, error: ${error}`
//                             );
//                         });
//                 })
//                 .catch((error) => {
//                     //error while clearing existing records
//                     console.log(error);
//                     throw new Error(
//                         `Clearing existing password reset records failed, error: ${error}`
//                     );
//                 });
//         });

//         //Actual reset password
//         await resetPassword(req, res);
//     } catch (err) {
//         res.status(SERVER_ERROR).json({
//             message: 'error occured while sending password reset email',
//             error: err.message,
//         });
//     }
// };

// const resetPassword = async (req, res) => {
//     let { userId, resetString, newPassword } = req.body;

//     PasswordReset.find({ userId })
//         .then((result) => {
//             if (result.length > 0) {
//                 //password reset record exists so we proceed
//                 const { expiresAt } = result[0];
//                 const hashedResetString = result[0].resetString;
//                 //checking for expired reset string
//                 if (expiresAt < Date.now()) {
//                     PasswordReset.deleteOne({ userId })
//                         .then(() => {
//                             // Reset record deleted successfully
//                             res.status(BAD_REQUEST).json({
//                                 message: 'Password reset link has expired',
//                             });
//                         })
//                         .catch((error) => {
//                             //deletion failed
//                             console.log(error);
//                             throw new Error(
//                                 'Clearing password reset record failed'
//                             );
//                         });
//                 } else {
//                     //valid reset record exists so we validate the reset string
//                     //first compare the hashed reset string

//                     bcrypt
//                         .compare(resetString, hashedResetString)
//                         .then((result) => {
//                             if (result) {
//                                 //strings matched
//                                 //hash password again
//                                 bcrypt
//                                     .hash(newPassword, 10)
//                                     .then((hashedNewPassword) => {
//                                         //update user password
//                                         User.updateOne(
//                                             { _id: userId },
//                                             { password: newPassword }
//                                         )
//                                             .then(() => {
//                                                 //update complete delete reset record
//                                                 PasswordReset.deleteOne(
//                                                     { userId }
//                                                         .then(() => {
//                                                             //both user record and reset record updated
//                                                             res.json({
//                                                                 status: 'SUCCESS',
//                                                                 message:
//                                                                     'Password has been reset successfully',
//                                                             });
//                                                         })
//                                                         .catch((error) => {
//                                                             console.log(error);
//                                                             res.json({
//                                                                 status: 'FAILED',
//                                                                 message:
//                                                                     'An error occured while finalizing password reset',
//                                                             });
//                                                         })
//                                                 );
//                                             })
//                                             .catch((error) => {
//                                                 console.log(error);
//                                                 res.json({
//                                                     status: 'FAILED',
//                                                     message:
//                                                         'Updating user password failed',
//                                                 });
//                                             });
//                                     })
//                                     .catch((error) => {
//                                         console.log(error);
//                                         res.json({
//                                             status: 'FAILED',
//                                             message:
//                                                 'An Error while hashing new password',
//                                         });
//                                     });
//                             } else {
//                                 //existing record but incorrect reset string
//                                 res.json({
//                                     status: 'FAILED',
//                                     message:
//                                         'Invalid password reset details passed',
//                                 });
//                             }
//                         })
//                         .catch((error) => {
//                             console.log(error);
//                             res.json({
//                                 status: 'FAILED',
//                                 message:
//                                     'Comparing password resetr string failed',
//                             });
//                         });
//                 }
//             } else {
//                 // password reset account doesnt exists
//                 res.json({
//                     status: 'FAILED',
//                     message: 'Password reset request not found.',
//                 });
//             }
//         })
//         .catch((error) => {
//             console.log(error);
//             res.json({
//                 status: 'FAILED',
//                 message: 'Checking for existing password reset records failed',
//             });
//         });
// };
