const nodemailer = require("nodemailer")
require("dotenv").config()

const sendMail = async(options)=>{
        const transporter = nodemailer.createTransport({
            service:"Gmail",
            auth:{
                user:process.env.EMAIL_USERNAME,
                pass:process.env.EMAIL_PASSWORD
            }
        })

        const mailOption = {
            from:process.env.EMAIL_USERNAME,
            to:"vazasmit1@gmail.com",
            subject:options.subject,
            text:options.message
        }

        await transporter.sendMail(mailOption)
}

module.exports = sendMail