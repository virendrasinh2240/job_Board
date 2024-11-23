const express = require("express")
const router = express.Router()
const{createJobs,getAllJobs,getJobById} = require("../controllers/jobController")
const {protect,authorize} = require("../middlewares/authMiddleware")

router.post("/jobs",protect,authorize("employer"),createJobs)
router.get("/jobs",getAllJobs)
router.get("/jobs/:id",getJobById)

module.exports = router