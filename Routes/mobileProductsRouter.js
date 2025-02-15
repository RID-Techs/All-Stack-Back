const express = require("express");
const router = express.Router();
const multerMiddleware = require("../Middlewares/multerMdw");
const multerMiddleware_2 = require("../Middlewares/multer_2");
const { addProduct, getAllPhones, getPhoneItemsByQuery, getPhoneById, updatePhoneById, DeleteById } = require("../Controllers/ProductsController");
const ProtectedRoute = require("../Middlewares/auth");
const { addComputerFunc, getAllComputerItems, getComputerItemsByQuery, getComputerById, updateComputerById, DeleteCompById } = require("../Controllers/computerController");

router.post("/additem", ProtectedRoute, multerMiddleware, addProduct);
router.get("/getphones", getAllPhones);
router.get("/getqueriedphones", getPhoneItemsByQuery);
router.get("/getphonebyid/:id", getPhoneById);
router.put("/updatephonebyid/:id", ProtectedRoute, multerMiddleware, updatePhoneById);
router.delete("/deletephonebyid/:id", ProtectedRoute, multerMiddleware, DeleteById);

router.post("/additem/computer", ProtectedRoute, multerMiddleware_2, addComputerFunc);
router.get("/getcomputer", getAllComputerItems);
router.get("/getqueriedcomputer", getComputerItemsByQuery);
router.get("/getcomputerbyid/:id", getComputerById);
router.put("/updatecomputerbyid/:id", ProtectedRoute, multerMiddleware_2, updateComputerById);
router.delete("/deletecomputerbyid/:id", ProtectedRoute, multerMiddleware_2, DeleteCompById);

module.exports = router;