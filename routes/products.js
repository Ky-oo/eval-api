var express = require("express");
var router = express.Router();

const { Product, Tag } = require("../model");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

// Route to get a list of products with optional pagination and filtering by tags
router.get("/", async function (req, res) {
  try {
    const nbDisplayed = req.query.pagination;
    const pages = parseInt(req.query.pages) - 1 || 0;
    const tags = req.query.tags;
    const where = {};

    where.stock = { [Op.gt]: 0 };

    if (nbDisplayed) {
      if (isNaN(nbDisplayed)) {
        return res.status(401).json({ error: "Pagination must be a number" });
      }

      if (parseInt(nbDisplayed) < 1) {
        return res.status(401).json({ error: "Pagination not valid" });
      }

      if (parseInt(pages) < 0) {
        return res.status(401).json({ error: "Pages not valid" });
      }

      const totalProducts = await Product.count();
      const totalPages = Math.ceil(totalProducts / parseInt(nbDisplayed));
      if (pages >= Math.round(totalPages)) {
        return res
          .status(401)
          .json({ error: "Page not found, max page is " + totalPages });
      }
    }

    const include = {
      model: Tag,
      as: "Tags",
      attributes: ["name"],
      through: { attributes: [] },
    };

    if (tags) {
      include.where = { id: { [Op.in]: tags.split(",") } };
    }

    const products = await Product.findAll({
      attributes: ["id", "name", "price", "popularity"],
      where: where,
      limit: nbDisplayed ? parseInt(nbDisplayed) : 10,
      offset: nbDisplayed ? pages * parseInt(nbDisplayed) : undefined,
      include: include,
      order: [["popularity", "DESC"]],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to get a single product by its ID
router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Tag,
          as: "Tags",
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update popularity
    product.popularity =
      product.popularity !== null ? product.popularity + 1 : 1;
    product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
