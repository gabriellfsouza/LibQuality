const showRepoIssuesService = require('./showRepoIssuesService');
const SearchRecordModel = require('../models/SearchRecordModel');

jest.mock('../models/SearchRecordModel');

const mockCreateRecord = jest.fn();
const mockFindRepo = jest.fn();
const mockGetIssues = jest.fn();

// SearchRecordModel.prototype.create = mockCreateRecord;

// const gitClientUtil = require('../utils/gitClientUtil');
// const SearchRecord = require('../models/SearchRecordModel');

jest.mock('../utils/gitClientUtil', () => ({
  getRepoInfo(...data) {
    return mockFindRepo(...data);
  },
  getRepoIssues(...data) {
    return mockGetIssues(...data);
  },
}));

// jest.mock('../models/SearchRecordModel', () => {
//   SearchRecordModel.prototype.create = (...data) => mockCreateRecord(...data);
//   return (data) => SearchRecordModel;
// });

describe('show repos issues service test', () => {
  beforeAll(() => {
    SearchRecordModel.prototype.create = jest.fn();
  });

  beforeEach(() => {
    mockFindRepo.mockClear();
    mockGetIssues.mockClear();
    mockCreateRecord.mockClear();
    SearchRecordModel.mockClear();
    SearchRecordModel.prototype.create.mockClear();
  });

  it('should be able to process repository issues data', async () => {
    process.env.GIT_ITEMS_PER_PAGE = '3';
    const mockedRecordData = {
      repo: 'repo/name', user: 'user-id', created_at: new Date(), id: 'new-id',
    };
    const mockedRepo = {
      id: 1234,
      name: 'name',
      full_name: 'repo/name',
      open_issues_count: 4,
    };
    const mockedIssue = [[
      {
        id: 1,
        number: 1,
        created_at: '2019-10-10T01:00:00.000Z',
      },
      {
        id: 2,
        number: 2,
        created_at: '2019-12-30T20:00:00.000Z',
      },
      {
        id: 3,
        number: 3,
        created_at: '2020-07-30T08:00:00.000Z',
      },
    ],
    [{
      id: 4,
      number: 4,
      created_at: '2020-08-01T17:00:00.000Z',
    }]];
    mockFindRepo.mockImplementation(() => ({ data: mockedRepo }));
    mockGetIssues.mockImplementation(({ page }) => ({ data: mockedIssue[page - 1] }));

    SearchRecordModel.prototype.create.mockImplementation(() => mockedRecordData);

    const {
      medianTimeOpen,
      standardDeviation,
      openIssuesCount,
    } = await showRepoIssuesService.run({
      repoSearch: 'repo/name', user: 'user-id',
    });
    expect(SearchRecordModel).toHaveBeenCalledTimes(1);
    expect(medianTimeOpen).toBe(129.5);
    expect(standardDeviation).toBe(131);
    expect(openIssuesCount).toBe(4);
  });

  it('should throw an error when searched repo was not found', async () => {
    process.env.GIT_ITEMS_PER_PAGE = '3';
    const mockedRecordData = {
      repo: 'repo/name', user: 'user-id', created_at: new Date(), id: 'new-id',
    };

    mockFindRepo.mockImplementation(() => {
      const customErr = new Error('custom');
      customErr.response = { status: 400, statusText: 'Not found' };
      throw customErr;
    });

    SearchRecordModel.prototype.create.mockImplementation(() => mockedRecordData);

    await expect(showRepoIssuesService.run({
      repoSearch: 'repo/name', user: 'user-id',
    })).rejects.toBeInstanceOf(
      CustomError,
    );
    expect(SearchRecordModel).toHaveBeenCalledTimes(0);
  });
  it('should throw an unexpected error', async () => {
    process.env.GIT_ITEMS_PER_PAGE = '3';
    const mockedRecordData = {
      repo: 'repo/name', user: 'user-id', created_at: new Date(), id: 'new-id',
    };

    mockFindRepo.mockImplementation(() => {
      throw new Error('error');
    });

    SearchRecordModel.prototype.create.mockImplementation(() => mockedRecordData);

    await expect(showRepoIssuesService.run({
      repoSearch: 'repo/name', user: 'user-id',
    })).rejects.not.toBeInstanceOf(
      CustomError,
    );
    expect(SearchRecordModel).toHaveBeenCalledTimes(0);
  });
});
