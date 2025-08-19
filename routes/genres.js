const express = require("express");
const router = express();
const { Genre, validate } = require("../models/genre");

// GET requests
router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find().sort("name");
    res.send(genres);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
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
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name,
  });

  try {
    await genre.save();
    res.send(genre);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(field.toUpperCase() + ":", ex.errors[field].message);
    }
  }
});

// PUT request
router.put("/:id", async (req, res) => {
  if (!req.body) return res.status(400).send("Missing data request. ");

  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

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

module.exports = router;
