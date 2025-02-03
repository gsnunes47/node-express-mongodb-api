// init

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(express.json());
const port = 3000;
mongoose.connect(process.env.DB_URI);

// models

const Film = mongoose.model("Film", {
  title: String,
  description: String,
  image_url: String,
  trailer_url: String,
});

// routes

//create
app.post("/", async (req, res) => {
  const film = new Film({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url,
  });

  await film.save();
  return res.send(film); //
});

//read
app.get("/", async (req, res) => {
  const films = await Film.find();
  return res.send(films);
});

//update
app.put("/:id", async (req, res) => {
  const film = await Film.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      trailer_url: req.body.trailer_url,
    },
    {
      new: true,
    }
  );

  //   const updateFilm = await Film.findById((id = req.params.id));

  return res.send(updateFilm);
});

//delete
app.delete("/:id", async (req, res) => {
  const film = await Film.findByIdAndDelete(req.params.id);
  return res.send(film);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
