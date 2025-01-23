const { DataTypes } = require("sequelize");

const sequelize = require("../orm");

const Tag = sequelize.define("Tag", {
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

module.exports = Tag;
