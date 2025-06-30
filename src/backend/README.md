# Docker Registry UI Backend

Minimal ASP.NET Core API that proxies requests to a Docker registry.

## Configuration

Environment variables:

- `REGISTRY_URL` - URL to the Docker registry (default `http://localhost:5000`).
- `SINGLE_REGISTRY` - `true` to operate in single registry mode. Defaults to `true`.

## Development

Build and run:

```bash
# Ensure .NET 8 SDK is installed
dotnet restore
dotnet run
```

## Endpoints

- `GET /api/repositories` - list repositories from the registry.
- `GET /api/repositories/{name}/tags` - list tags for the given repository.
- `GET /api/repositories/{name}/tags/{tag}` - fetch manifest details for the specified tag.
