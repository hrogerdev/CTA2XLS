# CTA to XLS - Cross The Ages NFT Exporter

Export your Cross The Ages NFTs from Immutable X to Excel format.

## Features

- 🔍 Search NFTs by Immutable X wallet address
- 📊 Display NFT metadata in a clean table
- 📥 Export to Excel (.xlsx) format
- 🔄 Automatic pagination for large collections
- 📱 Responsive design for mobile and desktop
- 🔔 Telegram notifications when an address is fetched

## Prerequisites

- Node.js 18+ and npm
- An Immutable X wallet address with Cross The Ages NFTs

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/cta-to-xls.git
cd cta-to-xls

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## Deployment on Netlify

### Option 1: Deploy with Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### Option 2: Deploy via Netlify Dashboard

1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

## Telegram Notifications

The app sends notifications to a Telegram channel when a wallet address is fetched. To configure:

1. Update the `chatId` in `src/hooks/useImxNfts.ts` with your channel ID
2. Replace the bot token if needed (currently using the provided token)

## API Information

This app uses the Immutable X API v1:
- Base URL: `https://api.x.immutable.com/v1`
- Endpoint: `/assets`
- Contract: `0xa04bcac09a3ca810796c9e3deee8fdc8c9807166` (Cross The Ages)

## Easter Eggs

To enable fake ad placeholders:
1. Open `src/components/FakeAdPlaceholder.tsx`
2. Uncomment the content inside the component
3. The ads will appear in the UI

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Excel Export**: SheetJS (xlsx)
- **Testing**: Vitest + React Testing Library
- **Deployment**: Netlify

## Project Structure

```
├── src/
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript type definitions
│   ├── test/            # Test setup and utilities
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # App entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── netlify/
│   └── functions/       # Netlify serverless functions
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── netlify.toml         # Netlify deployment configuration
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint

## License

MIT