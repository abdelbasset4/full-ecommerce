const express = require('express')

const route = express.Router()
const { createProductValidator,deleteProductValidator,getProductValidator,updateProductValidator} = require('../utils/productValidator')
const { createProduct,deleteProduct,getProducts,getSpecificProduct,updateProduct } = require('../controllers/product.controller')

route.route('/').get(getProducts)
    .post(createProductValidator,createProduct)
route.route('/:id')
    .get(getProductValidator, getSpecificProduct)
    .put(updateProductValidator, updateProduct)
    .delete(deleteProductValidator,deleteProduct)
module.exports = route;