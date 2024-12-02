import bcrypt from 'bcrypt';

export const validatePassword = async (password, hashedPassword) => {
    try {
        return bcrypt.compare(password, hashedPassword);
    } catch (err) {
        throw err;
    }
};
