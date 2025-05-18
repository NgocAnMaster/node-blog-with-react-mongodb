import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@mui/material';

import Home from './components/Home';
import About from './components/About';
import Posts from './components/Posts';
import PostLists from './components/PostLists';
import Post from './components/Post';
import NoMatch from './components/NoMatch';
import Stats from './components/Stats';
import Login from './components/Login';
import NewPost from './components/NewPost';
import ProtectedRoute from './components/ProtectedRoute';
import EditPost from './components/EditPost';

export default function AppLayout() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  function logOut() {
    setUser(null);
    navigate('/');
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/posts">Posts</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>

          {user && (
            <>
              <Button color="inherit" component={Link} to="/stats">Stats</Button>
              <Button color="inherit" component={Link} to="/newpost">New Post</Button>
            </>
          )}

          {!user ? (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          ) : (
            <Button color="inherit" onClick={logOut}>Logout</Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />}>
            <Route index element={<PostLists loggedIn={!!user} />} />
            <Route path=":slug" element={<Post loggedIn={!!user} />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route
            path="/stats"
            element={<ProtectedRoute user={user}><Stats /></ProtectedRoute>}
          />
          <Route
            path="/newpost"
            element={<ProtectedRoute user={user}><NewPost /></ProtectedRoute>}
          />
          <Route
            path="/posts/:slug/edit"
            element={<ProtectedRoute user={user}><EditPost loggedIn={!!user} /></ProtectedRoute>}
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Container>
    </>
  );
}
