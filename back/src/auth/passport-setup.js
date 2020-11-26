const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    // user.findById(id, function(err, user) {
      done(null, user);
    // });
});

passport.use(new GoogleStrategy({
    clientID: "83533069546-s6vbu4lr2mnu1m8ieucm1tl0oh7cob15.apps.googleusercontent.com",
    clientSecret: "GJ6Cdy4ETfGaOrTV-fH40iU3",
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(null, profile);
    // });
  }
));

