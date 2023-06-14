import { Router } from 'express';
const router = Router();

/* GET users listing. */
router.get('/', ensureAuthenticated, (req, res, next) => {
  res.render('user', { user: req.user });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/login')
}

export default router;
