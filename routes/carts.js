var express = require("express");
var router = express.Router();

const { Product, ProductInCart, Cart, User } = require("../model");

router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = await Cart.findOne({
      where: { userId: id },
      include: Product,
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/add-product", async function (req, res) {
  try {
    const { userId, productId } = req.body;
    var quantity = req.body.quantity;

    if (!userId || !productId || !quantity) {
      return res
        .status(400)
        .json({ message: "userId, productId and quantity are required" });
    }

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({
      where: { UserId: userId },
      include: Product,
    });

    if (!cart) {
      cart = await Cart.create({ UserId: userId });
    }

    if (cart.UserId !== userId) {
      return res.status(403).json({ message: "This is not your cart" });
    }

    let productInCart = null;
    if (cart.Products.length > 0) {
      productInCart = await ProductInCart.findOne({
        where: { CartId: cart.id, ProductId: productId },
      });
    }

    quantity = productInCart
      ? parseInt(productInCart.quantity) + quantity
      : quantity;

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    if (productInCart) {
      await productInCart.update({
        quantity: quantity,
      });
      return res.status(201).json(cart);
    }

    await cart.addProduct(product, { through: { quantity: quantity } });

    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/:id/product/:productId", async function (req, res) {
  try {
    const { id, productId } = req.params;
    const userId = req.body.userId;
    var quantity = req.body.quantity || null;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const cart = await Cart.findByPk(id);
    const product = await Product.findByPk(productId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (quantity) {
      productInCart = await ProductInCart.findOne({
        where: { CartId: cart.id, ProductId: productId },
      });

      quantity = parseInt(productInCart.quantity) - quantity;

      await productInCart.update({
        quantity: quantity,
      });

      return res.status(204).json();
    }

    await cart.removeProduct(product);
    return res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
