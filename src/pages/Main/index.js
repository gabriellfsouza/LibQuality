import React, { useState, useCallback } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import {
  Container, Header, ContentCard, SearchArea, StyledTable,
} from './styles';
import { findRepoIssues } from '../../services/issues';

/**
 * @typedef {{
 *  medianTimeOpen: Number,
 *  standardDeviation: Number,
 *  openIssuesCount: Number
 * }} IIssuesReponse
 */

/** @typedef {{
 *  medianTimeOpen: Number,
 *  standardDeviation: Number,
 *  openIssuesCount: Number,
 *  repo: String
 * }} IRepo */

function Main() {
  /** @type {[IRepo[],(repos:IRepo[])=>{}:void]} */
  const [repos, setRepos] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearchRepo = useCallback(
    /**
     * @param e {React.FormEvent<HTMLFormElement>}
     */
    async (e) => {
      e.preventDefault();
      if (!search) return;
      setLoading(true);
      try {
        /** @type {IIssuesReponse} */
        const { medianTimeOpen, openIssuesCount, standardDeviation } = await findRepoIssues({ repoSearch: search });
        setSearch('');
        setShowAlert(false);
        setRepos((prev) => [{
          medianTimeOpen, openIssuesCount, standardDeviation, repo: search,
        }, ...prev.filter((el) => el.repo !== search)]);
      } catch (error) {
        setShowAlert(true);
        if (error.response
          && error.response.data
          && error.response.data.message
          && error.response.data.status
        ) setAlertContent({ title: error.response.data.status, body: error.response.data.message });
        else setAlertContent({ title: 'error', body: 'Search failed.' });
        console.log(error);
      }
      setLoading(false);
    }, [search],
  );

  return (
    <Container>
      <Modal show={loading}><Modal.Body>Loading...</Modal.Body></Modal>
      <Header>
        <h1>LibQuality</h1>
        <p>
          This is a simple tool to compare quality of different open source
          libraries available in GitHub.
        </p>
        <Button variant="primary" type="button">Learn more</Button>
      </Header>
      <ContentCard>
        {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          {alertContent.title && <Alert.Heading>{alertContent.title}</Alert.Heading>}
          <p>{alertContent.body}</p>
        </Alert>
        )}
        <SearchArea onSubmit={handleSearchRepo}>
          <input placeholder="Library's name" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button type="submit">Search</Button>
        </SearchArea>
        <StyledTable striped hover>
          <thead>
            <tr>
              <th>{' '}</th>
              <th>{' '}</th>
              <th>#issues</th>
              <th>avg age</th>
              <th>Std age</th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo, index) => (
              <tr key={repo.repo}>
                <td>{index + 1}</td>
                <td>{repo.repo}</td>
                <td>{repo.openIssuesCount}</td>
                <td>
                  {repo.medianTimeOpen}
                  d
                </td>
                <td>
                  {repo.standardDeviation}
                  d
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>

      </ContentCard>
    </Container>
  );
}

export default Main;
