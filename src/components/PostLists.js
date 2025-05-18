import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card, CardContent, Typography, Grid,
  CircularProgress, Alert, IconButton, Menu, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function PostLists({ loggedIn }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error:", error);
        setError("Could not load posts.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleMenuOpen = (event, slug) => {
    setMenuAnchor(event.currentTarget);
    setSelectedSlug(slug);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedSlug(null);
  };

  const handleEdit = () => {
    navigate(`/posts/${selectedSlug}/edit`);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setConfirmOpen(true);
    handleMenuClose();
  };

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:8080/api/post/${selectedSlug}`, { method: 'DELETE' });
      setData(data.filter(post => post.slug !== selectedSlug));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
    setConfirmOpen(false);
  };

  if (loading) return <CircularProgress sx={{ m: 5 }} />;
  if (error) return <Alert severity="error" sx={{ m: 5 }}>{error}</Alert>;

  return (
    <>
      <Grid container spacing={2} sx={{ p: 2 }}>
        {data.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.slug}>
            <Card sx={{ position: 'relative' }}>
              <CardContent component={Link} to={`/posts/${post.slug}`} sx={{ textDecoration: 'none' }}>
                <Typography variant="h6" gutterBottom>{post.title}</Typography>
                <Typography variant="body2">{post.description}</Typography>
              </CardContent>

              {loggedIn && (
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, post.slug)}
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                  <MoreVertIcon />
                </IconButton>
              )}
            </Card>
          </Grid>
        ))}

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        </Menu>
      </Grid>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
