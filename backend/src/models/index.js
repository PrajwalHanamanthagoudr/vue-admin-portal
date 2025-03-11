const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Define models
const Card = sequelize.define("Card", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  perChange: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
});

const Revenue = sequelize.define("Revenue", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  totalRevenue: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  totalTarget: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  totalRevenuePercentage: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  totalTargetPercentage: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  monthYear: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

// Define SessionCountry table
const SessionCountry = sequelize.define("SessionCountry", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flag: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  value: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  percentage: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
});

// Define SessionByRegion table
const SessionByRegion = sequelize.define("SessionByRegion", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define SalesByEcommercePlatform table
const SalesByEcommercePlatform = sequelize.define("SalesByEcommercePlatform", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

// Define RegisteredUsers table
const RegisteredUser = sequelize.define("RegisteredUser", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = {
  Card,
  Revenue,
  SessionCountry,
  SessionByRegion,
  RegisteredUser,
  SalesByEcommercePlatform,
};
