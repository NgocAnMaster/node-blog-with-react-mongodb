import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Post({ loggedIn }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/post/" + slug);
        const result = await response.json();
        setPost(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [slug]);

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:8080/api/post/${slug}`, { method: 'DELETE' });
      navigate("/posts");
    } catch (error) {
      console.error("Delete failed:", error);
    }
    setConfirmOpen(false);
  };

  if (!post) return <Typography sx={{ p: 4 }}>Loading...</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>{post.title}</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>{post.description}</Typography>

      {loggedIn && (
        <Box>
          <Button variant="outlined" onClick={() => navigate(`/posts/${slug}/edit`)}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={() => setConfirmOpen(true)} sx={{ ml: 2 }}>
            Delete
          </Button>
        </Box>
      )}

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
    </Box>
  );
}
