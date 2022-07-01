import React from "react";
import { Container } from "@mui/material";
import Home from "./components/Home/Home";
import Navbar from "./components/navbar/Navbar";
import Auth from "./components/Auth/Auth";
import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

function App() {
  return (
    <Container maxWidth="lg">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
