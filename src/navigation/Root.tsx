import React from 'react';
import AuthorizedStack from '../navigation/stack/AuthorizedStack';
import UnauthorizedStack from '../navigation/stack/UnauthorizedStack';

import Settings from '../container/Settings';
const Root = () => {
  const {loggedInUser} = Settings.useContainer();

  return loggedInUser ? <AuthorizedStack /> : <UnauthorizedStack />;
};

export default Root;
