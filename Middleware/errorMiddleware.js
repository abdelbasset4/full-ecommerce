const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV ==='development') {
        // eslint-disable-next-line no-use-before-define
        developmentError(err,res)
    } else {
        // eslint-disable-next-line no-use-before-define
        productionError(err,res)
    }
}
const developmentError = (err,res) => res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack:err.stack
    })
const productionError = (err,res) => res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    })
    
module.exports = globalError