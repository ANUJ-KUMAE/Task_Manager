const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const AuthModel = require("../Models/Auth-Model");
const userModels = require("../Models/Google-LoginModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/User/google/callback",
      scope: ["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userModels.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await userModels.create({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
          });
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});


passport.deserializeUser((user, done) => {
     done(null, user)
})
