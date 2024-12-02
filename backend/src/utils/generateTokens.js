import { SERVER_ERROR } from '../constants/statusCodes.js';

const generateTokens = async (user) => {
    try {
        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while generating tokens.',
            erorr: err.message,
        });
    }
};

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            user, // saving complete user in access token
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

const generateRefreshToken = (userId) => {
    return jwt.sign(
        {
            userId, // just saving the _id in refresh token in db
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

export { generateTokens, generateAccessToken, generateRefreshToken };
