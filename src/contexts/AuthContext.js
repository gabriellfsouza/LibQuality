import React, {
  useContext, createContext, useState, useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

import { Auth, Hub } from 'aws-amplify';
import { Authenticator, AmplifyTheme } from 'aws-amplify-react';

const AuthContext = createContext({});

/** @typedef {{
 * user: Object
 * }} IAuthData
 */

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const onHubCapsule = useCallback(async (capsule) => {
    console.log(capsule);
    debugger;
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const userData = await Auth.currentAuthenticatedUser();
        if (user) { setUser(userData); }
      } catch (error) {
        debugger;
        console.log('auth error', error);
      }
      Hub.listen('auth', { onHubCapsule });
    })();
  }, [onHubCapsule]);

  return (
    <AuthContext.Provider value={{ user }}>
      {user ? children : <Authenticator theme={AmplifyTheme} />}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.shape(),
  ]).isRequired,
};

export function useAuth() {
  /** @type {IAuthData} */
  const context = useContext(AuthContext);

  return context;
}

export default AuthContext;
