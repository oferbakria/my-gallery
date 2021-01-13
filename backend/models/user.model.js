const mongoose=require('mongoose')
const Schema=mongoose.Schema

const UserSchema=new Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        trim:true,// no spaces after the username
        minlength:3
    },
    password:{
        type:String,
        require:true,
        trim:true,// no spaces after the username
        minlength:7
    },
    email:{
        type:String,
        require:true,
        trim:true,// no spaces after the email
        minlength:10
    },
    firstname:{
        type:String,
        require:true,
        trim:true,// no spaces after the firstname
        minlength:3
    },
    lastname:{
        type:String,
        require:true,
        trim:true,// no spaces after the lastname
        minlength:3
    }},
    {
        timestamps:true,
    });
const User=mongoose.model('Users',UserSchema);
module.exports=User;
