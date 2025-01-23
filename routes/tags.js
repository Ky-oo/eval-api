var express = require("express");
var router = express.Router();

const { Tag } = require("../model");

// Route to get a list of all tags
router.get("/", async function (req, res) {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to get a single tag by its ID
router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.status(200).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
