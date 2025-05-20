import * as TYPE from 'actions/types';

const initialState = {
    extNamespace: 'distordia', // Set your default following here
    myNamespace: '' // Set your default namespace here
    };

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.SWITCH_EXT_NAMESPACE:
      return {
        ...state,
        extNamespace: action.payload,
      };
    case TYPE.SWITCH_MY_NAMESPACE:
      return {
        ...state,
        myNamespace: action.payload,
      };
    default:
      return state;
  }
};