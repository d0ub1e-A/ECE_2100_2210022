const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../utility/generateToken');
const { setToken } = require('../utility/tokenSet');
const { generateAccessTokenCookie, generateRefreshTokenCookie } = require('../utility/generateCookie');

async function login(req, res) {
    try {

        const { email, password } = req.body;

        // if anything is missing
        if (!email || !password) {
            res.status(400).json({ error: "provide all the request data" });
            return;
        }

        // searching with email
        const result = await db.query(
            `SELECT user_id, name, password FROM "user" WHERE email = $1`,
            [email]
        );

        // if the user doesn't exist
        if (result.rowCount === 0) {
            return res.status(401).json({ error: "email or password incorrect" });
        }

        const match = await bcrypt.compare(password, result.rows[0].password);

        // if (result.rows[0].password === password) {
        if (match) {

            // the infos, which will be saved in the JWTs
            const user_info = {
                user_id: result.rows[0].user_id,
            };

            // console.log(user_info);
            const accessToken = await generateAccessToken({ user_info });
            const refreshToken = await generateRefreshToken({ user_info });

            // adds rToken in db
            await setToken(refreshToken);

            // send tokens in cookies
            res.cookie('accessToken', accessToken, generateAccessTokenCookie());
            res.cookie('refreshToken', refreshToken, generateRefreshTokenCookie());

            res.status(200).json({
                name: result.rows[0].name,
            });

        }
        else {
            res.status(401).json({ error: "email or password incorrect" });
        }

    } catch (error) {
        console.error("Login error: ", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = login;