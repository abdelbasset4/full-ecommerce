const Product = require('../models/product.model')
const factory = require('./handelersFactory');

module.exports.createProduct = factory.createOne(Product)

module.exports.getProducts = factory.getAll(Product,'Products')

module.exports.getSpecificProduct = factory.getOne(Product)

module.exports.updateProduct = factory.updateOne(Product)

module.exports.deleteProduct = factory.deleteOne(Product)