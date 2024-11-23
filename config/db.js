const mongoose = require("mongoose")

const connect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/job_board", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("connected to mongodb ")

    } catch (err) {
        console.log(err, "dont connect mongodb")
    }
}

module.exports = connect