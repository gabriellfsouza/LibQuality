const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION });

class DynamoUtil {
  /** @param obj {Object} */
  /** @param table {String} */
  async createDDB(obj, table) {
    return ddb.put({ TableName: table, Item: obj }).promise();
  }
}

module.exports = new DynamoUtil();
