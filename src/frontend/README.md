# Docker Registry UI Frontend

This is a minimal React + TypeScript frontend for browsing a Docker registry.

## Development

Install dependencies and start the dev server:

```bash
npm install
npm start
```

The dev server proxies API requests to `http://localhost:5000`.

The UI lets you select a repository, view its tags and inspect the manifest for a tag.
