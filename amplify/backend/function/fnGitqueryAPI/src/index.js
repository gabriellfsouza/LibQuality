const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');

app.listen(3000, () => {
  console.log('App started');
});

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log(`CONTEXT: ${JSON.stringify(context)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
