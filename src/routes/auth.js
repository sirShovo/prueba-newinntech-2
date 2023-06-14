import { Router } from 'express';
const router = Router();
import { authenticate } from '../auth/facebook';
import { authenticate as _authenticate } from '../auth/google';
import { authenticate as __authenticate } from '../auth/github';
import User from '../models/User';

/* LOGIN ROUTER */
router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Please Sign In with:' });
});

/* LOGOUT ROUTER */
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

/* FACEBOOK ROUTER */
router.get('/facebook',
  authenticate('facebook'));

router.get('/facebook/callback',
  authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/users');
  });

/* GOOGLE ROUTER */
router.get('/google',
  _authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback',
  _authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/users');
  });

/* GITHUB ROUTER */
router.get('/github',
  __authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback',
  __authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/users');
  });

export default router;
