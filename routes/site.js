const passport = require('passport');
const login = require('connect-ensure-login');
const user = require('../db/user');
const path = require('path');

module.exports.index = (request, response) => response.sendFile(path.resolve(__dirname + '/../static/login.html'));
module.exports.loginForm = (request, response) => response.sendFile(path.resolve(__dirname + '/../static/login.html'));
module.exports.signUpForm = (request, response) => response.sendFile(path.resolve(__dirname + '/../static/signup.html'));
module.exports.appSignUpForm = (request, response) => response.sendFile(path.resolve(__dirname + '/../static/app-signup.html'));
module.exports.secretPage = (request, response) => response.sendFile(path.resolve(__dirname + '/../static/secret.html'));

module.exports.login = passport.authenticate('local', { successReturnToOrRedirect: '/secretPage', failureRedirect: '/login' });
module.exports.signup = (request, response) => {
  user.register({ username: request.body.username, active: false }, request.body.password);
  response.send(`Welcome to the special club ${request.body.username}! Please Sign-In<br><br>
   <a href="/login">Sign-In</a><br><br>`);
};

module.exports.appSignup = (request, response) => {
  user.register({ username: request.body.username, active: false }, request.body.password);
  response.send(`Welcome to the club ${request.body.username}! Please Sign-In<br><br>
   <a href="/login">Sign-In</a><br><br>`);
};

module.exports.logout = (request, response) => {
  request.logout();
  response.redirect('/');
};

