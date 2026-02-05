const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const { title } = require("process");

// for ejs template engine
app.set("view engine", "ejs");
// Set the views directory
app.set("views", path.join(__dirname, "views"));
// set the public directory for static files
app.use(express.static(path.join(__dirname, "public")));
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

let posts = [
  {
    username: "john_doe",
    title: "science",
    content: "This is science post content",
  },
  {
    username: "ramanujan",
    title: "maths",
    content: "This is maths post content",
  },
  {
    username: "elon_musk",
    title: "space exploration",
    content: "This is space exploration post content",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  const { username, title, content } = req.body;
  posts.push({ username, title, content });
  res.redirect("/posts");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
