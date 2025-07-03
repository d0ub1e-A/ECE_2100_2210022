const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');

// get user info
async function getUser(req, res) {
    try {

        const { user_id } = req.user.user_info;
        // console.log(req.user);

        const result = await db.query(
            `SELECT name, email FROM "user" WHERE user_id = $1`,
            [user_id]
        );

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error("user info get error: ", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// update user info
async function updateUser(req, res) {
    try {

        const { user_id } = req.user.user_info;
        const { name, email } = req.body;

        await db.query(
            `UPDATE "user" SET name = COALESCE($1, name), email = COALESCE($2, email) WHERE user_id = $3`,
            [name, email, user_id]
        );

        res.sendStatus(200);

    } catch (error) {
        console.error("user update error: ", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// delete user
async function deleteUser(req, res) {
    try {

        const { user_id } = req.user.user_info;

        await db.query(
            `DELETE FROM "user" WHERE user_id = $1`,
            [user_id]
        );

        res.sendStatus(200);

    } catch (error) {
        console.error("user deletion error: ", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// update password
async function updateUserPass(req, res) {
    try {

        const { user_id } = req.user.user_info;
        const { old_password, new_password } = req.body;

        const result = await db.query(
            `SELECT password FROM "user" WHERE user_id = $1`,
            [user_id]
        );

        const match = bcrypt.compareSync(old_password, result.rows[0].password);

        // if (result.rows[0].password !== old_password) {
        if (!match) {
            return res.status(401).json({ error: "wrong password" });
        }

        const salt = 10;
        const hash = bcrypt.hashSync(new_password, salt);

        await db.query(
            `UPDATE "user" SET password = $1 WHERE user_id = $2`,
            [hash, user_id]
            // [new_password, user_id]
        );

        res.sendStatus(200);

    } catch (error) {
        console.error("user deletion error: ", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    getUser,
    updateUser,
    deleteUser,
    updateUserPass
}