import styled from 'styled-components';
import { Table } from 'react-bootstrap';

export const Container = styled.div`
  flex: 1;
  align-self: center;
  display: flex;
  flex-direction: column;

  max-width: 1280px;
  background: rgb(238,238,238);
`;

export const Header = styled.header`
  display: flex;
  padding: 50px;
  flex-direction: column;
  align-items: flex-start;
`;

export const ContentCard = styled.section`
  flex: 1;
  display: flex;
  padding: 25px 50px;
  flex-direction: column;
  border: 1px solid rgb(50,51,51);
  background: #fff;
  border-radius: 4px;
  align-items: stretch;
  margin-bottom: 50px;
`;

export const SearchArea = styled.div`
  display: flex;
  flex-direction: row;
  height: 25px;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > input {
    flex: 1;
  }

  > * + * {
    margin-left: 15px;
  }
`;

export const StyledTable = styled(Table)`
  align-self: flex-start;
  width: auto;

  margin-top: 25px;
`;
