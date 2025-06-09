// const tokenExpire = 1;  // in min
const tokenExpire = 10;  // in min
// const tokenExpire = 24 * 60;  // min * 60

// everything is in seconds
const accessTokenExpire = 15 * 60;   // 15 minutes
const refreshTokenExpire = 14 * 24 * 60 * 60;   // 14 days


module.exports = {
    tokenExpire,
    accessTokenExpire,
    refreshTokenExpire
}