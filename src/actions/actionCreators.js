import * as TYPE from './types';

export const switchTab = (tab) => ({
  type: TYPE.SWITCH_TAB,
  payload: tab,
});

export const updateInput = (inputValue) => ({
  type: TYPE.UPDATE_INPUT,
  payload: inputValue,
});

/*
export const showConnections = () => ({
  type: TYPE.SHOW_CONNECTIONS,
});

export const hideConnections = () => ({
  type: TYPE.HIDE_CONNECTIONS,
});
*/