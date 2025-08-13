const mongoose = require("mongoose");
const express = require("express");
const router = express();
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
});

const Genre = mongoose.model("genres", genreSchema);

// GET requests
router.get("", async (req, res) => {
  try {
    const genres = await Genre.find();
    res.send(genres);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    // const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      return res
        .status(404)
        .send(`The genre with the given ID (${req.params.id}) was not found.`);
    }

    res.send(genre);
  } catch (err) {
    res.status(400).send(`Invalid ID format: ${req.params.id}`);
  }
});

// POST request
router.post("", async (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name,
  });

  try {
    // const result = await genre.save();
    await genre.save();
    res.send(genre);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(filed.toUpperCase() + ":", ex.errors[filed].message);
    }
  }
  // const genre = { id: genres.length + 1, name: req.body.name };
  // genres.push(genre);
});

// PUT request
router.put("/:id", async (req, res) => {
  if (!req.body) return res.status(400).send("Missing data request. ");

  const { error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // genre.name = req.body.name;

  try {
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      {
        $set: { name: req.body.name },
      },
      { new: true }
    );
    if (!genre) {
      return res
        .status(404)
        .send(`The genre with the given ID (${req.params.id}) was not found.`);
    }
    res.send(genre);
  } catch (err) {
    res.status(400).send(`Invalid ID format: ${req.params.id}`);
  }
});

// DELETE request
router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if (!genre) {
      return res
        .status(404)
        .send(`The genre with the given ID (${req.params.id}) was not found.`);
    }

    res.send(genre);
  } catch (err) {
    res.status(400).send(`Invalid ID format: ${req.params.id}`);
  }
});

// Validator

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}
module.exports = router;
