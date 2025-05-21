import { secureApiCall, showSuccessDialog, showErrorDialog } from 'nexus-module';

export const createAsset = async (assetData, onSuccess = () => {}, onError = () => {}) => {
  try {
    // Validate required fields
    if (!assetData.name || !assetData.type) {
      showErrorDialog({
        message: 'Missing required fields',
        note: 'Please fill in name, category and supplier fields'
      });
      return;
    }
    
    const result = await secureApiCall('assets/create/asset', {
      name: assetData.name,
      data: JSON.stringify({
        name: assetData.name,
        text: assetData.text,
        distordia: assetData.type,
      })
    });
    
    showSuccessDialog({
      message: 'Asset Created',
      note: `Successfully created asset: ${result.address}`
    });
    
    onSuccess(result);
    return result;
    
  } catch (error) {
    showErrorDialog({
      message: 'Failed to create asset',
      note: error?.message || 'Unknown error'
    });
    
    onError(error);
    throw error;
  }
};
