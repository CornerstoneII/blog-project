import express from "express";

const app = express();

const PORT = 7070;

app.get("/hello", (req, res) => res.send("Hello"));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
