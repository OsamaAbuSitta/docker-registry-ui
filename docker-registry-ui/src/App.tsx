import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  ThemeProvider,
  Grid,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';
import RepositoryList from './components/RepositoryList';
import RepositoryDetails from './components/RepositoryDetails';
import ErrorBoundary from './components/ErrorBoundary';
import { Repository } from './services/registryApi';
import { theme } from './theme/theme';

function App() {
  const [selectedRepository, setSelectedRepository] = useState<Repository | null>(
    null
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Docker Registry UI
            </Typography>
            <Tooltip title="View on GitHub">
              <IconButton
                color="inherit"
                href="https://github.com/yourusername/docker-registry-ui"
                target="_blank"
                rel="noopener noreferrer"
                size="large"
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <Container
          maxWidth="lg"
          sx={{
            flex: 1,
            py: 3,
            px: { xs: 2, sm: 3 },
            backgroundColor: 'background.default',
          }}
        >
          <ErrorBoundary>
            <Grid container spacing={3}>
              <Grid
                component="div"
                item
                xs={12}
                md={selectedRepository ? 6 : 12}
                sx={{
                  transition: 'all 0.3s ease',
                }}
              >
                <RepositoryList
                  onSelectRepository={(repo) => setSelectedRepository(repo)}
                />
              </Grid>
              {selectedRepository && (
                <Grid
                  component="div"
                  item
                  xs={12}
                  md={6}
                  sx={{
                    transition: 'all 0.3s ease',
                  }}
                >
                  <RepositoryDetails
                    repository={selectedRepository}
                    onImageDeleted={() => setSelectedRepository(null)}
                  />
                </Grid>
              )}
            </Grid>
          </ErrorBoundary>
        </Container>

        <Box
          component="footer"
          sx={{
            py: 2,
            px: 2,
            mt: 'auto',
            backgroundColor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
          >
            Docker Registry UI - Manage your container images with ease
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
