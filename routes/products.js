var express = require("express");
var router = express.Router();

const { Product } = require("../model");

router.get("/", async function (req, res) {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/", async function (req, res) {
  try {
    const { name, price, description, stock } = req.body;
    if (!name || !price || !description || !stock) {
      return res
        .status(400)
        .json({ message: "Name, price, description and stock are required" });
    }
    const product = await Product.create({ name, price, description, stock });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const { name, price, description, stock } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.name = name;
    product.price = price;
    product.description = description;
    product.stock = stock;
    product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.destroy();
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/:id/tags", async function (req, res) {
  try {
    const { id } = req.params;
    const { tagId } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.addTag(tagId);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/:id/tags/:tagId", async function (req, res) {
  try {
    const { id, tagId } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.removeTag(tagId);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
