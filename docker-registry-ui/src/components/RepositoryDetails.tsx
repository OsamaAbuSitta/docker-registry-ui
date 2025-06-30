import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Box,
  Tooltip,
  Alert,
  Divider,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import registryApi, { Repository, ImageDetails } from '../services/registryApi';
import LoadingState from './LoadingState';

interface RepositoryDetailsProps {
  repository: Repository;
  onImageDeleted: () => void;
}

interface TagDetails extends ImageDetails {
  tag: string;
}

const RepositoryDetails: React.FC<RepositoryDetailsProps> = ({
  repository,
  onImageDeleted,
}) => {
  const [tagDetails, setTagDetails] = useState<TagDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTagDetails();
  }, [repository]);

  const loadTagDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const details = await Promise.all(
        repository.tags.map(async (tag) => {
          const manifest = await registryApi.getImageManifest(
            repository.name,
            tag
          );
          return { ...manifest, tag };
        })
      );
      setTagDetails(details.sort((a, b) => b.tag.localeCompare(a.tag)));
    } catch (err) {
      setError('Failed to load image details. Please try again.');
      console.error('Error loading image details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTag = async (tag: string) => {
    if (window.confirm(`Delete tag ${tag}? This action cannot be undone.`)) {
      try {
        setLoading(true);
        await registryApi.deleteImage(repository.name, tag);
        onImageDeleted();
      } catch (err) {
        setError('Failed to delete tag. Please try again.');
        console.error('Error deleting tag:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <LoadingState message="Loading image details..." />;
  }

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {repository.name}
        </Typography>
        
        {error && (
          <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {tagDetails.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', py: 3 }}>
            No tags found in this repository.
          </Typography>
        ) : (
          <List>
            {tagDetails.map((details, index) => (
              <React.Fragment key={details.tag}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="subtitle1">{details.tag}</Typography>
                        <Tooltip title={`${details.architecture}/${details.os}`}>
                          <Chip
                            label={`${details.architecture}/${details.os}`}
                            size="small"
                            variant="outlined"
                          />
                        </Tooltip>
                      </Box>
                    }
                    secondary={
                      <Box component="span" sx={{ display: 'block', mt: 0.5 }}>
                        <Typography variant="body2" component="span" display="block">
                          Created: {new Date(details.created).toLocaleString()}
                        </Typography>
                        <Typography variant="body2" component="span" display="block">
                          Layers: {details.layers.length}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="Delete Tag">
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteTag(details.tag)}
                        size="large"
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < tagDetails.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default RepositoryDetails;