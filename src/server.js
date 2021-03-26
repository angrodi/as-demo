// set up ======================================================================
// get all the tools we need
const express = require("express");
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const configDB = require("./config/database.js");

// configuration ===============================================================
mongoose.connect(configDB.url, { useNewUrlParser: true, useUnifiedTopology: true }); // connect to our database

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

require("./config/passport")(passport); // pass passport for configuration

// set up our express application
app.use(morgan("dev")); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.urlencoded({ extended: true })); // get information from html forms

app.set("view engine", "ejs"); // set up ejs for templating

// required for passport
app.use(
    session({
        secret: "demodemodemo",
        resave: false,
        saveUninitialized: true
    })
); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require("./routes/auth.routes")(app, passport); // load our routes and pass in our app and fully configured passport
require("./routes/pago.routes")(app);

// launch ======================================================================
app.listen(3000);
console.log("The magic happens on port " + 3000);
