import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import places from "../../images/places.png";
import "./styles.css";
import { logout } from "../../redux/feature/postSlice";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  function onLogout() {
    dispatch(logout({ navigate, dispatch }));
    setUser(null);
  }
  useEffect(() => {
    const token = user?.token;
    // JWT ...
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) onLogout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar
      position="static"
      color="inherit"
      className="appBar"
    >
      <div
        className="brandContainer"
        onClick={() => {
          navigate("/");
        }}
      >
        <Typography variant="h3" align="center" className="heading">
          Places
        </Typography>
        <img src={places} alt="places" height="60" className="image" />
      </div>
      <Toolbar className="toolbar">
        {user ? (
          <div className="profile">
            <Avatar
              className="purple"
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className="userName" variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              className="logout"
              onClick={onLogout}
            >
              Log out
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              navigate("/auth");
            }}
            variant="contained"
            color="primary"
          >
            Log in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
