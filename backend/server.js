const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

const server = http.createServer(app);

// all api routes
const apiRoutes = require('./routes/apiRoutes');
app.use('/', apiRoutes);


server.listen(3000, () => {
   console.log(`http://localhost:3000`); 
});
