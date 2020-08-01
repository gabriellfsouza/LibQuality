import { API } from 'aws-amplify';

/**
 * Pass the repository as follow repoSearch = `${account}/${projectname}`
 * @param {{repoSearch:String}} param0
 */
export async function findRepoIssues({ repoSearch }) {
  return API.get('gitquery', '/issues', {
    queryStringParameters: {
      repoSearch,
    },
  });
}
