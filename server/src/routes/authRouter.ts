import express, { Request, Response } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import 'dotenv/config';

const authRouter = express.Router();

const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET || '';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
      callbackURL: '/auth/google/callback',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    const userToken = 'user-specific-token';
    res.redirect(`http://localhost:5173?token=${userToken}`);
  }
);

export default authRouter;
