const showRepoIssuesService = require('../services/showRepoIssuesService');

class IssuesController {
  /**
   *
   * @param {import('express').RequestHandler} request
   * @param {import('express').Response} response
   */
  async show(request, response) {
    const { repoSearch } = request.query;
    const result = await showRepoIssuesService.run({ repoSearch });
    const { identity } = request.apiGateway.event.requestContext;
    const temp = identity.cognitoAuthenticationProvider.split(':');
    const sub = temp[temp.length - 1];

    return response.json({ ...result, sub });
  }
}

module.exports = new IssuesController();
