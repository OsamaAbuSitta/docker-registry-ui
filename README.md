# Docker Registry UI

A minimal project providing a web-based interface for browsing a private Docker registry.

## Project Structure

- `src/backend` - ASP.NET Core Web API that communicates with a Docker registry.
- `src/frontend` - React + TypeScript single page application.

## Development

1. Start the backend API (requires .NET 8 SDK):

```bash
cd src/backend
DOTNET_ENVIRONMENT=Development dotnet run
```

2. Start the frontend dev server (requires Node.js):

```bash
cd src/frontend
npm install
npm start
```

The frontend is configured to proxy `/api` requests to the backend.
