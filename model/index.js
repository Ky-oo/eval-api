const sequelize = require("../orm");
const Order = require("./Order");
const ProductInCart = require("./ProductInCart");
const Tag = require("./Tag");
const Cart = require("./Cart");
const Product = require("./Product");
const User = require("./User");

User.hasMany(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: ProductInCart });
Product.belongsToMany(Cart, { through: ProductInCart });

Order.belongsTo(Cart);
Cart.hasMany(Order);

Product.belongsToMany(Tag, { through: "ProductTag" });
Tag.belongsToMany(Product, { through: "ProductTag" });

//sequelize.sync({ alter: true });

module.exports = {
  Order,
  ProductInCart,
  Tag,
  Cart,
  Product,
  User,
};
