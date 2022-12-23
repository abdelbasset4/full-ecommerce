const Brand = require('../models/brand.model')
const factory = require('./handelersFactory');

module.exports.createBrand = factory.createOne(Brand)

module.exports.getBrands = factory.getAll(Brand)

module.exports.getSpecificBrand = factory.getOne(Brand)

module.exports.updateBrand = factory.updateOne(Brand)

module.exports.deleteBrand = factory.deleteOne(Brand)