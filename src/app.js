const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const errorHandler = require('./utils/errorHandler');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/api', routes);
// ✅ Error Handling Middleware (ALWAYS at the END)
app.use(errorHandler);
module.exports = app;
