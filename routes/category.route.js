const express = require('express')

const route = express.Router()
const { getCategoryValidator,createCategoryValidator,updateCategoryValidator,deleteCategoryValidator} = require('../utils/categoryValidator')
const { createCategory, getCategories, getSpecificCategory, updateCategory, deleteCategory } = require('../controllers/category.controller')
const subCategoriesRoute = require('./subCategory.route')

route.use('/:categoryId/subcategories',subCategoriesRoute)
route.route('/').get(getCategories)
    .post(createCategoryValidator,createCategory)
route.route('/:id')
    .get(getCategoryValidator, getSpecificCategory)
    .put(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator,deleteCategory)
module.exports = route;