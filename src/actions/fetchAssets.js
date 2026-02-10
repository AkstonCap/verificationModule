import { apiCall } from 'nexus-module';

// Verify content by URL - queries the network for matching content assets
export async function verifyContentByUrl(url) {
  const result = await apiCall('register/list/assets:asset', {
    where: `results.distordia-type=content AND results.url=${url}`,
  });
  return result || [];
}

// List content assets owned by a specific genesis ID
export async function listContentByGenesis(genesisId) {
  const result = await apiCall('register/list/assets:asset', {
    where: `results.owner=${genesisId} AND results.distordia-type=content`,
  });
  return result || [];
}

// List content assets under a specific namespace
export async function listContentByNamespace(namespace) {
  const result = await apiCall('register/list/assets:asset', {
    where: `results.namespace=${namespace} AND results.distordia-type=content`,
  });
  return result || [];
}

// Get a single asset by address
export async function getAssetByAddress(address) {
  const result = await apiCall('register/get/assets:asset', {
    address: address,
  });
  return result;
}

// List logged-in user's own content assets
export async function listMyContentAssets() {
  const result = await apiCall('assets/list/asset', {
    where: `results.distordia-type=content`,
  });
  return result || [];
}
