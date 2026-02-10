import { secureApiCall, showSuccessDialog, showErrorDialog } from 'nexus-module';

// Build the JSON field array per the Distordia content standard v1.0.0
function buildContentFields(data) {
  const fields = [
    { name: 'distordia-type', type: 'string', value: 'content', mutable: false },
    { name: 'status', type: 'string', value: data.status || 'official', mutable: true, maxlength: 16 },
    { name: 'url', type: 'string', value: data.url, mutable: false, maxlength: 256 },
    { name: 'title', type: 'string', value: data.title, mutable: false, maxlength: 128 },
  ];

  if (data.author) {
    fields.push({ name: 'author', type: 'string', value: data.author, mutable: false, maxlength: 64 });
  }
  if (data.publisher) {
    fields.push({ name: 'publisher', type: 'string', value: data.publisher, mutable: false, maxlength: 64 });
  }
  if (data.published) {
    fields.push({ name: 'published', type: 'string', value: data.published, mutable: false, maxlength: 10 });
  }
  if (data.hash) {
    fields.push({ name: 'hash', type: 'string', value: data.hash, mutable: false, maxlength: 72 });
  }
  if (data.contentType) {
    fields.push({ name: 'content-type', type: 'string', value: data.contentType, mutable: false, maxlength: 16 });
  }
  if (data.lang) {
    fields.push({ name: 'lang', type: 'string', value: data.lang, mutable: false, maxlength: 2 });
  }
  if (data.license) {
    fields.push({ name: 'license', type: 'string', value: data.license, mutable: false, maxlength: 32 });
  }
  if (data.keywords) {
    fields.push({ name: 'keywords', type: 'string', value: data.keywords, mutable: false, maxlength: 128 });
  }
  if (data.supersedes) {
    fields.push({ name: 'supersedes', type: 'string', value: data.supersedes, mutable: false, maxlength: 64 });
  }

  return fields;
}

// Generate a short hash prefix from the URL for the asset name
function hashPrefix(url) {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).substring(0, 8);
}

export const createContentAsset = async (data) => {
  // Validate required fields per content standard
  if (!data.url || !data.title) {
    showErrorDialog({
      message: 'Missing required fields',
      note: 'URL and Title are required to register content.',
    });
    return null;
  }

  try {
    const fields = buildContentFields(data);
    const assetName = `content-${hashPrefix(data.url)}`;

    const result = await secureApiCall('assets/create/asset', {
      format: 'JSON',
      name: assetName,
      json: JSON.stringify(fields),
    });

    showSuccessDialog({
      message: 'Content Registered',
      note: `Asset created at: ${result.address}`,
    });

    return result;
  } catch (error) {
    showErrorDialog({
      message: 'Failed to register content',
      note: error?.message || 'Unknown error',
    });
    throw error;
  }
};
