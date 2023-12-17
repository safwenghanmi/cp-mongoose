// personRoutes.js
const express = require('express');
const router = express.Router();
const Person = require('../Modules/person');

// Get all people
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new person
router.post('/create-person', async (req, res) => {
  const { name, age, favoriteFoods } = req.body;
  try {
    const newPerson = new Person({ name, age, favoriteFoods });
    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a person by ID
router.put('/update-person/:id', async (req, res) => {
  const { name, age, favoriteFoods } = req.body;
  try {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, { name, age, favoriteFoods }, { new: true });
    res.json(updatedPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a person by ID
router.delete('/delete-person/:id', async (req, res) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.json({ message: 'Person deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
