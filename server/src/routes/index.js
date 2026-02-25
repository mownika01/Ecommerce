const authRouter = require('./auth')
const productRouter = require('./products')
const categoryRouter = require('./category')
const cartRouter = require('./cart')


const prefix = '/api'
module.exports = (app) => {
app.use(prefix + '/auth' , authRouter);
app.use(prefix + '/product', productRouter);
app.use(prefix + '/category', categoryRouter);
app.use(prefix + '/cart', cartRouter)
}