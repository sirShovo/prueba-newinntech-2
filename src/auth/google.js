import passport, { use } from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { findOrCreate } from '../models/User';

use(
  new GoogleStrategy(
    {
      clientID:
        '591307876438-4nmmm817vks785u467lo22kss40kqno2.apps.googleusercontent.com',
      clientSecret: 'BagENe4LxG_PZ_qz2oFX7Aok',
      callbackURL: 'http://127.0.0.1:3000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      findOrCreate(
        { userid: profile.id },
        { name: profile.displayName, userid: profile.id },
        (err, user) => done(err, user),
      );
    },
  ),
);

export default passport;
