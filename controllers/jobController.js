const Job = require("../models/Job")

const createJobs = async (req, res) => {
    try {
        const { title, description, requirement, location, salary, deadline, createdBy } = req.body;
        console.log(req.body);
        

        if (!title || !description || !createdBy) {
            return res.status(400).json({ success: false, message: "Title, description, and createdBy are required" });
        }

        const job = await Job.create({
            title,
            description,
            requirement,
            location,
            salary,
            deadline,
            createdBy
        });

        res.status(201).json({ success: true, data: job });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

const getAllJobs = async(req,res)=>{
    try{

        const allJobs = await Job.find().populate("createdBy","name email")

        res.status(200).json({success:true,data:allJobs})

    }catch(err){
        res.status(400).json({success:false,message:err.message})
    }
}

const getJobById = async(req,res)=>{
    try{

        const job = await Job.findById(req.params.id).populate("createdBy","name email")

        if(!job){
            return res.status(400).json({success:false,message:"job not found"})
        }

        res.status(200).json({success:true,data:job})

    }catch(err){
        res.status(400).json({success:false,message:err.message})
    }
}


module.exports={
    createJobs,
    getAllJobs,
    getJobById
}