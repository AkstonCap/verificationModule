import { useState } from 'react';
import {
  FieldSet,
  apiCall,
  showErrorDialog,
  Button,
} from 'nexus-module';

import {
  PageLayout,
  SingleColRow,
  SearchForm,
  SearchRow,
  UrlField,
  SmallField,
  VerificationResult,
  ResultHeader,
  ResultField,
  FieldLabel,
  FieldValue,
  NoResults,
  AssetCard,
  AssetTitle,
  AssetMeta,
} from '../components/styles';

function formatTimestamp(unix) {
  if (!unix) return 'N/A';
  return new Date(unix * 1000).toLocaleString();
}

export default function VerifyContent() {
  const [url, setUrl] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [results, setResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const handleVerify = async () => {
    if (!url.trim()) {
      showErrorDialog({
        message: 'URL required',
        note: 'Please enter a URL to verify.',
      });
      return;
    }

    if (searching) return;
    setSearching(true);
    setResults(null);
    setSelectedAsset(null);

    try {
      // Query the network for content assets matching this URL
      const result = await apiCall('register/list/assets:asset', {
        where: `results.distordia-type=content AND results.url=${url.trim()}`,
      });

      const assets = result || [];

      // If an identifier (genesis ID or namespace) is provided, check for matches
      let matchedAssets = assets;
      let identifierMatch = false;
      const id = identifier.trim();

      if (id && assets.length > 0) {
        matchedAssets = assets.filter(
          (a) =>
            a.owner === id ||
            (a.name && a.name.startsWith(id + ':')) ||
            (a.name && a.name.startsWith(id + '::'))
        );
        identifierMatch = matchedAssets.length > 0;
      }

      setResults({
        allAssets: assets,
        matchedAssets,
        identifierMatch,
        identifierProvided: !!id,
      });
    } catch (error) {
      // No results found is not necessarily an error on the register API
      if (
        error?.message?.includes('-44') ||
        error?.message?.includes('No registers found')
      ) {
        setResults({
          allAssets: [],
          matchedAssets: [],
          identifierMatch: false,
          identifierProvided: !!identifier.trim(),
        });
      } else {
        showErrorDialog({
          message: 'Verification failed',
          note: error?.message || 'Unknown error',
        });
      }
    } finally {
      setSearching(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleVerify();
  };

  const renderAssetDetails = (asset) => (
    <div>
      <ResultField>
        <FieldLabel>Address:</FieldLabel>
        <FieldValue>{asset.address}</FieldValue>
      </ResultField>
      <ResultField>
        <FieldLabel>Owner:</FieldLabel>
        <FieldValue>{asset.owner}</FieldValue>
      </ResultField>
      {asset.name && (
        <ResultField>
          <FieldLabel>Name:</FieldLabel>
          <FieldValue>{asset.name}</FieldValue>
        </ResultField>
      )}
      <ResultField>
        <FieldLabel>Title:</FieldLabel>
        <FieldValue>{asset.title || 'N/A'}</FieldValue>
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
    </div>
  );

  const renderResults = () => {
    if (!results) return null;

    const { allAssets, matchedAssets, identifierMatch, identifierProvided } =
      results;

    if (allAssets.length === 0) {
      return (
        <VerificationResult verified={false}>
          <ResultHeader verified={false}>Not Registered</ResultHeader>
          <div style={{ fontSize: 13 }}>
            No content registration found for this URL on the Nexus blockchain.
          </div>
        </VerificationResult>
      );
    }

    // If identifier was provided, show match/mismatch
    if (identifierProvided) {
      if (identifierMatch) {
        return (
          <div>
            <VerificationResult verified={true}>
              <ResultHeader verified={true}>Verified</ResultHeader>
              <div style={{ fontSize: 13, marginBottom: 12 }}>
                This URL is registered and matches the provided creator
                identifier.
              </div>
              {matchedAssets.map((asset, i) => (
                <div key={asset.address || i}>
                  {renderAssetDetails(asset)}
                </div>
              ))}
            </VerificationResult>
            {allAssets.length > matchedAssets.length && (
              <div
                style={{ fontSize: 12, opacity: 0.6, marginTop: 8, textAlign: 'center' }}
              >
                {allAssets.length - matchedAssets.length} other registration(s)
                found from different creators.
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div>
            <VerificationResult verified={false}>
              <ResultHeader verified={false}>Not Verified</ResultHeader>
              <div style={{ fontSize: 13, marginBottom: 12 }}>
                This URL is registered on the blockchain, but NOT by the
                provided creator identifier. This could indicate impersonation.
              </div>
            </VerificationResult>
            <div style={{ marginTop: 16 }}>
              <div
                style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, textAlign: 'center' }}
              >
                Found {allAssets.length} registration(s) from other creators:
              </div>
              {allAssets.map((asset, i) => (
                <AssetCard
                  key={asset.address || i}
                  onClick={() =>
                    setSelectedAsset(
                      selectedAsset?.address === asset.address ? null : asset
                    )
                  }
                >
                  <AssetTitle>{asset.title || 'Untitled'}</AssetTitle>
                  <AssetMeta>Owner: {asset.owner}</AssetMeta>
                  <AssetMeta>Registered: {formatTimestamp(asset.created)}</AssetMeta>
                  {selectedAsset?.address === asset.address &&
                    renderAssetDetails(asset)}
                </AssetCard>
              ))}
            </div>
          </div>
        );
      }
    }

    // No identifier: just show all registrations
    return (
      <div>
        <VerificationResult verified={true}>
          <ResultHeader verified={true}>Registered</ResultHeader>
          <div style={{ fontSize: 13, marginBottom: 8 }}>
            Found {allAssets.length} registration(s) for this URL.
          </div>
        </VerificationResult>
        {allAssets.map((asset, i) => (
          <AssetCard
            key={asset.address || i}
            onClick={() =>
              setSelectedAsset(
                selectedAsset?.address === asset.address ? null : asset
              )
            }
          >
            <AssetTitle>{asset.title || 'Untitled'}</AssetTitle>
            <AssetMeta>Owner: {asset.owner}</AssetMeta>
            <AssetMeta>
              {asset.author && `Author: ${asset.author} | `}
              Registered: {formatTimestamp(asset.created)}
            </AssetMeta>
            {selectedAsset?.address === asset.address &&
              renderAssetDetails(asset)}
          </AssetCard>
        ))}
      </div>
    );
  };

  return (
    <PageLayout>
      <SingleColRow>
        <SearchForm>
          <FieldSet legend="Verify Content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <UrlField
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter URL to verify (e.g. https://example.com/article)"
              />
              <SmallField
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Genesis ID or namespace (optional)"
              />
              <Button
                onClick={handleVerify}
                disabled={searching}
                style={{ alignSelf: 'flex-start' }}
              >
                {searching ? 'Searching...' : 'Verify'}
              </Button>
            </div>
          </FieldSet>
        </SearchForm>
      </SingleColRow>

      <SingleColRow>{renderResults()}</SingleColRow>
    </PageLayout>
  );
}
