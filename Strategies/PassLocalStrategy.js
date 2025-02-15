const passport = require("passport");
const { Strategy } = require("passport-local");
const mongoose = require("mongoose");
const UserModel = require("../Models/users");
const { VerifyPassword } = require("../Utils/PasswordEncryption");

passport.serializeUser(async (user, done) => {
    console.log("Inside Serialized User");
    console.log(user);
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    console.log("Inside deserialization");
    console.log(id);
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error('Invalid id');
        }
        const findUser = await UserModel.findById(id);
        if(!findUser) throw new Error('User not found!');
        done(null, findUser);
    } catch (error) {
        done(error, null);
    }
})

passport.use(
    new Strategy(
        {usernameField: 'username', passwordField: 'password', passReqToCallback: true}, async(req, username, password, done) => {
        try {
            const { body: {role}} = req;
            const findUser = await UserModel.findOne({username});
            if(!findUser) return done(`User ${username} not found !`, null);
            const isPassValid = await VerifyPassword(findUser.password, password);
            if(!isPassValid) return done("Password is not correct", null);
            if(findUser.role !== role) {
                return done("Select your status accordingly please", null);
            }
            done(null, findUser);
        } catch (error) {
            return done("Server error occurred", null);
        }
    })
)

module.exports = passport;