const express = require('express');
const ejs = require('ejs');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const session = require('express-session');
const passport = require('passport');
const routes = require('./routes');

// Express configuration
const app = express();
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');
app.set('views', path.join(__dirname, './static'));
app.use(cookieParser());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./auth');

app.get('/', routes.site.index);
app.get('/login', routes.site.loginForm);
app.get('/signupPage', routes.site.signUpForm);
app.get('/secretPage', routes.site.secretPage);
app.get('/appSignupPage', routes.site.appSignUpForm);
app.post('/login', routes.site.login);
app.post('/signup', routes.site.signup);
app.post('/appSignup', routes.site.appSignup);
app.get('/logout', routes.site.logout);

app.get('/dialog/authorize', routes.oauth2.authorization);
app.post('/dialog/authorize/decision', routes.oauth2.decision);
app.post('/oauth/token', routes.oauth2.token);

app.get('/api/userinfo', routes.user.info);
app.listen(process.env.PORT || 3000);

// Required for @now/node, optional for @now/node-server.
module.exports = app;
