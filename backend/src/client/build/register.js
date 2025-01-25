const bcrypt = require('bcrypt');
const User = require('../../models/entities/users');
const { sendAuthTokenCookie } = require('./token');


const registerUser = async (req, res) => {
  try {

    const { firstName, lastName, email, password } = req.body;
    // Validate Parameters
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    if (firstName.trim().length == 0 || firstName.length > 64) {
      return res.status(400).json({ message: 'Invalid First Name' })
    }
    if (lastName.trim().length == 0 || lastName.length > 64) {
      return res.status(400).json({ message: 'Invalid Last Name' })
    }
    if (!email.includes('@')) {
      return res.status(400).json({ message: 'Invalid Email' })
    }
    if (password.length < 8 || password.length > 64) {
      return res.status(400).json({ message: 'Please select password between 8 and 64 characters' })
    }
    const emailLower = email.trim().toLowerCase()
    const duplicate = await User.findOne({ email: emailLower })
    if (duplicate) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    // Store user and password
    const salt_rounds = 10
    const hashedPassword = await bcrypt.hash(password, salt_rounds)
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: emailLower,
      password: hashedPassword
    })

    await newUser.save();
    sendAuthTokenCookie(newUser.id, res)
    return res.status(201).json({ message: 'Registration Successful', userName: `${newUser.firstName} ${newUser.lastName}` });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "An Unknown Error has occured" })
  }
};



module.exports = { registerUser };
