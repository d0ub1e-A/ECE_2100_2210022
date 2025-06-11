const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const server = http.createServer(app);

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// cors settings
const ALLOWED_ORIGIN = process.env.FRONTEND_URL;
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || origin == ALLOWED_ORIGIN) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));


// all api routes
const apiRoutes = require('./routes/apiRoutes');
app.use('/', apiRoutes);


// Error handling middlewares
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something is wrong!' });
});


server.listen(3000, () => {
    console.log(`http://localhost:3000`);
});
