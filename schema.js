// //to validate server side schema
// //using a package named joi , its a npm package for schema validation on server sude
// const Joi = require('joi');

// module.exports.listingSchema = Joi.object({
//     listing: Joi.object({

//         title: Joi.string().required(),
//         description: Joi.string().required(),
//         location: Joi.string().required(),
//         country: Joi.string().required(),
//         price: Joi.number().min(0).required(),
//         image: Joi.object({
//             url: Joi.string().uri().required()
//         }).required()
//     }).required()
// });
 

//new as was getting error in update
const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().min(0).required(),
        // image: Joi.object({
        //     url: Joi.string().uri().required(),
        //     filename: Joi.string().required() 
        // }).required()
    }).required()
});


module.exports.reviewSchema=Joi.object({
    review: Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
})


