const signOutUser = (req, res) => {
    try {
        res.clearCookie('authToken', {
             httpOnly: true, 
             sameSite: 'Strict'
            });
        return res.status(200).json({ message: 'Sign Out Successful' });
    } catch (err) {
        return res.status(500).json({ message: "An Unknown Error has occurred" });
    }
}
module.exports = { signOutUser };
