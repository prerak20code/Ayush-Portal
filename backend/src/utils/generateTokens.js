import jwt from 'jsonwebtoken';

const generateTokens = async (user, roleKey) => {
    try {
        const accessToken = await generateAccessToken(user, roleKey);
        const refreshToken = await generateRefreshToken(user._id, roleKey);

        return { accessToken, refreshToken };
    } catch (err) {
        throw new Error(`error occured while generating tokens, error: ${err}`);
    }
};

const generateAccessToken = async (user, roleKey) => {
    const { _id, email, name, phone, dateOfBirth } = user;

    return jwt.sign(
        { _id, email, name, phone, dateOfBirth, roleKey }, // saving complete user in access token
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

const generateRefreshToken = async (userId, roleKey) => {
    return jwt.sign(
        {
            userId, // just saving the _id in refresh token in db
            roleKey,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

export { generateTokens, generateAccessToken, generateRefreshToken };
