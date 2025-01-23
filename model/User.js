const { DataTypes } = require("sequelize");

const sequelize = require("../orm");
const bcrypt = require("bcrypt");

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING(255),
    validate: {
      isEmail: true,
    },
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    get() {
      return this.getDataValue("password");
    },
    set(value) {
      this.setDataValue("password", value);
    },
    allowNull: false,
  },
  display_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;
