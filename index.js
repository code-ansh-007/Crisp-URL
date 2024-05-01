import express from "express";
import connectMongoDB from "./mongodb-connection.js";
import urlRouter from "./routes/url.js";
import staticRouter from "./routes/staticRouter.js";

import path from "path";

// ? Server setup and initialization
const app = express();
const PORT = 3000;

// ? middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // ! this middleware helps to parse form data in the express server as the body content in the post request

// * EJS setup
app.set("view engine", "ejs"); // ? telling express that we are using EJS as the templating engine
app.set("views", path.resolve("./views")); // ? configuring the path where all of our EJS files or views are stored in the MVC software architecture model

// ? setting up routes
app.use("/url", urlRouter); // ! the route in this router routes middleware is the base URL this means if i set the base URL to "/url" then the route that the home page would land in would look something like this "localhost:3000/url"
app.use("/", staticRouter); // ! this route will handle all the static page routing

// ? MongoDB connection
connectMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.log("error while connecting to mongo", err));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
