const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    resumeUrl: {
        type: String
    },
    status: {
        type: String,
        enum: ["Applied", "In Review", "Interview Scheduled", "Hired", "Rejected"],
        default: "Applied"
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Application", applicationSchema)