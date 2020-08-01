import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalStyle from './styles/global';
import Main from './pages/Main';

import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Main />
    </AuthProvider>
  );
}

export default App;
