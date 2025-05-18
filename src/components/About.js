import { Typography, Box } from '@mui/material';

export default function About() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>About</Typography>
      <Typography variant="body1">
        This blog app is a simple fullstack project built with React, Express, and MongoDB to manage and share posts.
      </Typography>
    </Box>
  );
}
