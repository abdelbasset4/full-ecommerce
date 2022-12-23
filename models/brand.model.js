const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Brand required'],
        minlength: [3, 'the brand name is too short'],
        maxlength: [32, 'the brand name is too long'],
        unique:[true,'the brand name must be unique']
    },
    slug: {
        type:String,
        lowercase: true,
    },
    image:String
}, { timestamps: true })

const Brand = mongoose.model('brand', brandSchema)
module.exports = Brand