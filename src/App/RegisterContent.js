import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  FieldSet,
  Button,
  Select,
  showErrorDialog,
} from 'nexus-module';

import { createContentAsset } from '../actions/createAsset';

import {
  PageLayout,
  SingleColRow,
  RegisterForm,
  FormGroup,
  FormLabel,
  FormRow,
  StatusMessage,
  SmallField,
  UrlField,
} from '../components/styles';

const CONTENT_TYPES = [
  { value: 'article', display: 'Article' },
  { value: 'video', display: 'Video' },
  { value: 'image', display: 'Image' },
  { value: 'audio', display: 'Audio' },
  { value: 'document', display: 'Document' },
  { value: 'dataset', display: 'Dataset' },
  { value: 'other', display: 'Other' },
];

const STATUS_OPTIONS = [
  { value: 'official', display: 'Official' },
  { value: 'user', display: 'User' },
  { value: 'pending', display: 'Pending' },
];

const initialForm = {
  url: '',
  title: '',
  author: '',
  publisher: '',
  published: '',
  hash: '',
  contentType: 'article',
  status: 'official',
  lang: 'en',
  license: '',
  keywords: '',
  supersedes: '',
};

export default function RegisterContent() {
  const userStatus = useSelector((state) => state.nexus.userStatus);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  if (!userStatus) {
    return (
      <PageLayout>
        <StatusMessage>
          Please log in to the Nexus Wallet to register content.
        </StatusMessage>
      </PageLayout>
    );
  }

  const update = (field) => (e) => {
    const value = e?.target ? e.target.value : e;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.url.trim() || !form.title.trim()) {
      showErrorDialog({
        message: 'Missing required fields',
        note: 'URL and Title are required.',
      });
      return;
    }

    if (submitting) return;
    setSubmitting(true);

    try {
      const result = await createContentAsset({
        ...form,
        url: form.url.trim(),
        title: form.title.trim(),
        author: form.author.trim(),
        publisher: form.publisher.trim(),
        published: form.published.trim(),
        hash: form.hash.trim(),
        contentType: form.contentType,
        status: form.status,
        lang: form.lang.trim(),
        license: form.license.trim(),
        keywords: form.keywords.trim(),
        supersedes: form.supersedes.trim(),
      });

      if (result) {
        setForm(initialForm);
      }
    } catch (error) {
      // Error dialog already shown in createContentAsset
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <SingleColRow>
        <RegisterForm>
          <FieldSet legend="Register Content on Nexus Blockchain">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <FormGroup>
                <FormLabel>URL *</FormLabel>
                <UrlField
                  value={form.url}
                  onChange={update('url')}
                  placeholder="https://example.com/your-content"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Title *</FormLabel>
                <UrlField
                  value={form.title}
                  onChange={update('title')}
                  placeholder="Content title"
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <FormLabel>Author</FormLabel>
                  <SmallField
                    value={form.author}
                    onChange={update('author')}
                    placeholder="Author name"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Publisher</FormLabel>
                  <SmallField
                    value={form.publisher}
                    onChange={update('publisher')}
                    placeholder="Publisher name"
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <FormLabel>Published Date</FormLabel>
                  <SmallField
                    value={form.published}
                    onChange={update('published')}
                    placeholder="YYYY-MM-DD"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Language</FormLabel>
                  <SmallField
                    value={form.lang}
                    onChange={update('lang')}
                    placeholder="en"
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <FormLabel>Content Type</FormLabel>
                  <Select
                    value={form.contentType}
                    onChange={update('contentType')}
                    options={CONTENT_TYPES}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Status</FormLabel>
                  <Select
                    value={form.status}
                    onChange={update('status')}
                    options={STATUS_OPTIONS}
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <FormLabel>Content Hash (SHA-256)</FormLabel>
                <UrlField
                  value={form.hash}
                  onChange={update('hash')}
                  placeholder="sha256:abcdef1234..."
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <FormLabel>License</FormLabel>
                  <SmallField
                    value={form.license}
                    onChange={update('license')}
                    placeholder="e.g. CC-BY-4.0"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Supersedes (address)</FormLabel>
                  <SmallField
                    value={form.supersedes}
                    onChange={update('supersedes')}
                    placeholder="Previous asset address"
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <FormLabel>Keywords</FormLabel>
                <UrlField
                  value={form.keywords}
                  onChange={update('keywords')}
                  placeholder="Comma-separated keywords"
                />
              </FormGroup>

              <Button
                onClick={handleSubmit}
                disabled={submitting}
                style={{ alignSelf: 'flex-start', marginTop: 4 }}
              >
                {submitting ? 'Registering...' : 'Register Content'}
              </Button>

              <div style={{ fontSize: 11, opacity: 0.5 }}>
                Registration costs 1 NXS + 1 NXS for the name. Fields marked
                with * are required. Asset data follows the Distordia Content
                Verification Standard v1.0.0.
              </div>
            </div>
          </FieldSet>
        </RegisterForm>
      </SingleColRow>
    </PageLayout>
  );
}
