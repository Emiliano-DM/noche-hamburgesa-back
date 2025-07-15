import bcrypt from "bcryptjs";
import fs from "fs/promises";

const db = './db.json';


async function getUsers() {
  const data = await fs.readFile(db, 'utf-8');
  return JSON.parse(data);
}

export async function addUser(username, password) {
    const hashed = await bcrypt.hash(password, 10);
    const data = await getUsers()

    data.usuarios.push({ username, password: hashed }); 

    await fs.writeFile(db, JSON.stringify(data, null, 2), 'utf8');
}

export async function findUser(username) {
    const data = await getUsers();
    const users = data.usuarios || [];
    return users.find(u => u.username === username);
}

