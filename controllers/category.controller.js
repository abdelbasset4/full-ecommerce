const Category = require('../models/category.model')
const factory = require('./handelersFactory');

module.exports.createCategory = factory.createOne(Category)

module.exports.getCategories = factory.getAll(Category)

module.exports.getSpecificCategory = factory.getOne(Category)

module.exports.updateCategory = factory.updateOne(Category)

module.exports.deleteCategory = factory.deleteOne(Category)