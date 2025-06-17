const cloudinary=require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');


//these variables have to be named ads it is , one ones on LHS
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowedFormats: ["png","jpeg","jpg"]// supports promises as well
   
  },
});

module.exports={
    cloudinary,
    storage,
}