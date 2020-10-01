const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    product_name:{
        type:String,
        required : true
    },
    product_cat:{
        type:String,
        required : true   
    },
    category_name:{
        type:String,
    },
    image:{
        type:String,
        required : true   
    },
    customize:{
        type:Boolean,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
})

module.exports = mongoose.model('Product',ProductSchema)