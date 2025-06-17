const { ModifiedPathsSnapshot } = require("mongoose");
const Listing=require("../models/listing.js");


module.exports.index=async (req,res)=>{
   const allListings = await Listing.find({});
   res.render("listings/index.ejs",{allListings});
}

module.exports.renderNewForm=(req,res)=>{
    //to make sure the user is logged in before creating the listing
    res.render("listings/new.ejs");
}


module.exports.showListing =async (req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id)
    .populate({path :"reviews", populate:{path: "author"}})
    .populate("owner");
    if(!listing)
    {
        req.flash("error","Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}


module.exports.createListing = async (req, res) => {
  const { path: url, filename } = req.file;

  const newListing = new Listing({
    ...req.body.listing,
    image: { url, filename },
    owner: req.user._id
  });

  await newListing.save();
  req.flash("success", "New listing created");
  res.redirect("/listings");
};



module.exports.renderEditForm=async (req,res)=>{
        let {id}=req.params;
        const listing= await Listing.findById(id);
        if(!listing)
          {
              req.flash("error","Listing does not exist!");
              return res.redirect("/listings");
          }

          let originalImageUrl=listing.image.url;
          originalImageUrl=originalImageUrl.replace("/upload","/upload/h_250,w_250")
          
        res.render("listings/edit.ejs",{listing,originalImageUrl});
    }


module.exports.updateListing=async(req,res)=>{
      let {id}=req.params;

      let listing =await Listing.findByIdAndUpdate(id,{...req.body.listing});

      if(typeof req.file!=="undefined")
      {
          const { path: url, filename } = req.file;
          listing.image={url,filename};

          await listing.save();
      }
      
      req.flash("success","Listing Updated!");
      res.redirect(`/listings/${id}`);
  }

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListing=  await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
     req.flash("success","listing deleted");
    res.redirect("/listings");

}