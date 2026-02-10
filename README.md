# Content Verification Module

An onchain content verification module for the [Nexus blockchain](https://nexus.io). Register content as assets using the [Distordia Content Standard](docs/content-standard.json) and verify URL authenticity against creator identity (genesis ID or namespace).

## Overview

Content creators can register their published content (articles, videos, images, audio, documents) as blockchain assets on Nexus. Anyone can then verify whether a URL was registered by the expected creator, protecting against impersonation and fake content.

This module runs as a [Nexus Wallet Module](https://github.com/Nexusoft/NexusInterface) and can also be used via [distordia.com/content-verification](https://distordia.com/content-verification).

## Features

- **URL Verification**: Enter any URL to check if it is registered on the Nexus blockchain
- **Creator Verification**: Optionally provide a genesis ID or namespace to confirm the URL was registered by a specific creator
- **Content Registration**: Logged-in users can register their content as onchain assets following the Distordia content standard
- **My Assets**: View and manage all content assets you have registered
- **No Wallet Required for Verification**: Read-only verification works without logging in
- **Distordia Content Standard v1.0.0**: Assets follow a defined schema with fields for URL, title, author, publisher, content type, hash, and more

## How It Works

### Verification (no login required)

1. Open the **Verify** tab
2. Enter the URL you want to verify
3. Optionally enter a genesis ID or namespace to check against a specific creator
4. Click **Verify** -- the module queries the Nexus blockchain for content assets matching the URL
5. Results show whether the URL is registered, by whom, and with what metadata
6. If a creator identifier is provided, the module confirms whether the registration matches

### Registration (login required)

1. Open the **Register** tab (requires Nexus Wallet login)
2. Fill in the content details: URL (required), title (required), and optional fields (author, publisher, date, content type, hash, language, license, keywords)
3. Click **Register Content** -- the module creates a JSON-format asset on the Nexus blockchain following the Distordia content standard
4. The asset is permanently recorded onchain, tied to your genesis ID

### Asset Standard

Content assets are created using the Nexus `assets/create/asset` API with `format=JSON`. Fields follow the [Distordia Content Verification Standard v1.0.0](docs/content-standard.json):

```json
{
    "distordia-type": "content",
    "status": "official",
    "url": "https://example.com/news/article-12345",
    "title": "Breaking: Major Discovery in Climate Research",
    "author": "Jane Smith",
    "publisher": "Example News",
    "published": "2026-01-15",
    "hash": "sha256:a1b2c3d4e5f6...",
    "content-type": "article",
    "lang": "en",
    "license": "CC-BY-4.0",
    "keywords": "climate,research,science"
}
```

Required fields: `distordia-type`, `url`, `title`. All other fields are optional.

## Installation

### From verified release

1. Download and install the [latest Nexus Wallet](https://github.com/Nexusoft/NexusInterface/releases/latest).
2. Download the module zip from the latest verified release.
3. In Nexus Wallet, go to Settings > Modules.
4. Import the zip file in the "Add module" section and click "Install module".

### From source (development)

1. Download and install the [latest Nexus Wallet](https://github.com/Nexusoft/NexusInterface/releases/latest).
2. Clone or download this repository.
3. Run `npm install` then `npm run build` in the project directory.
4. In Nexus Wallet (Developer mode), go to Settings > Modules, drag and drop the project folder into "Add module" and click "Install module".
5. The module will appear in the bottom navigation bar.

## Development

```bash
npm install
npm run dev     # Start dev server on port 24011
npm run build   # Production build to dist/
```

## API Endpoints Used

| Operation | Endpoint | Auth |
|-----------|----------|------|
| Verify content by URL | `register/list/assets:asset` with WHERE clause | None |
| Register content | `assets/create/asset` (JSON format) | PIN required |
| List my assets | `assets/list/asset` with WHERE clause | Session required |
| Get asset details | `register/get/assets:asset` | None |
