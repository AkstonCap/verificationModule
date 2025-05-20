import { apiCall } from 'nexus-module';

// Action types
export const FETCH_ASSETS_REQUEST = 'FETCH_ASSETS_REQUEST';
export const FETCH_ASSETS_SUCCESS = 'FETCH_ASSETS_SUCCESS';
export const FETCH_ASSETS_FAILURE = 'FETCH_ASSETS_FAILURE';

// Thunk action creator to fetch assets from a specific namespace
export function fetchAssetsByNamespace(namespace) {
  return async (dispatch) => {
    dispatch({ type: FETCH_ASSETS_REQUEST, payload: namespace });
    try {
      // Use the correct Nexus API call pattern
      const response = await apiCall(
        'register/list/assets:asset',
        { 
            where: `namespace=${namespace};results.distordia=news;results.dStatus=1`,  
            // Add any other parameters you need here 
        }
      );
      dispatch({ type: FETCH_ASSETS_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: FETCH_ASSETS_FAILURE, error });
    }
  };
}
