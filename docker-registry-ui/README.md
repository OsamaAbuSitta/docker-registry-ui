# Docker Registry UI

A modern, responsive web interface for managing Docker Registry v2. Built with React, TypeScript, and Material-UI.

## Features

- 📦 List all repositories in your Docker Registry
- 🏷️ View all tags for each repository
- 🔍 Detailed information for each image including:
  - Architecture and OS
  - Creation date
  - Number of layers
- 🗑️ Delete repositories and tags
- 💅 Modern and responsive Material-UI design

## Prerequisites

- Node.js (version 17.x or later)
- npm (version 8.x or later)
- A running Docker Registry v2 instance

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/docker-registry-ui.git
   cd docker-registry-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment:
   - Copy `.env` to `.env.local`
   - Update `REACT_APP_REGISTRY_API_URL` to point to your Docker Registry API

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `build/` folder.

## Docker Registry Configuration

Make sure your Docker Registry has CORS enabled and is accessible from the UI application. Add the following to your Registry configuration:

```yaml
version: 0.1
http:
  addr: :5000
  headers:
    X-Content-Type-Options: [nosniff]
    Access-Control-Allow-Origin: ['*']
    Access-Control-Allow-Methods: ['HEAD', 'GET', 'OPTIONS', 'DELETE']
    Access-Control-Allow-Headers: ['Authorization', 'Accept']
    Access-Control-Expose-Headers: ['Docker-Content-Digest']
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
