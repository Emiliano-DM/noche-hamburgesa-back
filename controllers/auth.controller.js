import { addUser, findUser } from "../models/user.model.js";
import bcrypt from "bcryptjs";


export async function register(req, res) {
  const { username, password, ...userData } = req.body;
  console.log(isValidUserData(userData));
  if (!isValidUserData(userData)) {
    return res.status(400).json({ error: 'Invalid user data format', data: userData });
  }
  const existingUser = await findUser(username);
  if (existingUser) return res.status(400).send('User already exists');

  await addUser(username, password, userData);
  res.send('User registered');
}

export async function login(req, res) {
  const { username, password } = req.body;

  const user = await findUser(username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
      }

  req.session.user = user.username;
  res.send('Logged in');
}

export async function logout(req, res) {
  req.session.destroy(() => {
    res.send('Logged out');
  });
}

function isValidUserData(userData) {
  const { nombre, apellido, edad, interesses } = userData;
  if (
    typeof nombre !== 'string' || !nombre.trim() ||
    typeof apellido !== 'string' || !apellido.trim() ||
    typeof edad !== 'number' || edad < 0 ||
    !Array.isArray(interesses) || !interesses.every(i => typeof i === 'string')
  ) {
    return false;
  }

  return true;
}