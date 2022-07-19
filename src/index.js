const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');

// Initializations
const app = express();
require('./supabase');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));


// Routes
app.use(require('./routes/index'));
app.use(require('./routes/jokes'));
app.use(require('./routes/users'));

// Statics
app.use(express.static(path.join(__dirname, 'public')));

// Listening
app.listen(app.get('port'), function () {
    console.log("Server on port", app.get('port'));
});
