const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')

dotenv.config({ path: "config.env" })
const apiError = require('./utils/apiError')
const globalError = require('./Middleware/errorMiddleware')
// Routes
const categoryRoute = require('./routes/category.route')
const productRoute = require('./routes/product.route')
const brandRoute = require('./routes/brand.route')
const subCategoryRoute = require('./routes/subCategory.route')
//connection db 
const dbConnection = require('./config/dbConnection')

dbConnection();

const app = express();

app.use(express.json());
if (process.env.NODE_ENV ==='development') {
    app.use(morgan('dev'))
}

// Middelware
app.use('/api/v1/categories',categoryRoute)
app.use('/api/v1/products',productRoute)
app.use('/api/v1/brands',brandRoute)
app.use('/api/v1/subcategories',subCategoryRoute)


app.all('*', (req, res, next) => {
    // eslint-disable-next-line new-cap
    next(new apiError(`Can't find this route ${req.originalUrl}`,400))
})
//Error handiling middelware
app.use(globalError)

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`server listen on port ${PORT}`)
})
process.on("unhandledRejection", (err) => {
    console.error(`unhandledRejection ${err.message} and ${err.name}`);
    server.close(() => {
        console.error(`shut down ......`);
        process.exit(1);
    })
})


