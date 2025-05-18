import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

export default function Login({ onLogin }) {
  const [creds, setCreds] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(creds),
      });
      if (response.ok) {
        onLogin && onLogin({ username: creds.username });
        navigate('/stats');
      } else {
        setError("Invalid username or password!");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed!");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        onChange={(e) => setCreds({ ...creds, username: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        onChange={(e) => setCreds({ ...creds, password: e.target.value })}
      />
      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
      <Button fullWidth variant="contained" onClick={handleLogin}>Login</Button>
    </Box>
  );
}
