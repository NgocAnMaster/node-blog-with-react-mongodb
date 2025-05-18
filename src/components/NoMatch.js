import { Typography, Box } from '@mui/material';

export default function NoMatch() {
  return (
    <Box textAlign="center">
      <Typography variant="h3" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you're looking for doesn't exist. Please check the URL or return to the homepage.
      </Typography>
    </Box>
  );
}
