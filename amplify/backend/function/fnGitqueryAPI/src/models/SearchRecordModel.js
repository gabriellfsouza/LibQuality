const { uuid } = require('uuidv4');

const dynamoUtil = require('../utils/dynamoUtil');

/** @typedef {{
 *  id: String,
 *  user: String,
 *  repo: String,
 *  created_at: Date,
 * }} ISearchRecord */

class SearchRecordModel {
  /**
   * @param record {ISearchRecord}
   */
  constructor(record = {}) {
    this.id = record.id;
    this.user = record.user;
    this.repo = record.repo;
    this.created_at = record.created_at;
  }

  async create() {
    if (this.id) throw new CustomError({ message: 'User already created.', code: 403 });
    const id = uuid();
    const created_at = new Date();
    const { user, repo } = this;
    try {
      await dynamoUtil.createDDB({
        id, user, repo, created_at: created_at.toISOString(),
      }, process.env.STORAGE_LIBQUALITYDB_NAME);
    } catch (error) {
      if (error.status && error.message) throw new CustomError({ message: error.message, code: error.status });
      throw error;
    }
    this.id = id;
    this.created_at = created_at;
    return this;
  }
}

module.exports = SearchRecordModel;
