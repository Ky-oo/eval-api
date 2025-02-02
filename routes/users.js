var express = require("express");
var router = express.Router();

const { User } = require("../model");

router.get("/", async function (req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const { email, password, display_name, name, is_admin } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.email = email;
    user.password = password;
    user.display_name = display_name;
    user.name = name;
    user.is_admin = is_admin || false;
    user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.destroy();
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
