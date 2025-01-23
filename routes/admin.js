var express = require("express");
var router = express.Router();

const { Tag } = require("../model");

router.post("/product/", async function (req, res) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const tag = await Tag.create({ name });
    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/product/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    tag.name = name;
    tag.save();
    res.status(200).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/product/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    tag.destroy();
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/admin/", async function (req, res) {
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

module.exports = router;
