const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user to the database
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

module.exports = { registerUser, loginUser };
