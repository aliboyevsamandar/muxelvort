const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Pruduct = require("../model/products");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { image, name, category, price } = req.body;
    if (!image || !name || !category || !price) {
      return res.status(400).json({ error: "Barcha maydonlar to'ldirilishi shart!" });
    }

    const newPruduct = new Pruduct({ image, name, category, price });
    await newPruduct.save();
    res.status(201).json(newPruduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ (GET ALL) - Public
router.get("/", async (req, res) => {
  try {
    const products = await Pruduct.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto‘g‘ri ID!" });
    }

    const procust = await Pruduct.findByIdAndUpdate(id, req.body, { new: true });
    if (!procust) return res.status(404).json({ message: "Pruduct topilmadi" });

    res.json(procust);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto‘g‘ri ID!" });
    }

    const product = await Pruduct.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product topilmadi" });

    res.json({ message: "Product o'chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
