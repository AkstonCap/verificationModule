import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  FieldSet,
  apiCall,
  showErrorDialog,
  showSuccessDialog,
  Button,
} from 'nexus-module';

import {
  PageLayout,
  SingleColRow,
  AssetCard,
  AssetTitle,
  AssetMeta,
  ResultField,
  FieldLabel,
  FieldValue,
  StatusMessage,
  NoResults,
} from '../components/styles';

function formatTimestamp(unix) {
  if (!unix) return 'N/A';
  return new Date(unix * 1000).toLocaleString();
}

export default function MyAssets() {
  const userStatus = useSelector((state) => state.nexus.userStatus);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedAddress, setExpandedAddress] = useState(null);

  const fetchMyAssets = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await apiCall('assets/list/asset', {
        where: `results.distordia-type=content`,
      });
      setAssets(result || []);
    } catch (error) {
      // -44 means no results
      if (
        error?.message?.includes('-44') ||
        error?.message?.includes('No registers found')
      ) {
        setAssets([]);
      } else {
        showErrorDialog({
          message: 'Cannot load assets',
          note: error?.message || 'Unknown error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userStatus) {
      fetchMyAssets();
    }
  }, [userStatus]);

  if (!userStatus) {
    return (
      <PageLayout>
        <StatusMessage>
          Please log in to the Nexus Wallet to view your registered content.
        </StatusMessage>
      </PageLayout>
    );
  }

  const renderAssetDetails = (asset) => (
    <div style={{ marginTop: 10 }}>
      <ResultField>
        <FieldLabel>Address:</FieldLabel>
        <FieldValue>{asset.address}</FieldValue>
      </ResultField>
      <ResultField>
        <FieldLabel>URL:</FieldLabel>
        <FieldValue>{asset.url}</FieldValue>
      </ResultField>
      {asset.author && (
        <ResultField>
          <FieldLabel>Author:</FieldLabel>
          <FieldValue>{asset.author}</FieldValue>
        </ResultField>
      )}
      {asset.publisher && (
        <ResultField>
          <FieldLabel>Publisher:</FieldLabel>
          <FieldValue>{asset.publisher}</FieldValue>
        </ResultField>
      )}
      {asset.published && (
        <ResultField>
          <FieldLabel>Published:</FieldLabel>
          <FieldValue>{asset.published}</FieldValue>
        </ResultField>
      )}
      {asset['content-type'] && (
        <ResultField>
          <FieldLabel>Type:</FieldLabel>
          <FieldValue>{asset['content-type']}</FieldValue>
        </ResultField>
      )}
      {asset.status && (
        <ResultField>
          <FieldLabel>Status:</FieldLabel>
          <FieldValue>{asset.status}</FieldValue>
        </ResultField>
      )}
      {asset.hash && (
        <ResultField>
          <FieldLabel>Hash:</FieldLabel>
          <FieldValue>{asset.hash}</FieldValue>
        </ResultField>
      )}
      {asset.lang && (
        <ResultField>
          <FieldLabel>Language:</FieldLabel>
          <FieldValue>{asset.lang}</FieldValue>
        </ResultField>
      )}
      {asset.license && (
        <ResultField>
          <FieldLabel>License:</FieldLabel>
          <FieldValue>{asset.license}</FieldValue>
        </ResultField>
      )}
      {asset.keywords && (
        <ResultField>
          <FieldLabel>Keywords:</FieldLabel>
          <FieldValue>{asset.keywords}</FieldValue>
        </ResultField>
      )}
      <ResultField>
        <FieldLabel>Registered:</FieldLabel>
        <FieldValue>{formatTimestamp(asset.created)}</FieldValue>
      </ResultField>
      <ResultField>
        <FieldLabel>Modified:</FieldLabel>
        <FieldValue>{formatTimestamp(asset.modified)}</FieldValue>
      </ResultField>
      <ResultField>
        <FieldLabel>Owner:</FieldLabel>
        <FieldValue>{asset.owner}</FieldValue>
      </ResultField>
    </div>
  );

  return (
    <PageLayout>
      <SingleColRow>
        <div
          style={{
            width: '100%',
            maxWidth: 600,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 13, opacity: 0.6 }}>
            {assets.length} registered content asset(s)
          </span>
          <Button onClick={fetchMyAssets} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>
      </SingleColRow>

      <SingleColRow>
        {loading && assets.length === 0 && (
          <StatusMessage>Loading your content assets...</StatusMessage>
        )}

        {!loading && assets.length === 0 && (
          <NoResults>
            You have not registered any content yet. Use the "Register" tab to
            register your first content asset on the Nexus blockchain.
          </NoResults>
        )}

        {assets.map((asset, i) => (
          <AssetCard
            key={asset.address || i}
            onClick={() =>
              setExpandedAddress(
                expandedAddress === asset.address ? null : asset.address
              )
            }
          >
            <AssetTitle>{asset.title || 'Untitled'}</AssetTitle>
            <AssetMeta>
              {asset.url && `${asset.url}`}
            </AssetMeta>
            <AssetMeta>
              {asset.author && `Author: ${asset.author} | `}
              {asset.status && `Status: ${asset.status} | `}
              Registered: {formatTimestamp(asset.created)}
            </AssetMeta>
            {expandedAddress === asset.address && renderAssetDetails(asset)}
          </AssetCard>
        ))}
      </SingleColRow>
    </PageLayout>
  );
}
