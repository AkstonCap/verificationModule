import * as TYPE from 'actions/types';

const initialState = {
  following: [],
  //followers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.ADD_FOLLOWING:
      return {
        ...state,
        following: [...state.following, action.payload],
      };

    case TYPE.REMOVE_FOLLOWING:
      return {
        ...state,
        following: state.following.filter((user) => user !== action.payload),
      };

    default:
      return state;
  }
};
