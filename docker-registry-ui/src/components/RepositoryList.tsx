import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Paper,
  Tooltip,
  Alert,
} from '@mui/material';
import { Delete as DeleteIcon, Info as InfoIcon } from '@mui/icons-material';
import registryApi, { Repository } from '../services/registryApi';
import LoadingState from './LoadingState';

interface RepositoryListProps {
  onSelectRepository: (repository: Repository) => void;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ onSelectRepository }) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRepositories();
  }, []);

  const loadRepositories = async () => {
    try {
      setLoading(true);
      setError(null);
      const repos = await registryApi.listRepositories();
      setRepositories(repos);
    } catch (err) {
      setError('Failed to load repositories. Please check your Docker Registry connection.');
      console.error('Error loading repositories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (repository: Repository, event: React.MouseEvent) => {
    event.stopPropagation();
    if (window.confirm(`Delete repository ${repository.name}? This action cannot be undone.`)) {
      try {
        setLoading(true);
        await Promise.all(
          repository.tags.map((tag) =>
            registryApi.deleteImage(repository.name, tag)
          )
        );
        await loadRepositories();
      } catch (err) {
        setError('Failed to delete repository. Please try again.');
        console.error('Error deleting repository:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <LoadingState message="Loading repositories..." />;
  }

  return (
    <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      {repositories.length === 0 && !error ? (
        <Typography variant="body1" sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
          No repositories found. Push some images to your registry to get started.
        </Typography>
      ) : (
        <List>
          {repositories.map((repo) => (
            <ListItem
              key={repo.name}
              button
              onClick={() => onSelectRepository(repo)}
              sx={{
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemText
                primary={repo.name}
                secondary={`${repo.tags.length} ${repo.tags.length === 1 ? 'tag' : 'tags'}`}
              />
              <ListItemSecondaryAction>
                <Tooltip title="View Details">
                  <IconButton
                    edge="end"
                    aria-label="info"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRepository(repo);
                    }}
                    size="large"
                  >
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Repository">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(e) => handleDelete(repo, e)}
                    size="large"
                    sx={{ color: 'error.main' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default RepositoryList;