import session from 'express-session';

export async function dashboard(req, res, next) {
  if (!req.session.user) return res.status(401).send('Not logged in');
  next();
}