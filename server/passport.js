const passport = require('passport');
const { User } = require('./db');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;


GOOGLE_CLIENT_ID = '130142692712-dk8nq3p24qsmn72o457ncve4s12fjsd5.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET = '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'

GITHUB_CLIENT_ID = 'd232aaeb998e33fdd016'
GITHUB_CLIENT_SECRET = '347a66659a1f2ddb342e242b4ccfa1cb4d1baf6e'

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

passport.use(new GithubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/auth/github/callback",
  scope: ['user:email'],
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