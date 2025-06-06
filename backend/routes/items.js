const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// CREATE
router.post('/', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: "Item creation failed!" });
  }
});

// READ (All Items)
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items!" });
  }
});

// Update Item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: "Update failed!" });
  }
});

// Delete Item
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted!" });
  } catch (err) {
    res.status(500).json({ error: "Deletion failed!" });
  }
});


module.exports = router;