'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const routes = require('./routes/routes');
const cp = require('cookie-parser');
const fileupload = require('express-fileupload')
const OpenApiValidator = require('express-openapi-validator');
const app = express();

app.use(fileupload())

app.use(
  cors({
    origin: 'http://localhost:4200', // localhost replace with ip
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(cp());
app.use(express.json());

app.use('/dbtest', routes);
app.use('/uploads', express.static('uploads'));
app.use(
  OpenApiValidator.middleware({
    apiSpec: './openapi.yaml',
    validateRequests: true, // (default)
    validateResponses: true, // false by default
  }),
);
app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});
app.listen(config.port, () => {
  console.log(`Server running at http://localhost:` + config.port);
});
