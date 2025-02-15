const express = require("express");
const router = express.Router();
const UserRoute = require("../Routes/UserRoute");
const MobileProductsRoute = require("../Routes/mobileProductsRouter");

router.use("/api", UserRoute);
router.use("/api/products", MobileProductsRoute);

module.exports = router;