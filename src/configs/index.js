import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import jwt from "jsonwebtoken";
import connectDB from "./connectDB";
const LocalStrategy = require("passport-local").Strategy;

const app = express();
const PORT = process.env.PORT || 8081;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.listen(PORT, () => {
  console.log(">>>>Server running on port: " + PORT);
});
connectDB();
