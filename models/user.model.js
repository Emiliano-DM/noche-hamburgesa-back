import fs from "fs/promises";
import bcrypt from "bcryptjs";

const db = './db.json';

async function getUsers() {
  const data = await fs.readFile(db, 'utf-8');
  return JSON.parse(data);
}

export async function addUser(username, password) {
  const hashed = await bcrypt.hash(password, 10);
  const data = await getUsers();

  if (!data.usuarios) data.usuarios = [];

  data.usuarios.push({ username, password: hashed });
  await fs.writeFile(db, JSON.stringify(data, null, 2));
}

export async function findUser(username) {
  const data = await getUsers();
  return (data.usuarios || []).find(u => u.username === username);
}
