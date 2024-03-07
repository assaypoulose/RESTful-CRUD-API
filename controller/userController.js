
import User from "../model/userModel.js";

// For posting data into the database
export const create = async (req, res) => {
    try {
        // Extract 'email' directly from 'req.body' to check if the user already exists
        const { email } = req.body;
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User already exist." });
        }

        // Create the user if not existing
        const userData = new User(req.body);
        const savedUser = await userData.save();
        res.status(200).json(savedUser);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// Basic setup for fetching data (demonstration purpose)
//export const fetch = async (req, res) => {
    //try {
       // res.json("Hello World! Using Express" )
    //} catch (error) {
        //res.status(500).json({ error: "Internal Server Error." })
    //}
//}



//for getting all users data from database

export const fetch = async (req, res) => {
    try{
        const users = await User.find();
        if(users.length===0){
            return res.status(404).json({message:"User not found."})
        }
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({ error: "Internal Server Error." })
    }
}


//For updating data
export const update = async(req,res)=>{
    try{
        const id = req.params.id;
        const userExist = await User.findOne({_id:id})
        if(!userExist){
            return res.status(404).json({message:"User not found."})
        }
        const updateUser = await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(201).json(updateUser);
    }catch(error){
        res.status(500).json({ error: "Internal Server Error." })
    }
}


//For deleting data from database

export const deleteUser = async(req, res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findOne({_id:id})
        if(!userExist){
            return res.status(404).json({message:"User not found."})
        }
        await User.findByIdAndDelete(id);
        res.status(201).json({message:"User deleted successfully."})
    }catch(error){
        res.status(500).json({ error: "Internal Server Error." })
    }
}


