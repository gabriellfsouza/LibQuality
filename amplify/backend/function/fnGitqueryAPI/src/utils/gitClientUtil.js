const axios = require('axios');

class GitClientUtil {
  constructor() {
    /**
     * @type {import('axios').AxiosInstance}
     */
    this.api = axios.create({
      baseURL: 'http://api.github.com/',
    });
    if (process.env.GIT_ACCESS_TOKEN) {
      this.api.defaults.headers = {
        Authorization: `Token ${process.env.GIT_ACCESS_TOKEN}`,
      };
    }

    this.getRepoInfo = this.getRepoInfo.bind(this);
  }

  /**
   * Pass the repository as follow repoSearch = `${account}/${projectname}`
   * @param {{repoSearch:String}} param0
   */
  getRepoInfo({ repoSearch }) {
    return this.api.get(`repos/${repoSearch}`);
  }

  /**
   *
   * @param {{repoSearch:String,per_page:(Number|String),page:(Number|String)}} param0
   */
  getRepoIssues({ repoSearch, per_page, page }) {
    return this.api.get(`repos/${repoSearch}/issues`, {
      params: {
        per_page,
        page,
      },
    });
  }
}

module.exports = new GitClientUtil();
