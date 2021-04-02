const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:[true,"This username is already taken"],
        required:[true,"Please enter username"]
    },
    mobile:{
        type:String,
        unique:[true,"This mobile numbeer is already taken"],
        required:[true,"Please enter mobile number"],
        validate(value){
            if(!validator.isLength(value,min = 10,max = 10)){
                throw new Error("mobile no. is not valid")
            }
        }
    },
    email:{
        type:String,
        unique:[true,"The email is already taken"],
        required:[true, "Please enter email"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email is not valid");
            }
        }
    },
    password:{
        type:String,
        required:[true,"Please enter the password"]
    },
    repassword:{
        type:String,
        required:[true,"Please enter the repeat password"]
    }
});

const userModel = mongoose.model("userModel",userSchema);

module.exports = userModel;