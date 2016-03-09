var express = require('express'),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    path = require('path');




var app = express();



var routes = require('./routes/api.js');

app.use(express.static('./client'));

app.use(favicon('./client/images/favicon.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/user/', routes);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// error hndlers
app.use(function (req, res, next) {
    var url = req.originalUrl;
    console.log('error caused by this url -> ' + url);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.end(JSON.stringify({
        message: err.message,
        error: {}
    }));
});

module.exports = app;