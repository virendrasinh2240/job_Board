const express = require("express")
const router = express.Router()

const { applyForJob, getApplicationByJob } = require("../controllers/applicationController")
const { protect, authorize } = require("../middlewares/authMiddleware")


router.post("/applications", protect,authorize("applicant"),applyForJob)
router.get("/jobs/:jobId/applications",protect,authorize("employer"),getApplicationByJob)

module.exports = router