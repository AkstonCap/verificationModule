import { combineReducers } from 'redux';

import following from './following';
import namespaces from './namespaces';

export default combineReducers({
  following,
  namespaces,
});
