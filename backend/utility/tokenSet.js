const db = require('../config/dbConfig');

// insert the token in db
async function setToken(rToken) {
    try {

        await db.query(`INSERT INTO "jwt"(token) VALUES ($1)`, [rToken]);

    } catch (error) {
        console.error("Token Insertion error: ", error);
    }
}

// see if the tooken exist in db
async function hasToken(rToken) {
    try {

        const result = await db.query(`SELECT 1 FROM "jwt" WHERE token = $1`, [rToken]);
        return result.rowCount > 0;

    } catch (error) {
        console.error("Token finding error: ", error);
    }
}

// delete token
async function delToken(rToken) {
    try {

        await db.query(`DELETE FROM "jwt" WHERE token = $1`, [rToken]);
        
    } catch (error) {
        console.error("Token deletion error: ", error);
    }
}


module.exports =
{
    setToken,
    hasToken,
    delToken
};
