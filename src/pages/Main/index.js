import React from 'react';
import { Button, Table } from 'react-bootstrap';
import {
  Container, Header, ContentCard, SearchArea, StyledTable,
} from './styles';

function Main() {
  return (
    <Container>
      <Header>
        <h1>LibQuality</h1>
        <p>
          This is a simple tool to compare quality of different open source
          libraries available in GitHub.
        </p>
        <Button variant="primary" type="button">Learn more</Button>
      </Header>
      <ContentCard>
        <SearchArea>
          <input placeholder="Library's name" />
          <Button>Search</Button>
        </SearchArea>
        <StyledTable striped hover>
          <thead>
            <tr>
              <th>{' '}</th>
              <th>#issues</th>
              <th>avg age</th>
              <th>Std age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </StyledTable>

      </ContentCard>
    </Container>
  );
}

export default Main;
