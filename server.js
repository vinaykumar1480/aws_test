/*var http = require("http");
http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    // Send the response body as "Hello World"
    response.end('Hello Vinay');
}).listen(8081);
console.log('Server running at http://127.0.0.1:8081/');*/

const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
var app = express();

/*app.use((req, res, next) => {
    console.log('Middleware running');
    req.Name = "Middle";
    next();
});*/

dotenv.config({
    path: './config/config.env'
});

//connect to DB
connectDB();

//middlewares
app.use(morgan('dev'));
app.use(express.json({}));
app.use(express.json({
    extended: true
}));
app.use(cors());

//route register
app.use('/api/orc/auth', require('./routes/user'));
app.use('/api/orc/user', require('./routes/Attendance'));
app.use('/api/orc/user', require('./routes/Touchpoints'));
app.use('/api/orc/user', require('./routes/Subscription'));

app.use((req, res, next) => { //route not found
    const error = new Error('Not found.');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {message: error.message}
    })
});

const port = process.env.PORT || 80;

app.on('listening', function () {
    console.log('ok, server is running');
});

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    //for (var i in uri) {
    console.log(`Example app listening at ${port}`.red.underline.bold);
    //}
    
});
