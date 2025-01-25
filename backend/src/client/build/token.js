const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "THIS_KEY_IS_TEMPORARY";


const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(400).json({ message: 'Authentication required' });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid authentication token'});
    }

    req.userId = decodedToken.userId;
    next();
  });
};

const sendAuthTokenCookie = (userId, res) => {
  const authToken = jwt.sign(
    { userId },
    JWT_SECRET_KEY,
    { expiresIn: '2hr' }
  );
  res.cookie('authToken', authToken, {
    httpOnly: true,
    sameSite: 'Strict',
    maxAge: 2 * 60 * 60 * 1000 
  });
};
module.exports = { verifyToken, sendAuthTokenCookie };