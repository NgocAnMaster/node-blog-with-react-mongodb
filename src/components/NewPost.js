import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

function NewPost() {
  const [newPost, setNewPost] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/post", {
        method: "POST",
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) setNewPost("Post created successfully!");
      else setNewPost("Post creation failed!");
    } catch (error) {
      console.error("Error creating post:", error);
      setNewPost("Post creation failed!");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Add New Post</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Slug"
          fullWidth
          margin="normal"
          {...register("slug", { required: true })}
          error={!!errors.slug}
          helperText={errors.slug && "Slug is required"}
        />
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          {...register("title", { required: true })}
          error={!!errors.title}
          helperText={errors.title && "Title is required"}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          {...register("description", { required: true })}
          error={!!errors.description}
          helperText={errors.description && "Description is required"}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Submit</Button>
        {newPost && <Alert severity={newPost.includes("success") ? "success" : "error"} sx={{ mt: 2 }}>{newPost}</Alert>}
      </form>
    </Box>
  );
}

export default NewPost;
