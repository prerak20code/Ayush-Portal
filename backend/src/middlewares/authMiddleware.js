import jwt from 'jsonwebtoken';

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    // Get the token from the authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res
            .status(401)
            .json({ message: 'Access Denied: No Token Provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from header

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        res.status(401).json({ message: 'Access Denied: Invalid Token' });
    }
};

export default isAuthenticated;
