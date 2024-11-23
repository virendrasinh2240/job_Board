const Application = require("../models/Application")
const sendEmail = require("../utils/sendEmail")
const Job = require("../models/Job")
require("dotenv").config()

const applyForJob = async (req, res) => {
    try {
        const { jobId, resumeUrl } = req.body

        const application = await Application.create({
            jobId,
            applicant: req.user.id,
            resumeUrl
        })
        console.log(application);

        const job = await Job.findById(jobId).populate("createdBy")
        const employerEmail = job.createdBy.email

        const email = await sendEmail({
            email: employerEmail,
            subject: "New Job Application",
            message: `A new application has been submitted for the job :${job.title}`
        })

        res.status(200).json({ success: true, data: application })
    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
}

const getApplicationByJob = async (req, res) => {
    try {

        const applications = await Application.findById({ job: req.params.jobId })
        res.status(200).json({ success: true, data: applications })

    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
}



module.exports = {
    applyForJob,
    getApplicationByJob
}