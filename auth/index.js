const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const localdb = require('../localdb');
const db = require('../db');

/**
 * LocalStrategy
 *
 * This strategy is used to authenticate users based on a username and password.
 * Anytime a request is made to authorize an application, we must ensure that
 * a user is logged in before asking them to approve the request.
 */
passport.use(db.user.createStrategy());

// To use with sessions
passport.serializeUser(db.user.serializeUser());
passport.deserializeUser(db.user.deserializeUser());

/**
 * BasicStrategy & ClientPasswordStrategy
 *
 * These strategies are used to authenticate registered OAuth clients. They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens. The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate. Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header). While this approach is not recommended by
 * the specification, in practice it is quite common.
 */
passport.use(new BasicStrategy(db.client.createStrategy()));
passport.use(new ClientPasswordStrategy(db.client.createStrategy()));

/**
 * BearerStrategy
 *
 * This strategy is used to authenticate either users or clients based on an access token
 * (aka a bearer token). If a user, they must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 */
passport.use(new BearerStrategy(
  (accessToken, done) => {
<<<<<<< HEAD
    localdb.accessTokens.find(accessToken, (error, token) => {
=======
    db.accessTokens.find(accessToken, (error, token) => {
>>>>>>> 6137dd3786d793295a97ec38f8e938f0005f8de9
      if (error) return done(error);
      if (!token) return done(null, false);
      if (token.userId) {
        db.users.findById(token.userId, (error, user) => {
          if (error) return done(error);
          if (!user) return done(null, false);
          // To keep this example simple, restricted scopes are not implemented,
          // and this is just for illustrative purposes.
          done(null, user, { scope: '*' });
        });
      } else {
        // The request came from a client only since userId is null,
        // therefore the client is passed back instead of a user.
        db.clients.findByClientId(token.clientId, (error, client) => {
          if (error) return done(error);
          if (!client) return done(null, false);
          // To keep this example simple, restricted scopes are not implemented,
          // and this is just for illustrative purposes.
          done(null, client, { scope: '*' });
        });
      }
    });
  }
));
