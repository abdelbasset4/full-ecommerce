const express = require('express')

const route = express.Router()
const { getBrandValidator,createBrandValidator,updateBrandValidator,deleteBrandValidator} = require('../utils/brandValidator')
const { createBrand, getBrands, getSpecificBrand, updateBrand, deleteBrand } = require('../controllers/brand.controller')
// const subCategoriesRoute = require('./subCategory.route')

// route.use('/:categoryId/subcategories',subCategoriesRoute)
route.route('/').get(getBrands)
    .post(createBrandValidator,createBrand)
route.route('/:id')
    .get(getBrandValidator, getSpecificBrand)
    .put(updateBrandValidator, updateBrand)
    .delete(deleteBrandValidator,deleteBrand)
module.exports = route;