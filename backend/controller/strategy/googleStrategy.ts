import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import dotenv from "dotenv";
import { Request } from "express";
import User, { IUSER } from "../../models/User";

// Load .env configuration
dotenv.config();

// Use Google Strategy with Passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "", // From Google Cloud Console
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "", // From Google Cloud Console
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "", // Backend URL that Google redirects to
      passReqToCallback: true, // To get access to the request object
    },

    // Verify callback after Google authentication
    async (
      req: Request,
      accessToken, // Access token provided by Google
      refreshToken, // Refresh token from Google
      profile: Profile, // User profile from Google
      done: (error: any, user?: IUSER | false) => void // Passport callback
    ) => {
      const { emails, displayName, photos } = profile;
      console.log("this is my profile", profile); // Useful for debugging Google response

      try {
        // Check if user already exists
        let user = await User.findOne({ email: emails?.[0]?.value });

        if (user) {
          // If profile picture is missing in DB but provided by Google, update it
          if (!user.profilePicture && photos?.[0]?.value) {
            user.profilePicture = photos?.[0]?.value;
            await user.save();
          }

          // User found, proceed with login
          return done(null, user);
        }

        // If user does not exist, create new user
        user = await User.create({
          googleId: profile.id,
          name: displayName,
          email: emails?.[0]?.value,
          profilePicture: photos?.[0]?.value,
          isVerified: true, // Mark Google users as verified
          agreeTerms: true, // Auto-agree terms (you can modify this logic)
        });

        // Pass new user to Passport
        done(null, user);
      } catch (error) {
        console.log(error);
        done(error); // Handle error in Passport flow
      }
    }
  )
);
