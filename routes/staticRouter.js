import express from "express";
import { handleGetHomePageSSR } from "../controllers/url.js";

const router = express.Router();

router.get("/", handleGetHomePageSSR);

export default router;
