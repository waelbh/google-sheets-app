import {
  getGoogleSheetsFromDrive,
  sheetsDeduplicationUpdater,
} from "../controllers/sheets";
import { authorization } from "../middlewares";
const express = require("express");
const router = express.Router();
router.get("/list", authorization, getGoogleSheetsFromDrive);
router.get("/deduplication_updater", authorization, sheetsDeduplicationUpdater);
export default router;
