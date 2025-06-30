export const CONFIG = {
  API: {
    BASE_URL: process.env.REACT_APP_REGISTRY_API_URL || 'http://localhost:5000/v2',
    HEADERS: {
      ACCEPT: {
        MANIFEST_V2: 'application/vnd.docker.distribution.manifest.v2+json',
      },
    },
  },
  UI: {
    TRANSITIONS: {
      DURATION: '0.3s',
    },
    MESSAGES: {
      ERRORS: {
        LOAD_REPOSITORIES: 'Failed to load repositories. Please check your Docker Registry connection.',
        LOAD_TAGS: 'Failed to load image details. Please try again.',
        DELETE_REPOSITORY: 'Failed to delete repository. Please try again.',
        DELETE_TAG: 'Failed to delete tag. Please try again.',
      },
      CONFIRMATIONS: {
        DELETE_REPOSITORY: (name: string) =>
          `Delete repository ${name}? This action cannot be undone.`,
        DELETE_TAG: (tag: string) =>
          `Delete tag ${tag}? This action cannot be undone.`,
      },
      EMPTY_STATES: {
        NO_REPOSITORIES: 'No repositories found. Push some images to your registry to get started.',
        NO_TAGS: 'No tags found in this repository.',
      },
    },
  },
  GITHUB: {
    REPO_URL: 'https://github.com/yourusername/docker-registry-ui',
  },
} as const;