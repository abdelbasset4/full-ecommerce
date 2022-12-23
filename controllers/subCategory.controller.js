const subCategory = require('../models/subCategoryModel')
const factory = require('./handelersFactory');

exports.setCategoryToBody = (req, res, next) => {
    if (!req.body.category) {
        req.body.category = req.params.categoryId
    }
    next()
}
exports.createFilterObj = (req, res, next) => {
    let filterObj = {}
    if (req.params.categoryId) {
        filterObj = {category:req.params.categoryId}
    }
    req.filterObj = filterObj
    next()
}

module.exports.createSubCategory = factory.createOne(subCategory)

module.exports.getSubCategories = factory.getAll(subCategory)

module.exports.getSpecificSubCategory = factory.getOne(subCategory)

module.exports.updateSubCategory = factory.updateOne(subCategory)

module.exports.deleteSubCategory = factory.deleteOne(subCategory)