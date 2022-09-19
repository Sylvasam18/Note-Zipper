const express = require("express");

const dotenv = require("dotenv");
const MyNotes = require("./data");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

app.use(express.json({ urlEncoded: false }));

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("This is the homepage");
});

app.get("/api/notes", (req, res) => {
  res.json(MyNotes);
});

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("server running");
  mongoose
    .connect(
      "mongodb+srv://Sylvasam18:2daQFvYdCK239f0I@cluster0.kotie.mongodb.net/notes?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("DB Connected");
    });
});
