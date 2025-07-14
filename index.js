import express from "express";
import cors from "cors";


const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Success!");
});

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});