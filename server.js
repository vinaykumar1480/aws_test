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
const connectDB = require('./config/db');
var app = express();


/*app.use((req, res, next) => {
    console.log('Middleware running');
    req.Name = "Middle";
    next();
});*/

app.use(morgan('dev'));
app.use(express.json({}));
app.use(express.json({
    extended: true
}));

dotenv.config({
    path: './confi/config.env'
});

connectDB();

app.use('/api/orc/auth', require('./routes/user'));

const port = process.env.PORT || 5000;

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    //for (var i in uri) {
    console.log(`Example app listening at ${port}`.red.underline.bold);
    //}
    
});
