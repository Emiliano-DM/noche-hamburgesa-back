import express from "express";
import cors from "cors";
import { findUser, addUser } from "./user.js";
import bcrypt from "bcryptjs";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();


const sessionSecret = process.env.SESSION_SECRET;
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true
}));


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await findUser(username);
    if (existingUser) return res.status(400).send('User already exists');
    await addUser(username, password);
    res.send('User registered');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await findUser(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
    }

    req.session.user = user.username;
    res.send('Logged in');
});

app.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.status(401).send('Not logged in');
    res.send(`Hello, ${req.session.user}`);
});

app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.send('Logged out');
    });
});




app.get("/", (req, res) => {
  res.json("Success!");
});

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});