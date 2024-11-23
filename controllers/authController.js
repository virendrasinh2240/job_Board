const Users = require("../models/user")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail")
require("dotenv").config()

const register = async (req, res) => {
    try {
        console.log(req.body);
        
        const { name, email, password, role } = req.body

        const user = await Users.create({
            name,
            email,
            password,
            role
        })
        
        res.status(201).json({ success: true, data: user })

    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await Users.findOne({ email })

        if (!user || !(await user.matchPassword(password))) {
            res.status(401).json({ success: false, message: "Invalid credintials" })
        }

        const secretKey = process.env.SECRET_KEY
        const token = jwt.sign({ id: user._id },secretKey, { expiresIn: "7d" })

        res.status(200).json({ success: true, token })

    } catch (err) {
        console.log(err);
        
        res.status(400).json({ success: false, message: err.message })
    }
}

const getProfile = async(req,res)=>{
    try{
        const profile = await Users.findById(req.user.id)

        res.status(200).json({success:true,data:profile})

    }catch(err){
        res.status(400).json({success:false,message:err.message})
    }
}

module.exports = {
    register,
    login,
    getProfile
}