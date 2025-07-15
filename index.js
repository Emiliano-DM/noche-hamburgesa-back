import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';


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


app.use(authRoutes);
app.use(dashboardRoutes);




app.get("/", (req, res) => {
  res.json("Success!");
});

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});