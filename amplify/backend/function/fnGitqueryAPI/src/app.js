/* Amplify Params - DO NOT EDIT
	AUTH_LIBQUALITY25E0E21A_USERPOOLID
	ENV
	REGION
	STORAGE_LIBQUALITYDB_ARN
	STORAGE_LIBQUALITYDB_NAME
Amplify Params - DO NOT EDIT */

const express = require('express');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const bodyParser = require('body-parser');
require('express-async-errors');
require('./errors/CustomError');
const routes = require('./routes');

class App {
  constructor() {
    // declare a new express app
    this.server = express();
    this.middlewares();
    this.routes();
    this.errHandler();
  }

  middlewares() {
    this.server.use(bodyParser.json());
    this.server.use(awsServerlessExpressMiddleware.eventContext());

    // Enable CORS for all methods
    this.server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
      );
      next();
    });
  }

  errHandler() {
    this.server.use((err, request, response, _) => {
      console.trace(err);
      if (err instanceof CustomError) {
        return response.status(err.code).json({
          status: 'error',
          message: err.message,
        });
      }

      return response.status(500).json({
        status: 'error',
        message: (process.env.NODE_ENV === 'prod')
          ? 'internal error'
          : err.message,
      });
    });
  }

  routes() {
    this.server.use('/', routes);
  }
}

module.exports = new App().server;
