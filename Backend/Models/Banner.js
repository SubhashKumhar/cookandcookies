const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    banner_content:{
        type:String,
        required : true
    },
    
    image:{
        type:String,
        required : true   
    },
})

module.exports = mongoose.model('Banner',BannerSchema)