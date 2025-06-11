require('dotenv').config();
// const tokenExpire = require('../utility/tokenExpire');
const { refreshTokenExpire } = require('./tokenExpire');


// access token cookie details
/* access token maxAge should be same as refresh token */
function generateAccessTokenCookie() {

    const cookieProperty = {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'None',
        secure: true,
        maxAge: (refreshTokenExpire + 10) * 1000,  // [rtoken expiry (sec) + 10 sec]
        partitioned: true
    }

    return cookieProperty;
}

// refresh token cookie details
function generateRefreshTokenCookie() {

    const cookieProperty = {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'None',
        secure: true,
        maxAge: (refreshTokenExpire + 10) * 1000,  // [rtoken expiry (sec) + 10 sec]
        partitioned: true
    }

    return cookieProperty;
}


module.exports = {
    generateAccessTokenCookie,
    generateRefreshTokenCookie
}