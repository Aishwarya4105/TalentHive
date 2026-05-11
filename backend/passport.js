const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User"); // adjust path if needed

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
     callbackURL: "http://localhost:5000/api/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
    try {
        //  Extract user data from Google
        const email = profile.emails[0].value;

        //Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
            // If exists → link Google account if not already linked
            if (!user.googleId) {
                user.googleId = profile.id;
                user.authProvider = "google";

                // Optional: update profile image
                user.profileImage = profile.photos?.[0]?.value;

                await user.save();
            }

            return done(null, user);
        }

        // If user does NOT exist → create new user
        user = await User.create({
            name: profile.displayName,
            email: email,
            googleId: profile.id,
            authProvider: "google",
            profileImage: profile.photos?.[0]?.value
        });

        return done(null, user);

    } catch (error) {
        console.error("Google Auth Error:", error);
        return done(error, null);
    }
}));

// Session handling
passport.serializeUser((user, done) => {
    done(null, user.id); // store user ID in session
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;