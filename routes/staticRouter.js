import express from "express";
import { handleGetHomePageSSR } from "../controllers/url.js";

const router = express.Router();

router.get("/", (req, res) => {
  return res.render("home");
});

export default router;
