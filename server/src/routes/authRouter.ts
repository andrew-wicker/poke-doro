import express, { Request, Response } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface JwtPayload {
  sub: string;
  name: string;
}

declare global {
  namespace Express {
    interface User {
      id: string;
      displayName: string;
    }
  }
}

const authRouter = express.Router();

const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET || '';
const JWT_SECRET: string = process.env.JWT_SECRET || '';

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
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
          });
        }

        // create plain JS object literal to work around Mongoose objects
        const userObject = {
          id: user.id,
          displayName: user.displayName,
        };

        return done(null, userObject);
      } catch (error) {
        console.error('Error processing Google Login: ', error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id).lean();

    if (!user) {
      return done(null, false);
    }

    const userObject = {
      id: user._id.toString(),
      displayName: user.displayName,
    };

    done(null, userObject);
  } catch (error) {
    done(error);
  }
});

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    if (!req.user) {
      return res.redirect('/login');
    }

    const payload: JwtPayload = {
      sub: req.user.id,
      name: req.user.displayName,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`http://localhost:5173?token=${token}`);
  }
);

export default authRouter;
