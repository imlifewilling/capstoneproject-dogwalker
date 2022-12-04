const passport = require('passport');
const { User } = require('./db');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

GOOGLE_CLIENT_ID = '130142692712-dk8nq3p24qsmn72o457ncve4s12fjsd5.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET = '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'

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});