import bcrypt from 'bcrypt';
import { User, UserVerification, PasswordReset } from '../models/index.js';
import { v4 as uuid } from 'uuid';
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
            //verification record exists
            const { expiresAt } = verificationRecord;
            const hashedUniqueString = verificationRecord.uniqueString;

            // check for expired unique string
            if (expiresAt < Date.now()) {
                // record expired => delete it
                const deletedVerificationRecord =
                    await UserVerification.deleteOne({ userId });
                if (deletedVerificationRecord) {
                    const deletedUser = await User.deleteOne({ _id: userId });
                    if (deletedUser) {
                        res.status(BAD_REQUEST).json({
                            message:
                                'your verification link has expired please sign up again',
                        });
                    }
                }
            } else {
                //link is not expired => proceed

                // compare hashed string
                const doesStringsMatch = await bcrypt.compare(
                    uniqueString,
                    hashedUniqueString
                );
                if (doesStringsMatch) {
                    const updatedUser = await User.updateOne(
                        { _id: userId },
                        { verified: true }
                    );
                    if (updatedUser) {
                        const deletedVerificationRecord =
                            await UserVerification.deleteOne({ userId });
                        if (deletedVerificationRecord) {
                            res.status(OK).json({
                                message: 'email verified successfully',
                            });
                        }
                    }
                } else {
                    res.status(BAD_REQUEST).json({
                        message: 'invalid verification details provided.',
                    });
                }
            }
        } else {
            res.status(BAD_REQUEST).json({
                message:
                    "account record doesn't exits or has been verified already, please sign up or login",
            });
        }
    } catch (err) {
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

        //check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            //Already exists
            res.status(BAD_REQUEST).json({
                message: 'user already exists with this email',
            });
        } else {
            //create new user
            //password hashing ( auto done using pre hook )
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
                await sendVerificationEmail(newUser, res);
            }
        }
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
                    const { accessToken, refreshToken } =
                        await generateTokens(user);

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

const logout = async (req, res) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, {
            $set: { refreshToken: '' },
        });
        return res
            .status(OK)
            .clearCookie('accessToken', cookieOptions)
            .clearCookie('refreshToken', cookieOptions)
            .json({ message: 'user logged out successfully' });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while logging out user',
            err: err.message,
        });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = req.user;
        res.status(OK).json(user);
    } catch (err) {
        res.status(SERVER_ERROR).json({
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
        const transporter = await getTranporter();
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
    logout,
    getCurrentUser,
    resetPassword,
    requestResetPassword,
    sendPasswordResetEmail,
};
