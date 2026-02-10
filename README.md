<p align="center">
  <img src="dist/verification-logo.svg" alt="Distordia Content Verification" width="80" />
</p>

<h1 align="center">Distordia Content Verification</h1>

<p align="center">
  A Nexus Wallet module for registering and verifying content on the Nexus blockchain.<br />
  Built on the <strong>Distordia Content Standard v1.0.0</strong>.
</p>

<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-orange" />
  <img alt="Nexus Wallet" src="https://img.shields.io/badge/Nexus%20Wallet-%E2%89%A5%203.1.5-blue" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green" />
</p>

---

## What It Does

Distordia Content Verification lets **creators** register their content (articles, videos, images, documents) as permanent on-chain assets on the Nexus blockchain, and lets **anyone** verify a URL's authenticity against the creator's on-chain identity.

### Verify

Enter a URL to search the blockchain for matching content registrations. Optionally provide a **Genesis ID** or **namespace** to check whether the content was registered by a specific creator — catching potential impersonation.

- ✅ **Verified** — URL is registered and matches the given creator identity
- ⚠️ **Not Verified** — URL is registered, but by a different creator
- ❌ **Not Registered** — no on-chain record found for this URL

### Register

Log in to your Nexus Wallet and fill out a form to register new content on-chain. Required fields are **URL** and **Title**. Optional metadata includes author, publisher, publication date, content type, language, license, keywords, content hash (SHA-256), and supersedes reference.

Registration creates a named asset via the Nexus `assets/create/asset` API using `secureApiCall` (PIN-protected). Costs 1 NXS + 1 NXS for the name.

### My Assets

View all content assets you've registered on the blockchain. Click any card to expand full details including address, metadata, and timestamps.

---

## Distordia Content Standard v1.0.0

Assets are registered as JSON arrays with typed, named fields:

```jsonc
[
  { "name": "distordia-type", "value": "content",       "mutable": false },
  { "name": "url",            "value": "https://…",      "mutable": false },
  { "name": "title",          "value": "Article Title",  "mutable": false },
  { "name": "status",         "value": "official",       "mutable": true  },
  // Optional fields:
  // author, publisher, published, hash, content-type,
  // lang, license, keywords, supersedes
]
```

The `status` field is the only mutable field, allowing creators to update a content registration's status after creation. All other fields are immutable once registered.

---

## Installation

### From a release

1. Download the latest `.zip` from [Releases](https://github.com/AkstonCap/verificationModule/releases/latest).
2. Open Nexus Wallet → **Settings → Modules**.
3. Drag the `.zip` into **Add module** and click **Install module**.

### From source

```bash
git clone https://github.com/AkstonCap/verificationModule.git
cd verificationModule
npm install
npm run build
```

Then in Nexus Wallet (Developer mode) → **Settings → Modules**, drag the project folder into **Add module**.

---

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 16
- [Nexus Wallet](https://github.com/Nexusoft/NexusInterface/releases/latest) ≥ 3.1.5

### Run dev server

```bash
npm install
npm run dev
```

This starts webpack-dev-server on `localhost:24011` with hot reload. Load the module in your wallet using `nxs_package.dev.json`.

### Production build

```bash
npm run build
```

Output is written to `dist/`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 18, Emotion (CSS-in-JS) |
| State | Redux, react-redux |
| Wallet SDK | nexus-module (API calls, secure transactions, theming) |
| Build | Webpack 5, Babel |

---

## Project Structure

```
src/
├── index.js                  # Entry point (createRoot)
├── configureStore.js         # Redux store with persistence
├── App/
│   ├── index.js              # ModuleWrapper (theme + init)
│   ├── Main.js               # Panel layout, branded header, tab navigation
│   ├── VerifyContent.js      # URL verification against blockchain
│   ├── RegisterContent.js    # Content registration form
│   └── MyAssets.js           # User's registered content list
├── actions/
│   ├── actionCreators.js     # Redux action creators
│   ├── types.js              # Action type constants
│   ├── createAsset.js        # Asset creation via secureApiCall
│   └── fetchAssets.js        # Content query utilities
├── components/
│   ├── Logo.js               # Inline SVG brand logo component
│   └── styles.js             # Shared styled components
└── reducers/
    ├── ui/                   # Active tab, search input
    └── settings/             # Following list, namespaces
```

---

## License

[MIT](LICENSE) © AkstonCap

