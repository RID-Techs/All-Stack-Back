const passport = require("passport");
const UserModel = require("../Models/users");
const { HashPassword } = require("../Utils/PasswordEncryption");
const { validationResult, matchedData } = require("express-validator");

const UserSignUpFunc = async(req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        const errors = result.array();
        if(errors[0].path === "username" || errors[0].path === "password" || errors[0].path === "role") {
            console.log("errs :", errors[0].msg);
            return res.status(400).json({msg: errors[0].msg})
        }
    }
    const data = matchedData(req);
    data.password = await HashPassword(data.password);
    const User = new UserModel(data);
    await User.save();
    return res.status(201).json({UserCreatedMsg: 'User created successfully'});
}

const UserLoginFunc = (req, res) => {
    passport.authenticate("local", (err, user) => {
        if(err) {
            return res.status(400).json({ ErrMsg: err });
        }
        if (!user) {
            return res.status(401).json({ msg: "Invalid username or password" });
        }
        req.login(user, (err) => {
            if (err) {
                return res.status(400).json({ ErrMsg: err });
            }
            req.session.role = user.role;
            const safeUser = {
                id: user._id,
                username: user.username,
                role: user.role
            }
            return res.status(200).json(safeUser);
        })
    })(req, res);
}

module.exports = { UserSignUpFunc, UserLoginFunc };