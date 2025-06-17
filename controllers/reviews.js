const Review=require("../models/review.js");
const Listing=require("../models/listing.js");



module.exports.createReview=async (req,res) => {
    // console.log(req.params.id);
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("new review saved");
    req.flash("success","Review posted!");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    id=id.trim();
    reviewId=reviewId.trim();

    await Listing.findByIdAndUpdate(id,{$pull:{review: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted!");
    res.redirect(`/listings/${id}`);

}
