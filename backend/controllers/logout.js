// const db = require('../config/database');
const { delToken } = require('../utility/tokenSet');

// Logout function: it clears cookies
async function logout(req, res) {
    try {

        // const { user_id, role } = req.user.user_info;
        const rtoken = req.cookies.refreshToken;
        // console.log(rtoken);

        await delToken(rtoken);

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        res.sendStatus(200);

    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = logout;