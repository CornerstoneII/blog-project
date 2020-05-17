import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

const app = express();

const PORT = 7070;

app.use(bodyParser.json());

// Fetch article Name End Point
app.get("/api/articles/:name", async (req, res) => {
  try {
    const articleName = req.params.name;

    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db("blog-project");

    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(articleInfo);

    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
});

// Upvoting End Points

app.post("/api/articles/:name/upvote", async (req, res) => {
  try {
    const articleName = req.params.name;

    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db("blog-project");

    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $set: {
          upvotes: articleInfo.upvotes + 1,
        },
      }
    );
    const updatedArticleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    res.status(200).json(updatedArticleInfo);

    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
});

// Comment End-Point

app.post("/api/articles/:name/add-comment", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  articlesInfo[articleName].comments.push({ username, text });

  res.status(200).send(articlesInfo[articleName]);
});

// app.get("/hello", (req, res) => res.send("Hello"));
// app.get("/hello/:name", (req, res) => res.send(`Hello, ${req.params.name}`));
// app.post("/hello", (req, res) => res.send(`Hello, ${req.body.name}`));

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
