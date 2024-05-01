import express from "express";
import {
  handleGenerateNewShortURL,
  handleGetHomePageSSR,
  handleGetShortURL,
} from "../controllers/url.js";

const router = express.Router();

router.route("/").post(handleGenerateNewShortURL);
router.route("/:shortId").get(handleGetShortURL);

export default router;
