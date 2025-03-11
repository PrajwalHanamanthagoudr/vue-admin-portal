const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cardRoutes = require("./routes/CardRoutes.js");
const revenueRoutes = require("./routes/RevenueRoutes.js");
const sessionCountry = require("./routes/SessionCountryRoutes.js");
const sessionByRegion = require("./routes/SessionByRegionRoutes.js");
const salesByEcommercePlatform = require("./routes/SalesByEcommercePlatformRoutes.js");
const registeredUser = require("./routes/RegisteredUserRoutes.js");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/cards", cardRoutes);
app.use("/api/revenue", revenueRoutes);
app.use("/api/sessionCountry", sessionCountry);
app.use("/api/sessionByRegion", sessionByRegion);
app.use("/api/salesByEcommercePlatform", salesByEcommercePlatform);
app.use("/api/registeredUser", registeredUser);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
