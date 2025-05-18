import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    TextField,
    Button,
    Box,
    Typography,
    CircularProgress,
} from "@mui/material";

function EditPost({ loggedIn }) {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!loggedIn) return;

        fetch(`http://localhost:8080/api/post/${slug}`)
            .then((res) => {
                if (!res.ok) throw new Error("Post not found");
                return res.json();
            })
            .then((data) => setPost(data))
            .catch((err) => {
                console.error(err);
                navigate("/posts");
            })
            .finally(() => setLoading(false));
    }, [slug, loggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:8080/api/post/${slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: post.title,
                    description: post.description,
                }),
            });

            if (!res.ok) throw new Error("Failed to update post");

            navigate(`/posts/${slug}`);
        } catch (err) {
            console.error(err);
            alert("Error updating the post.");
        }
    };

    if (!loggedIn) {
        navigate("/login");
        return null;
    }

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!post) {
        return <Typography>Post not found.</Typography>;
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ maxWidth: 600, mx: "auto", mt: 4 }}
        >
            <Typography variant="h5" gutterBottom>
                Edit Post
            </Typography>
            <TextField
                label="Title"
                fullWidth
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                sx={{ mb: 2 }}
            />
            <TextField
                label="Description"
                fullWidth
                multiline
                minRows={4}
                value={post.description}
                onChange={(e) => setPost({ ...post, description: e.target.value })}
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained">
                Save
            </Button>
        </Box>
    );
}

export default EditPost;
