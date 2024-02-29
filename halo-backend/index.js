import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import connectDB from "./src/configs/connectDB";
import initAppRoutes from "./routes/api";
import cookieParser from "cookie-parser";
import configCors from "./src/configs/corsConfig";
const LocalStrategy = require("passport-local").Strategy;
const app = express();
const PORT = process.env.PORT || 8081;
// configCors(app);
app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "http://localhost:19006",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.listen(PORT, () => {
  console.log(">>>>Server running on port: " + PORT);
});
connectDB();
initAppRoutes(app);
