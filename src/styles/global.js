import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  body {
    background: #fff;
    color: rgb(50,51,51);
    -webkit-font-smoothing: antialiased;
  }

  #root {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 100vh;
  }

  body, input, button {
    font-family: sans-serif;
    font-size: 16px;
  }
  h1,h2,h3,h4,h5,h6, strong{
    font-weight: 500;
  }
  button {
    cursor: pointer;
  }
`;
