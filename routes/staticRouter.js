import express from "express";
import { handleGetHomePageSSR } from "../controllers/url.js";

const router = express.Router();

router.get("/", (req, res) => {
  return res.render("home");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

export default router;
