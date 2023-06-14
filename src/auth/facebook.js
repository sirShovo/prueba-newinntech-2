import passport, { use } from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { findOrCreate } from '../models/User';

use(
  new FacebookStrategy(
    {
      clientID: '159030901322260',
      clientSecret: '0d641e47f5d55af221ec80346f3f2d43',
      callbackURL: 'http://127.0.0.1:3000/auth/facebook/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      findOrCreate(
        { userid: profile.id },
        { name: profile.displayName, userid: profile.id },
        (err, user) => {
          if (err) {
            return done(err);
          }
          done(null, user);
        },
      );
    },
  ),
);

export default passport;
