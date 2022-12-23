const express = require('express')

const route = express.Router({mergeParams: true})
const {createSubCategoryValidator,getSubCategoryValidator,updateSubCategoryValidator,deleteSubCategoryValidator} = require('../utils/subCategoryValidator')
const { createSubCategory, getSubCategories, getSpecificSubCategory, updateSubCategory, deleteSubCategory, setCategoryToBody, createFilterObj } = require('../controllers/subCategory.controller')

route.route('/')
    .post(setCategoryToBody,createSubCategoryValidator, createSubCategory)
    .get(createFilterObj,getSubCategories)
route.route("/:id")
    .get(getSubCategoryValidator, getSpecificSubCategory)    
    .put(updateSubCategoryValidator, updateSubCategory)
    .delete(deleteSubCategoryValidator, deleteSubCategory)
module.exports = route