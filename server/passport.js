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
  async function(accessToken, refreshToken, profile, done) {
    const googleuserinfo = { //set the user info from google for setting new user in db
      email: profile._json.email,
      firstname: profile._json.given_name,
      lastname: profile._json.family_name,
      password: profile._json.sub
    }
    const selector = { where: { email: googleuserinfo.email } };
    //check if user is already in db, if not create new user in db
    const user = await User.findOne(selector);
    if(!user){
      await User.create(googleuserinfo)
    }

    done(null, profile)
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});