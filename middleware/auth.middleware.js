import session from 'express-session';

export async function ensureLoggedIn(req, res, next) {
  if (!req.session.user) return res.status(401).send('Not logged in');
  req.user = {
    id: req.session.user.id
  }
  next();
}