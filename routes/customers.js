const express = require("express");
const router = express();
const { Customer, validate } = require("../models/customer");

// GET requests
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().sort("name");
    res.send(customers);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res
        .status(404)
        .send(
          `The customer with the given ID (${req.params.id}) was not found.`
        );
    }
    res.send(customer);
  } catch (err) {
    res.status(400).send(`Invalid ID format: ${req.params.id}`);
  }
});

// POST request
router.post("", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });

  try {
    await customer.save();
    res.send(customer);
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
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          isGold: req.body.isGold,
          name: req.body.name,
          phone: req.body.phone,
        },
      },
      { new: true }
    );
    if (!customer) {
      return res
        .status(404)
        .send(
          `The customer with the given ID (${req.params.id}) was not found.`
        );
    }
    res.send(customer);
  } catch (err) {
    res.status(400).send(`Invalid ID format: ${req.params.id}`);
  }
});

// DELETE request
router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res
        .status(404)
        .send(
          `The customer with the given ID (${req.params.id}) was not found.`
        );
    }

    res.send(customer);
  } catch (err) {
    res.status(400).send(`Invalid ID format: ${req.params.id}`);
  }
});

module.exports = router;
