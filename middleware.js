const Listing=require("./models/listing");
const Review=require("./models/review");

const ExpressError = require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");
const {reviewSchema}=require("./schema.js");

module.exports.isLoggedIn=(req,res,next)=>{
   
    if(!req.isAuthenticated())
    {
        //redirect url,jis path ko user ne access krne ki koshish ki thi without 
        //being logged in , user ko same pateh pe login krva k redirect krnge
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in to create listing");
        return res.redirect("/login");
    }

    next();

};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl)
    {
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    //first finding listing, then hecking of the person has the permission to edit
    let listing=await Listing.findById(id);
    if(!res.locals.currUser || !listing.owner._id.equals(res.locals.currUser._id))
    {
        req.flash("error","You don't have the permission to edit");
        return  res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error)
    {
        let errMsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg);
    }
    else
    {
        next();
    }
};


module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error)
    {
        let errMsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg);
    }
    else
    {
        next();
    }
};


module.exports.isReviewAuthor=async (req,res,next)=>{
    let {id,reviewId}=req.params;
    //first finding listing, then hecking of the person has the permission to edit
    let review=await Review.findById(reviewId);
    if(!res.locals.currUser || !review.author.equals(res.locals.currUser._id))
    {
        req.flash("error","You are not the author of the review");
        return  res.redirect(`/listings/${id}`);
    }
    next();
}