
const express = require("express");
const cors = require("cors");

const session = require("express-session");
const passport = require("passport");
require("./passport");
const googleRoutes = require("./routes/google");
const companyRoutes = require("./routes/companyRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/recruiter", require("./routes/recruiter"));
app.use("/api/companies", companyRoutes);
app.use("/api/auth", googleRoutes);
app.use("/api/saved-jobs", require("./routes/savedJobs"));
app.use("/api/users", require("./routes/users"));
app.use("/uploads", express.static("uploads"));
app.use(session({secret: "secret",resave: false,saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));


module.exports = app;





