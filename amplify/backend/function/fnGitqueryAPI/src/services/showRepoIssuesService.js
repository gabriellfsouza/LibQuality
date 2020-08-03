const { standardDeviation, mean } = require('math-stats');
const { differenceInDays, parseISO } = require('date-fns');

const gitClientUtil = require('../utils/gitClientUtil');
const SearchRecord = require('../models/SearchRecordModel');

/** @typedef {{
 * id: Number,
 * name: String,
 * full_name: String,
 * open_issues_count: Number
 * }} IRepo */

/** @typedef {{
 * id: Number,
 * number: Number,
 * created_at: String,
 * updated_at: String
 * }} IIssue */

class ShowRepoIssuesService {
  /**
   *
   * @param {{repoSearch:String, user: String}} param0
   */
  async run({ repoSearch, user }) {
    try {
      /** @type {{data:IRepo}} */
      const { data: repo } = await gitClientUtil.getRepoInfo({ repoSearch });
      const per_page = (process.env.GIT_ITEMS_PER_PAGE)
        ? Number(process.env.GIT_ITEMS_PER_PAGE)
        : 100;
      const { open_issues_count } = repo;
      const pages = Math.ceil(open_issues_count / per_page);
      const arr = new Array(pages).fill();

      const results = await Promise
        .all(arr.map((_, index) => gitClientUtil.getRepoIssues({ page: index + 1, per_page, repoSearch })));
      console.log('searchResults', {
        length: results.length, open_issues_count, pages, per_page,
      });
      /** @type {IIssue[]} */
      const issues = [];
      results.forEach((res) => {
      // results.forEach((res, index) => {
        // console.log(`Res ${index + 1}`, res);
        issues.push(...res.data);
      });

      const currentDate = new Date();
      const daysOpenArr = issues.map((issue) => differenceInDays(currentDate, parseISO(issue.created_at)));
      const openedMedian = mean(daysOpenArr);
      const openedDeviation = standardDeviation(daysOpenArr);
      console.log({ daysOpenArr, openedDeviation, openedMedian });
      const searchRecord = new SearchRecord({ repo: repoSearch, user });
      const record = await searchRecord.create();
      return {
        medianTimeOpen: openedMedian, standardDeviation: openedDeviation, openIssuesCount: open_issues_count, record,
      };
    } catch (error) {
      if (error.response
        && error.response.status
        && error.response.statusText
      ) throw new CustomError({ message: error.response.statusText, code: error.response.status });
      else throw error;
    }
  }
}

module.exports = new ShowRepoIssuesService();
