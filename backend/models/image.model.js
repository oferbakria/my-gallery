const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ImageSchema=new Schema({
    id:{
        type:String,
        require:true
    },
    imageUrl:{
        type:String,
        require:true
    }},
    {
        timestamps:true,
    });
const Image=mongoose.model('Images',ImageSchema);
module.exports=Image;
