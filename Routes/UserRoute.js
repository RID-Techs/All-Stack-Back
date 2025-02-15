const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");
const Data_Validation_Obj = require("../Utils/DataValidator");
const { UserSignUpFunc, UserLoginFunc } = require("../Controllers/userController");

router.post("/signup", checkSchema(Data_Validation_Obj), UserSignUpFunc);
router.post("/login", checkSchema(Data_Validation_Obj), UserLoginFunc);

module.exports = router;