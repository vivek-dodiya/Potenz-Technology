const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

router.post("/", async (req,res)=>{
        try{
            let { name, email , password , number } = req.body;
            let createdUser =await userModel.create({
                name: name,
                email: email,
                password: bcrypt.hashSync(password, 10),
                number: number
            })
            res.send(createdUser)
        }catch(err){
            console.error(err.message);
        }
})


module.exports = router