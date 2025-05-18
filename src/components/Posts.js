import { Typography, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function Posts() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Blog</Typography>
      <Outlet />
    </Box>
  );
}
