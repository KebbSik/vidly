const mongoose = require("mongoose");
const express = require("express");
const app = express();
const genres = require("./routes/genres");
const customers = require("./routes/customers");

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => console.log("Could not connect to MongoDB.", err));

app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/customers", customers);

// Example of setting deafult port for current cmd session => $env:PORT=5000
const port = process.env.PORT || 3000;

// Listeing on choosen port or 3000 if not set.
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
