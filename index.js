const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const { title } = require("process");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

// Middleware to override HTTP methods (for PATCH and DELETE)
app.use(methodOverride("_method"));

// for ejs template engine
app.set("view engine", "ejs");
// Set the views directory
app.set("views", path.join(__dirname, "views"));
// set the public directory for static files
app.use(express.static(path.join(__dirname, "public")));
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Sample data for posts
let posts = [
  {
    id: uuidv4(), // to generate unique ids
    username: "john_doe",
    title: "science",
    content: "This is science post content",
  },
  {
    id: uuidv4(),
    username: "ramanujan",
    title: "maths",
    content: "This is maths post content",
  },
  {
    id: uuidv4(),
    username: "elon_musk",
    title: "space exploration",
    content: "This is space exploration post content",
  },
];

// routes
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// route to display the form for creating a new post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// route to handle form submission and create a new post
app.post("/posts", (req, res) => {
  const { username, title, content } = req.body;
  posts.push({ username, title, content });
  res.redirect("/posts");
});

// route to display a specific post based on its id
app.get("/posts/:id", (req, res) => {
  const postId = req.params.id;
  let post = posts.find((p) => p.id === postId);
  res.render("show.ejs", { post });
});

// route to update a specific post based on its id
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => p.id === id);
  post.content = newContent;
  res.redirect("/posts");
});

// route to update post content form
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("edit.ejs", { post });
});

// route to delete a specific post based on its id\
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/posts");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
