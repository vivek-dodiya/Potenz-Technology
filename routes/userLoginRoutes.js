const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async (req,res)=>{
        try{
            const {email, password} = req.body;
            const user = await userModel.findOne({email});
            if(!user){
                return res.status(400).json({ message: "Invalid email or password" });
            }
            bcrypt.compare( password, user.password, function(err, result) {
                if(result == true){
                    let token =jwt.sign({ email ,password }, process.env.JWT_SECRET ,{ expiresIn: '1h' });
                    console.log(user);
                    res.json({ token });
                }else{
                    res.status(400).send({message: "Invalid email or password"})
                }
            });
        }catch(err){
            console.error(err.message);
            res.send(err.message)
        }
})


module.exports = router