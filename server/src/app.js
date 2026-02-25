const express = require('express');
const cors = require('cors');
const routeConfig = require('./routes/index');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json())
routeConfig(app)
app.use(errorHandler)

module.exports = app;