var express = require("express");
var router = express.Router();

const { Product, Order, Tag } = require("../model");

// Create a new product
router.post("/products/", async function (req, res) {
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

// Update an existing product by ID
router.put("/products/:id", async function (req, res) {
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

// Delete a product by ID
router.delete("/products/:id", async function (req, res) {
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

// Add a tag to a product by product ID
router.post("/products/:id/tags", async function (req, res) {
  try {
    const { id } = req.params;
    const { tagId } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (!tagId) {
      return res.status(400).json({ message: "Tag id is required" });
    }

    await product.addTag(tagId);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Remove a tag from a product by product ID and tag ID
router.delete("products/:id/tags/:tagId", async function (req, res) {
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

// Create a new user
router.post("/users/", async function (req, res) {
  try {
    const { email, password, display_name, name, is_admin } = req.body;
    if (!email || !password || !display_name || !name) {
      return res.status(400).json({
        message: "Email, name, display name and password are required",
      });
    }
    const user = await User.create({
      email,
      password,
      display_name,
      name,
      is_admin: is_admin || false,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Create a new tag
router.post("/tags/", async function (req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Name is required" });
    }

    const tag = await Tag.create({ name });

    if (!tag) {
      return res.status(500).json({ message: "Server error", error });
    }

    return res.status(201).json(tag);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
});

// Delete a tag by ID
router.delete("/tags/:id", async function (req, res) {
  const id = req.params.id;

  const tag = await Tag.findByPk(id);

  if (!tag) {
    return res.status(404).json({ message: "Tag not found", error });
  }
  await tag.destroy();
  return res.status(201).json();
});

// Get all orders
router.get("/orders/", async function (req, res) {
  const orders = Order.findAll();
  return res.status(200).json(orders);
});

module.exports = router;
