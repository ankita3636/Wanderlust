const mongoose=require("mongoose");
const Schema =mongoose.Schema;
const passportLocalMongoose= require("passport-local-mongoose");


const userSchema= new Schema({
    
    email:{
        type:String,
        required: true,
    }
})


// only defining email as passprt-local-mongoose defines a username,hash,salt ,password automatically
//when plugged in like this
userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);