const asyncHandler = require('express-async-handler')
const apiError = require('../utils/apiError')
const ApiFeatures = require('../utils/apiFeatures')

exports.deleteOne = Model =>  asyncHandler(async (req, res,next) => {
    const {id} = req.params;
    const document = await Model.findByIdAndDelete(id )
    if (!document) {
        // eslint-disable-next-line new-cap
        return next(new apiError('there is not document found',404))
    }
    res.status(204).send();
})

exports.updateOne = Model =>  asyncHandler(async (req, res,next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!document) {
        // eslint-disable-next-line new-cap
        return next(new apiError('there is not document found',404))
    }
    res.status(200).json({data:document})
})

exports.createOne = Model => asyncHandler(async (req, res) => {
    const document = await Model.create(req.body)
    res.status(201).json({ data: document });
})

exports.getOne = Model =>asyncHandler(async (req, res,next) => {
    const {id} = req.params;
    const document = await Model.findById(id)
    if (!document) {
        // eslint-disable-next-line new-cap
        return next(new apiError('there is not document found',404))
    }
    res.status(200).json({data:document})
})

exports.getAll = (Model,modelName = '') => asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
        filter = req.filterObj
    }
    const documentCount = await Model.countDocuments();
    // Build query
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
        .pagination(documentCount)
        .filter()
        .search(modelName)
        .limitFields()
        .sort()
    
    const { mongooseQuery, paginationResults } = apiFeatures;
    const documents = await mongooseQuery;
    res.status(200).json({result:documents.length,paginationResults,data:documents})
})