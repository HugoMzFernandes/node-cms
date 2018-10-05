/**
 * Module dependencies.
 */

const express = require('express')
  , http = require('http')
  , path = require('path')
  , minifyHTML = require('express-minify-html')
  , compression = require('compression')
  , bodyParser = require("body-parser")
  , mongoose = require("mongoose")
  , session = require('express-session')
  , cookieParser = require('cookie-parser')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , flash = require('connect-flash')
  , sassMiddleware = require('node-sass-middleware')
  , twig = require('twig')
  , MongoStore = require('connect-mongo')(session);

var app = express();

app.set('port', process.env.PORT || 3000);

twig.cache(false);
app.set('views', __dirname + '/views');
app.set('view engine', 'twig');
// app.set('view cache', false);

app.use(minifyHTML({
    override:      true,
    exception_url: false,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true
    }
}));

app.use(compression());

// build mongo database connection url //

process.env.DB_HOST = process.env.DB_HOST || 'localhost'
process.env.DB_PORT = process.env.DB_PORT || 27017;
process.env.DB_NAME = process.env.DB_NAME || 'biologixcms';

process.env.DB_URL = "mongodb://localhost:27017/biologixcms";

mongoose.createConnection(process.env.DB_URL, function(err) {
    if (err) throw err;
    console.log("Successfully connected to MongoDB");
});

/*
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  app.use(express.errorHandler());
}
*/

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.use(cookieParser());
app.use(session({
  secret : 'biologix',
  cookie: { maxAge: 1.28e+8 },
  resave: false,
  rolling: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.DB_URL
  })
  })
);

app.use(passport.initialize());

app.use(flash());

app.use(passport.session());

// passport config
var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy((username, password, done) => {


  User.findOne({ username: username }, function(err, user) {
    

    if (err) { return done(err); }
    if (!user) { 
      return done(null, false);
    }

    var isMatch = user.comparePassword(password);
    if (!isMatch) { return done(null, false); }

    return done(null, user);
  });
  }
));


var routes = require('./routes')(app);

// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

app.use(function(req, res, next){
    res.locals.success_messages = req.flash('success');
    res.locals.error_messages = req.flash('error');
    console.log(res.locals.error_messages);
    next();
});

 app.use(sassMiddleware({
    src: __dirname + '/sass', //where the sass files are 
    dest: path.join(__dirname, '/public'), //where css should go
    debug: true, // obvious
    outputStyle: 'compressed'
  })
 );

app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
