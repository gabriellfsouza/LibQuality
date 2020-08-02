const { standardDeviation, median } = require('math-stats');
const { differenceInDays, parseISO } = require('date-fns');

const gitClientUtil = require('../utils/gitClientUtil');

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
   * @param {{repoSearch:String}} param0
   */
  async run({ repoSearch }) {
    /** @type {{data:IRepo}} */
    const { data: repo } = await gitClientUtil.getRepoInfo({ repoSearch });
    const per_page = process.env.GIT_ITEMS_PER_PAGE || 100;
    const { open_issues_count } = repo;
    const pages = Math.ceil(open_issues_count / per_page);
    const arr = new Array(pages).fill();

    const results = await Promise.all(arr.map((_, index) => gitClientUtil.getRepoIssues({ page: index + 1, per_page, repoSearch })));

    /** @type {IIssue[]} */
    const issues = [];
    results.forEach((res) => issues.push(...res.data));

    const currentDate = new Date();
    const daysOpenArr = issues.map((issue) => differenceInDays(currentDate, parseISO(issue.created_at)));
    const openedMedian = median(daysOpenArr);
    const openedDeviation = Math.round(standardDeviation(daysOpenArr));
    return { medianTimeOpen: openedMedian, standardDeviation: openedDeviation, openIssuesCount: open_issues_count };
  }
}

module.exports = new ShowRepoIssuesService();
