const mongoose=require("mongoose");
const Schema =mongoose.Schema;
const Review= require("./review.js");

const listingSchema=new Schema({
    title:{
        type: String,
        required: true,
    },
    description: String,
    image:{
      url:String,
      filename:String,
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
      {
        type:Schema.Types.ObjectId,
        ref:"Review",
      },
    ],
    owner:{
      type:Schema.Types.ObjectId,
      ref: "User"
    },
});


//to delet the corresponding review when the listing is deleted
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing)
  {
      await Review.deleteMany({_id : {$in: listing.reviews}});
  }
})


const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;




//alternate image format new one
// image: {
//   type: {
//     filename: String,
//     url: String,
//   },
//   default: {
//     filename: 'defaultimage',
//     url: 'https://unsplash.com/photos/aerial-view-of-waves-crashing-on-a-sandy-beach-zWFa7mlQAYk',
//   },
// }, 