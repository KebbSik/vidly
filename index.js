const Joi = require("joi");
const express = require("express");
const e = require("express");
const app = express();

app.use(express.json());

// My genres arr
const genres = [
  { id: 1, name: "Comedy" },
  { id: 2, name: "Thriller" },
  { id: 3, name: "Drama" },
  { id: 4, name: "Sc-fi" },
  { id: 5, name: "Fantasy" },
  { id: 6, name: "Action" },
  { id: 7, name: "Romance" },
];

// GET requests
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(
        `The genre with the given ID (${req.params.id}) has not been found.`
      );
  res.send(genre);
});

// POST request
app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  const genre = { id: genres.length + 1, name: req.body.name };
  genres.push(genre);
  res.send(genre);
});

// PUT request
app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(
        `The genre with the given ID (${req.params.id}) has not been found.`
      );

  if (!req.body) return res.status(400).send("Missing data request. ");

  const { error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

// DELETE request
app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(
        `The genre with the given ID (${req.params.id}) has not been found.`
      );

  genres.splice(genres.indexOf(genre), 1);
  res.send(genre);
});

// Validator

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

// Example of setting deafult port for current cmd session => $env:PORT=5000
const port = process.env.PORT || 3000;

// Listeing on choosen port or 3000 if not set.
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
