const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../utility/generateToken');
const { setToken } = require('../utility/tokenSet');
const { generateAccessTokenCookie, generateRefreshTokenCookie } = require('../utility/generateCookie');
require('dotenv').config();

// signup with password hashing
async function signup(req, res) {
    try {

        const { name, email, password } = req.body;

        // if anything is missing
        if (!name || !email || !password) {
            res.status(400).json({ error: "provide all the request data" });
            return;
        }

        // checking if email already exist
        const check = await db.query(
            `SELECT 1 AS ok FROM "user" WHERE email = $1`,
            [email]
        );

        if (check.rowCount !== 0) {
            return res.status(401).json({ error: "email already exist" });
        }

        const salt = 10;
        const hash = bcrypt.hashSync(password, salt);
        // console.log(hash);

        const result = await db.query(
            `INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
            [name, email, hash]
            // [name, email, password]
        )
        // console.log(result.rows[0]);

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

        res.status(201).json({
            name: result.rows[0].name,
        });

    } catch (error) {
        console.error("Signup error: ", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = signup;
