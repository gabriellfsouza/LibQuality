/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
  AUTH_LIBQUALITY25E0E21A_USERPOOLID
  ENV
  REGION
  STORAGE_LIBQUALITYDB_ARN
  STORAGE_LIBQUALITYDB_NAME
Amplify Params - DO NOT EDIT */

const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
require('./errors/CustomError');
const routes = require('./routes');

class App {
  constructor() {
    // declare a new express app
    this.server = express();
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

  errHandlers() {
    this.server.use((err, request, response, _) => {
      if (err instanceof CustomError) {
        return response.status(err.statusCode).json({
          status: 'error',
          message: err.message,
        });
      }

      return response.status(500).json({
        status: 'error',
        message: err.message,
      });
    });
  }

  routes() {
    this.server.use('/', routes);
  }
}

module.exports = new App().server;
// const app = express();
// app.use(bodyParser.json());
// app.use(awsServerlessExpressMiddleware.eventContext());

// // Enable CORS for all methods
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// app.use(routes);

// /** ********************
//  * Example get method *
//  ********************* */

// app.get('/issues', (req, res) => {
//   // Add your code here
//   const { identity } = req.apiGateway.event.requestContext;
//   const temp = identity.cognitoAuthenticationProvider.split(':');
//   const sub = temp[temp.length - 1];
//   console.log('request', req);
//   console.log('header', req.apiGateway.event.requestContext.identity);
//   console.log('headers', JSON.stringify(req.headers, null, 2));
//   res.json({
//     success: 'get call succeed!', url: req.url, identity, sub,
//   });
// });

// app.get('/issues/*', (req, res) => {
//   // Add your code here
//   console.log('request', req);
//   console.log('issues', JSON.stringify(awsServerlessExpressMiddleware.eventContext(), null, 2));
//   res.json({ success: 'get call succeed!', url: req.url });
// });

// /** **************************
// * Example post method *
// *************************** */

// app.post('/issues', (req, res) => {
//   // Add your code here
//   res.json({ success: 'post call succeed!', url: req.url, body: req.body });
// });

// app.post('/issues/*', (req, res) => {
//   // Add your code here
//   res.json({ success: 'post call succeed!', url: req.url, body: req.body });
// });

// /** **************************
// * Example put method *
// *************************** */

// app.put('/issues', (req, res) => {
//   // Add your code here
//   res.json({ success: 'put call succeed!', url: req.url, body: req.body });
// });

// app.put('/issues/*', (req, res) => {
//   // Add your code here
//   res.json({ success: 'put call succeed!', url: req.url, body: req.body });
// });

// /** **************************
// * Example delete method *
// *************************** */

// app.delete('/issues', (req, res) => {
//   // Add your code here
//   res.json({ success: 'delete call succeed!', url: req.url });
// });

// app.delete('/issues/*', (req, res) => {
//   // Add your code here
//   res.json({ success: 'delete call succeed!', url: req.url });
// });

// app.listen(3000, () => {
//   console.log('App started');
// });

// // Export the app object. When executing the application local this does nothing. However,
// // to port it to AWS Lambda we will create a wrapper around that will load the app from
// // this file
// module.exports = app;
