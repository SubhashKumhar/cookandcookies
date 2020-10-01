const mongoose = require('mongoose');
const { number } = require('joi');

const OrderSchema = new mongoose.Schema({
    user_detail:{
        type:Object,
        required : true
    },
    products:{
        type:Array,
        required : true   
    },
    total_amount:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('Order',OrderSchema)  