const express = require("express");
const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../key");
// const cookieParser = require("cookie-parser");

const routes = express.Router();

routes.get("/",async(req,res)=>{
    try {
        const getUser = await userModel.find();
        res.send(getUser)
    } catch (error) {
        console.log(error);
    }
})

routes.post("/",async (req,res)=>{
    const user = req.body;
    let username = user.username;
    let mobile = user.mobile;
    let email = user.email;
    let password = user.password;
    saltRounds = 15;

    await bcrypt.hash(password,saltRounds).then(
        async (hash)=>{
            const newUser = new userModel({
                username,
                mobile,
                email,
                password:hash,
                repassword:hash
            });

        try {
            await newUser.save()
            .then(
                (resp)=>{
                    res.status(200).json(resp)
                }
            )
            .catch((error)=>{
                if(error.code === 11000){
                    res.json({Field:Object.getOwnPropertyNames(error.keyValue),errorName:"duplicate"});
                }
                else if(error.name === "ValidationError"){
                    res.json({Field:Object.getOwnPropertyNames(error.errors),errorName:"validate"});
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
)
    
});

routes.post("/login",async(req,res)=>{
    const body = req.body;
    // const Lid = body._id;
    const Luser = body.username;
    const Lpassword = body.password;

    try {
        const getLuser = await userModel.find({username:Luser});
        const Rpassword = getLuser[0].password;
        bcrypt.compare(Lpassword,Rpassword).then(
            (result)=>{
                if(result){
                    const tken = jwt.sign({username:Luser},JWT_SECRET,{algorithm:"HS256"});
                    res.json({token:tken,username:Luser})
                }
                else{
                    res.sendStatus(500);
                }
            }
         )
        }
          catch (error) {
        res.json(error)
    }
});

module.exports = routes;
// export default route;