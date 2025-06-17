const mongoose = require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
const { MongoClient, ServerApiVersion } = require('mongodb');  //added afterwards



// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"; prev (apna clg)
const MONGO_URL = "mongodb+srv://ankitagoyal460:LpDH8WJkwRC2l3iH@wanderlust.lgd87e0.mongodb.net/Wanderlust?retryWrites=true&w=majority&appName=wanderlust";


main()
    .then(()=>{
        console.log("connected to db");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner: "682e053f2f4ce2d3bfebed2e"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");

}

initDB();