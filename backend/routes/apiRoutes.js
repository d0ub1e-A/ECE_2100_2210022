const express = require('express');
const router = express.Router();

// routes
const authRoute = require('./authRoutes');
const userRoute = require('./userRoutes');
const noteRoute = require('./noteRoutes');


// test route
router.get('/', (req, res) => {
    res.sendStatus(200);
})

// auth route
router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/notes', noteRoute);


module.exports = router;
