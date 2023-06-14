import passport, { use } from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import { findOrCreate } from '../models/User';

use(
  new GitHubStrategy(
    {
      clientID: 'e7b10decd2ed4ef13816',
      clientSecret: 'bb073a53914d014f328de98ad9fe5a3cff366912',
      callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
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
