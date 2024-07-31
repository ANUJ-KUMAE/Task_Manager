require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectionDB = require("./Connection/Config");
const errorMiddleware = require("./Middleware/Error-Middleware");
const AuthRouter = require("./Router/Auth-Router");
const WorkRouter = require("./Router/Work-Router");
const passport = require("passport");
const session = require("express-session");
require("./Passport/passport");

const app = express();

var corsOption = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth/User", AuthRouter);
app.use("/api/work", WorkRouter);

app.use(errorMiddleware);

const PORT = 5083;

ConnectionDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Database Connected Successfully ${PORT}`);
  });
});
