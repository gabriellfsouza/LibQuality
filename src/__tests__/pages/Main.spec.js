import React from 'react';
import { map } from 'lodash';
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-test-renderer';
import Main from '../../pages/Main';

/** @typedef {import('../../pages/Main').IRepo} IRepo */
/** @typedef {import('../../pages/Main').IIssuesReponse} IRepo */

const mockedFindRepoIssues = jest.fn();

jest.mock('../../services/issues', () => ({
  findRepoIssues({ repoSearch }) {
    return mockedFindRepoIssues({ repoSearch });
  },
}));

describe('Main page', () => {
  beforeEach(() => {
    mockedFindRepoIssues.mockClear();
  });

  it('should be able to display a search result', async () => {
    mockedFindRepoIssues.mockImplementation(async () => Promise.resolve({ medianTimeOpen: 60, openIssuesCount: 80, standardDeviation: 10 }));
    const repo = 'mocked/path';
    const {
      getByText,
      getByTestId,
      getByPlaceholderText,
    } = render(<Main />);

    const inputElement = getByPlaceholderText('Library\'s name');
    const searchButton = getByText('Search');

    act(() => {
      fireEvent.change(inputElement, { target: { value: repo } });
      fireEvent.submit(searchButton);
    });

    await wait(() => {
      expect(mockedFindRepoIssues).toHaveBeenCalledTimes(1);
      expect(mockedFindRepoIssues).toHaveBeenCalledWith({ repoSearch: repo });
    });

    /** @type {HTMLTableRowElement} */
    const repoElement = getByTestId(repo);

    const result = map(repoElement.getElementsByTagName('td'), (e) => e.innerHTML);

    expect(result.indexOf('60d')).toBeGreaterThan(-1);
    expect(result.indexOf('80')).toBeGreaterThan(-1);
    expect(result.indexOf('10d')).toBeGreaterThan(-1);
  });

  it('should be able to show an alert when the search returns an expected error', async () => {
    const repo = 'mocked/path';
    mockedFindRepoIssues.mockImplementation(async ({ repoSearch }) => Promise.reject({ response: { data: { message: 'Loren ipsum', status: 'Failed' } } }));
    const {
      getByText,
      getByPlaceholderText,
    } = render(<Main />);

    const inputElement = getByPlaceholderText('Library\'s name');
    const searchButton = getByText('Search');

    act(() => {
      fireEvent.change(inputElement, { target: { value: repo } });
      fireEvent.submit(searchButton);
    });

    await wait(() => {
      expect(mockedFindRepoIssues).toHaveBeenCalledTimes(1);
      expect(mockedFindRepoIssues).toHaveBeenCalledWith({ repoSearch: repo });
    });
    expect(getByText('Loren ipsum')).toBeTruthy();
    expect(getByText('Failed')).toBeTruthy();
  });

  it('should be able to show an alert when the search returns an error', async () => {
    const repo = 'mocked/path';
    mockedFindRepoIssues.mockImplementation(async ({ repoSearch }) => {
      throw new Error('failed');
    });
    const {
      getByText,
      getByPlaceholderText,
    } = render(<Main />);

    const inputElement = getByPlaceholderText('Library\'s name');
    const searchButton = getByText('Search');

    act(() => {
      fireEvent.change(inputElement, { target: { value: repo } });
      fireEvent.submit(searchButton);
    });

    await wait(() => {
      expect(mockedFindRepoIssues).toHaveBeenCalledTimes(1);
      expect(mockedFindRepoIssues).toHaveBeenCalledWith({ repoSearch: repo });
    });

    expect(getByText('Search failed.')).toBeTruthy();
    expect(getByText('error')).toBeTruthy();
  });
});
