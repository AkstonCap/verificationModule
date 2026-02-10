<p align="center">
  <img src="dist/verification-logo.svg" alt="Distordia Content Verification" width="80" />
</p>

<h1 align="center">Distordia Content Verification</h1>

<p align="center">
  An on-chain content verification module for the <a href="https://nexus.io">Nexus Wallet</a>.<br />
  Register, verify and track content authenticity on the Nexus blockchain.
</p>

<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-orange" />
  <img alt="Wallet" src="https://img.shields.io/badge/Nexus%20Wallet-%E2%89%A5%203.1.5-blue" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green" />
</p>

---

## Overview

Distordia Content Verification lets creators register their content (articles, media, documents) as on-chain assets following the **Distordia content standard**, and lets anyone verify the authenticity and provenance of a URL against creator identity on the Nexus blockchain.

## Features

| Feature | Description |
|---|---|
| **News Feed** | Browse registered content assets from the blockchain |
| **Namespace Feed** | View content scoped to specific Nexus namespaces *(WIP)* |
| **My Profile** | Manage your own registered content *(WIP)* |
| **Asset Creation** | Register new content as on-chain assets via the Nexus API |
| **Asset Inspection** | Click any listed asset to view full on-chain details |
| **Following** | Follow users and namespaces to track their content |

## Distordia Content Standard

Content assets are registered with structured JSON metadata:

```jsonc
[
  { "name": "distordia-type", "value": "content",   "mutable": false },
  { "name": "url",            "value": "https://…",  "mutable": false },
  { "name": "title",          "value": "My Article", "mutable": false },
  { "name": "status",         "value": "official",   "mutable": true  },
  // Optional: author, publisher, published, hash, content-type,
  //           lang, license, keywords, supersedes
]
```

## Tech Stack

- **React 18** + **Redux** — UI & state management
- **Emotion** — CSS-in-JS styling
- **Webpack 5** — bundling
- **nexus-module** — Nexus Wallet module SDK (API calls, secure transactions, theming)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 16
- [Nexus Wallet](https://github.com/Nexusoft/NexusInterface/releases/latest) ≥ 3.1.5

### Development

```bash
# Install dependencies
npm install

# Start dev server (hot-reload on localhost:24011)
npm run dev
```

Then load the module in your wallet via the development `nxs_package.dev.json`.

### Production Build

```bash
npm run build
```

The distributable output is written to `dist/`.

## Installation

### From a verified release *(coming soon)*

1. Download the latest `.zip` from the [Releases](https://github.com/AkstonCap/verificationModule/releases/latest) page.
2. Open Nexus Wallet → **Settings → Modules**.
3. Drag & drop the `.zip` into **Add module** and click **Install module**.

### From source (developer mode)

1. Clone the repository and run `npm install && npm run build`.
2. Open Nexus Wallet in **Developer mode** → **Settings → Modules**.
3. Drag & drop the project folder into **Add module** and click **Install module**.
4. The module will appear in the bottom navigation bar.

## Project Structure

```
src/
├── index.js                 # Entry point (React 18 createRoot)
├── configureStore.js        # Redux store setup
├── App/
│   ├── index.js             # App root (ModuleWrapper + theme)
│   ├── Main.js              # Tab layout & panel chrome
│   ├── news.js              # News feed tab
│   ├── namespace.js          # Namespace feed tab (WIP)
│   └── profile.js            # Profile tab (WIP)
├── actions/
│   ├── actionCreators.js    # Redux action creators
│   ├── types.js             # Action type constants
│   ├── createAsset.js       # Asset registration via secureApiCall
│   └── fetchAssets.js       # Namespace-scoped asset fetching
├── components/
│   ├── Logo.js              # Inline SVG brand logo
│   └── styles.js            # Shared styled components
└── reducers/
    ├── ui/                  # Active tab, search input
    └── settings/            # Following list, namespaces
```

## Roadmap

- [ ] Full content verification flow (URL → on-chain lookup → result display)
- [ ] Namespace feed implementation
- [ ] Profile page with user's own assets
- [ ] Content hash verification (SHA-256 / BLAKE2b)
- [ ] Nexus DAO module verification

## License

[MIT](LICENSE) © AkstonCap

