const bcrypt = require('bcrypt');
const User = require('../../models/entities/users');
const { sendAuthTokenCookie } = require('./token');

const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }



        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        sendAuthTokenCookie(user.id, res)

        return res.status(201).json({ message: 'Sign In Successful' , userName: `${user.firstName} ${user.lastName}`});
    } catch (err) {
        return res.status(500).json({ message: "An Unknown Error has occured" })
    }
}

module.exports = { signInUser };
