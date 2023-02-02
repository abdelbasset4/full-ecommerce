const path = require('path');
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express');

dotenv.config({ path: "config.env" })
const apiError = require('./utils/apiError')
const globalError = require('./Middleware/errorMiddleware')

const swaggerDocument = require('./swagger.json');
// Routes
const mountRoutes = require('./routes')
const {webhookCheckout} = require('./controllers/order.controller')
//connection db 
const dbConnection = require('./config/dbConnection')

dbConnection();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,'uploads')))
// allowed other domain acces api
app.use(cors())
app.options('*', cors())
// compress response
app.options(compression())



if (process.env.NODE_ENV ==='development') {
    app.use(morgan('dev'))
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Middleware
mountRoutes(app)

app.all('*', (req, res, next) => {
    // eslint-disable-next-line new-cap
    next(new apiError(`Can't find this route ${req.originalUrl}`,400))
})
//Error handiling middelware
app.use(globalError)

app.get("/", (req, res) => {
    res.send("full ecommerce on Vercel");
});

  
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
// Checkout webhook
app.post(
    '/webhook-checkout',
    express.raw({type: 'application/json'}),
    webhookCheckout
);

module.exports = server