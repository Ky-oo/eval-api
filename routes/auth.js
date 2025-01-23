const express = require("express");
const router = express.Router();
const { User } = require("../model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Function to handle user signup
router.post("/signup", async (req, res) => {
  const { email, password, display_name, name, is_admin } = req.body;
  if (!email || !password || !display_name || !name) {
    res.status(400);
    res.json({
      message: "Email, name, display name and password are required",
    });
    return;
  }

  // Create the user
  const user = await User.build({
    email: email,
    password: password,
    display_name: display_name,
    name: name,
    is_admin: is_admin || false,
  });

  // validate email field
  try {
    await user.validate({ fields: ["email"] });
  } catch (error) {
    res.status(500);
    res.json({ message: error });
    return;
  }

  // save the user
  try {
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "unexpected error" });
    return;
  }
});

// Function to handle user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    res.json({ message: "Email and password are required" });
    return;
  }

  // Find user
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    res.status(404);
    res.json({ message: "Email or password incorrect" });
    return;
  }

  // Check password
  const passwordOk = await bcrypt.compare(password, user.password);

  try {
    if (!passwordOk) {
      res.status(404).json({ message: "Email or password incorrect" });
      return;
    }

    // Check if the user is using the local terminal to determine the token duration
    const tokenDuration =
      req.headers["user-agent"] === "LocalTerminal" ? "1h" : "30d";

    // Create token
    try {
      const token = jwt.sign(
        { id: user.id, is_admin: user.is_admin },
        process.env.JWT_PRIVATE_KEY,
        {
          expiresIn: tokenDuration,
        }
      );

      res.json({ token, is_admin: user.is_admin });
    } catch (error) {
      console.error("JWT Error:", error);
      res.status(500).json({ message: "Error generating token" });
    }
  } catch (error) {
    console.error("Error comparing passwords:", error);
    res.status(500).json({ message: "Error comparing passwords" });
  }

  if (!passwordOk) {
    res.status(404);
    res.json({ message: "Email or password incorrect" });
    return;
  }
});

module.exports = router;
