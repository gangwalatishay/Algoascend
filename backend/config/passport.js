const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const AppleStrategy = require('passport-apple');
const User = require('../models/User');

// Serialize user for session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Helper function to create or find OAuth user
async function findOrCreateOAuthUser(profile, provider, done) {
    try {
        let email, name, id;

        if (provider === 'google') {
            email = profile.emails[0].value;
            name = profile.displayName;
            id = profile.id;
        } else if (provider === 'apple') {
            email = profile.email;
            name = profile.name ? `${profile.name.firstName} ${profile.name.lastName}` : 'Apple User';
            id = profile.id;
        }

        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
            return done(null, user);
        }

        // Create new user from OAuth profile
        const newUser = new User({
            name,
            email,
            password: `${provider}-oauth-` + Math.random().toString(36).substring(7),
            mobile: `${provider}-oauth-${id}`,
            role: 'student',
            isPhoneVerified: true,
            institution: '',
            batchYear: '',
            companyName: ''
        });

        await newUser.save();
        return done(null, newUser);
    } catch (error) {
        return done(error, null);
    }
}

// Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            return findOrCreateOAuthUser(profile, 'google', done);
        }
    )
);

// Apple OAuth Strategy
passport.use(
    new AppleStrategy(
        {
            clientID: process.env.APPLE_CLIENT_ID,
            teamID: process.env.APPLE_TEAM_ID,
            keyID: process.env.APPLE_KEY_ID,
            privateKeyString: process.env.APPLE_PRIVATE_KEY,
            callbackURL: process.env.APPLE_CALLBACK_URL || 'http://localhost:5000/api/auth/apple/callback',
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, idToken, profile, done) => {
            return findOrCreateOAuthUser(profile, 'apple', done);
        }
    )
);

module.exports = passport;
