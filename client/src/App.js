import React from "react";
import { Container } from "@mui/material";

import Home from "./components/Home/Home";
import Navbar from "./components/navbar/Navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <Container maxWidth="xl">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts"/>} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/"/>} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
