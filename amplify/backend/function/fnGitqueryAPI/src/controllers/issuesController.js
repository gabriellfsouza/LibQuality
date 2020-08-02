const showRepoIssuesService = require('../services/showRepoIssuesService');

class IssuesController {
  /**
   *
   * @param {Request<ParamsDictionary, any, any, qs.ParsedQs>} request
   * @param {import('express').Response} response
   */
  async show(request, response) {
    const { repoSearch } = request.query;
    const result = await showRepoIssuesService.run({ repoSearch });
    const { identity } = req.apiGateway.event.requestContext;
    const temp = identity.cognitoAuthenticationProvider.split(':');
    const sub = temp[temp.length - 1];

    response.json({ ...result, sub });
  }
}

module.exports = new IssuesController();
