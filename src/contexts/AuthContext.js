import React, {
  useContext, createContext, useState, useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

import Amplify, { Auth, Hub } from 'aws-amplify';
import { Authenticator, AmplifyTheme } from 'aws-amplify-react';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

const AuthContext = createContext({});

/**
 * @typedef {{
 * user: Object
 * }} IAuthData
 */

/**
 * @typedef {{
 * payload: {
 *  event: ('signOut'|'signIn'|'signUp')
 * }
 * }} ICapsule
 */

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  const handleVerifyUser = useCallback(async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      if (userData) { setUser(userData); }
    } catch (error) {
      console.log('auth error', error);
    }
  }, []);

  const onHubCapsule = useCallback(
    /**
     * @param capsule {ICapsule}
     */
    async (capsule) => {
      if (capsule.payload.event === 'signOut') setUser(undefined);
      if (capsule.payload.event === 'signIn') handleVerifyUser();
    }, [],
  );

  useEffect(() => {
    (async () => {
      await handleVerifyUser();
      Hub.listen('auth', { onHubCapsule });
    })();
  }, [onHubCapsule]);

  return (
    <AuthContext.Provider value={{ user }}>
      <>
        <Authenticator theme={AmplifyTheme} />
        {user && children}
      </>
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
