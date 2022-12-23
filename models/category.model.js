const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category required'],
        minlength: [3, 'the name is too short'],
        maxlength: [32, 'the name is too long'],
        unique:[true,'the name must be unique']
    },
    slug: {
        type:String,
        lowercase: true,
    },
    image:String
}, { timestamps: true })
categorySchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' ,message:'Category must be uniaue'});

const Category = mongoose.model('category', categorySchema)
module.exports = Category