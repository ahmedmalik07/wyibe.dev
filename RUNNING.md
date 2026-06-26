# wyibe.dev — How to Run

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)

## Install Dependencies

Run this once after cloning the repo:

```bash
npm install
```

## Development Server

Start the local dev server with hot reload:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.  
Also accessible on your local network at the IP shown in the terminal output.

## Production Build

Build the optimized production bundle:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

## Lint

Check for code issues:

```bash
npm run lint
```

## Tech Stack

- [Next.js 16](https://nextjs.org/) with Turbopack
- React 19
- Tailwind CSS v4
- TypeScript
