var express = require("express");
var router = express.Router();

const { Order, Cart, User } = require("../model");

router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
});

router.post("/", async function (req, res) {
  try {
    const { deliveryAddress, cartId, userId } = req.body;

    if (!deliveryAddress || !cartId || !userId) {
      return res
        .status(400)
        .json({ message: "DeliveryAddress, cartId and userId is required" });
    }

    const cart = await Cart.findByPk(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (cart.UserId !== user.id) {
      return res.status(400).json({ message: "This is not your cart" });
    }

    const products = await cart.getProducts({
      joinTableAttributes: ["quantity"],
    });
    if (!products) {
      return res
        .status(400)
        .json({ message: "Cannot order an empty Cart (u r retarded)" });
    }

    var totalCost = 0;

    for (const product of products) {
      const cartProduct = product.ProductInCart;

      if (!cartProduct || !cartProduct.quantity) {
        return res
          .status(400)
          .json({ message: `Missing quantity for product ${product.name}` });
      }

      const newQuantity = product.stock - parseInt(cartProduct.quantity, 10);

      if (newQuantity < 0) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${product.name}` });
      }

      await product.update({ stock: newQuantity });

      totalCost += product.price * cartProduct.quantity;
    }

    const order = await Order.create({
      deliveryAddress: deliveryAddress,
      date: new Date(),
      CartId: cart.id,
      UserId: user.id,
      cost: totalCost,
    });

    if (!order) {
      return res.status(500).json({ message: "Server error", error });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
});

router.get("/user/:id", async function (req, res) {
  try {
    const { id } = req.params;
    console.log(req.headers["userId"]);
    if (id !== req.headers["userId"]) {
      res.status(400).json({ message: "This is not your order" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;