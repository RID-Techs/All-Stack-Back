const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("./Strategies/PassLocalStrategy");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const ConnectDB = require("./Config/DB_Connect");
const path = require("path");
const All_Routes = require("./Routes/index");
const PORT = process.env.PORT || 7002;
const FrontURL = process.env.NODE_ENV === "production" ? process.env.PROD_Front_URL : process.env.LOCAL_Front_URL;

ConnectDB();
app.use(cors({
    origin: FrontURL,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.set("trust proxy", 1);
app.use(session({
    secret: process.env.Session_Secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient()
    })
}))

app.use(passport.initialize());
app.use(passport.session());
app.use("/Images", express.static(path.join(__dirname, "Images")));
app.use(All_Routes);
app.get("/", (req, res) => {
    res.send("Hello here !");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
