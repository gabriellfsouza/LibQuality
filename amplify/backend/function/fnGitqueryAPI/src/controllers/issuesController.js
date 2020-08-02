const showRepoIssuesService = require('../services/showRepoIssuesService');

class IssuesController {
  /**
   *
   * @param {import('express').RequestHandler} request
   * @param {import('express').Response} response
   */
  async show(request, response) {
    const { repoSearch } = request.query;
    let user = '';
    try {
      const { identity } = request.apiGateway.event.requestContext;
      const temp = identity.cognitoAuthenticationProvider.split(':');
      user = temp[temp.length - 1];
    } catch (error) {
      console.warn('WARNING', 'User not founded');
    }
    const result = await showRepoIssuesService.run({ repoSearch, user });
    console.log('ISSUE_RESULT', result);
    return response.status(200).json({ ...result, user });
  }
}

module.exports = new IssuesController();
