# Content verification module

A blockchain-powered application for verifying content authenticity and provenance on the Nexus blockchain.

## Overview

Content Verification allows users to check whether specific content (articles, documents, media, etc.) has been registered and verified by creators on the Nexus blockchain. By searching for a URL, users can instantly confirm if content is authentic and see detailed metadata about its registration.

## Features

- **URL-based Verification**: Search for any URL to check if it's registered on the blockchain
- **Instant Authentication**: Real-time verification against the Nexus blockchain
- **Creator Information**: Display creator details including genesis address and username
- **Registration Details**: View registration and modification timestamps
- **Asset Metadata**: See all additional metadata attached to the content asset
- **No Wallet Required**: Read-only operation—no authentication or wallet connection needed
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## How It Works

### Verification Process

1. User enters a URL in the search form
2. App queries the Nexus blockchain for registered content assets
3. Searches for assets with `distordia: "content"` attribute matching the provided URL
4. Displays verification results with creator and registration details
5. Shows full asset metadata if content is verified

### Asset Standard

Content assets follow this structure:

```json
{
    "distordia-type": "content",
    "url": "https://example.com/article",
    "Title": "Article Title",
    "Author": "Author Name",
    "Description": "Article description",
    "Date": "Publication date",
    // ... additional metadata
}
```

### How to install module

1. Download and install the [latest version of Nexus Wallet](https://github.com/Nexusoft/NexusInterface/releases/latest) if you haven't.
2. Go to latest verified release of the module (currently not verified)
3. Download zip folder "verificationModule@0.1.0.zip" (currently not released)
4. Go to the Nexus Wallet -> Settings -> Modules
5. Import "verificationModule@0.1.0.zip" in the "Add module" box
6. Click "Install module" in pop-up.

### How to install unverified beta- or official releases of this module (not yet verified by Nexus DAO dev team)

1. Download and install the [latest version of Nexus Wallet](https://github.com/Nexusoft/NexusInterface/releases/latest) if you haven't.
2. Download [this module's zip file](https://github.com/AkstonCap/verificationModule/releases/latest).
3. Unzip the files into your local repository.
4. Open the terminal and redirect to inside the unzipped folder.
5. Run
   "npm install"
   and then
   "npm run build"
7. Open Nexus Wallet, go to Settings/Modules, drag and drop the unzipped folder into the "Add module" section and click "Install module" when prompted (requires that your wallet is in "Developer mode").
8. After the wallet refreshes, an item for this template module will be added into the bottom navigation bar. Click on it to open the module.

