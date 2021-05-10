import { getAuthUrl, getUserToken } from "../controllers/auth";
const express = require("express");
const router = express.Router();
router.get("/google/url", getAuthUrl);
router.get("/google", getUserToken);
export default router;
