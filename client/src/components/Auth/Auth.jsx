import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { auth, signin, signup } from "../../redux/feature/postSlice";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./input";
import "./styles.css";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import Icon from "./icon";
import { useNavigate } from "react-router-dom";

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "635604098076-np5c9p54svip86b2sj31mmsvae90p3kp.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (response) => {
    const result = response?.profileObj;
    const token = response?.tokenId;
    try {
      dispatch(auth({ data: { result, token } }));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const onFailure = (response) => {
    console.log("FAILED", response);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      isSignup &&
      formData.password &&
      formData.password !== formData.confirmPassword
    ) {
      alert("PASSWORD UNMATCHED");
      return;
    }
    if (isSignup) {
      dispatch(signup({ formData, navigate }));
    } else {
      dispatch(signin({ formData, navigate }));
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  function handleShowPassword() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }
  function switchMode() {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    console.log(formData);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className="paper" elevation={3}>
        <Avatar className="avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className="form">
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name={"firstName"}
                  label={"First Name"}
                  handleChange={handleChange}
                  value={formData.firstName}
                  autoFocus
                  xs={6}
                />
                <Input
                  name={"lastName"}
                  label={"Last Name"}
                  handleChange={handleChange}
                  value={formData.lastName}
                  autoFocus
                  xs={6}
                />
              </>
            )}
            <Input
              name={"email"}
              label={"Email address"}
              value={formData.email}
              handleChange={handleChange}
              type={"email"}
            />
            <Input
              name={"password"}
              label={"Password"}
              value={formData.password}
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name={"confirmPassword"}
                label={"Confirm Password"}
                value={formData.confirmPassword}
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="submit"
            onClick={handleSubmit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="635604098076-np5c9p54svip86b2sj31mmsvae90p3kp.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className="googleButton"
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? "Already have an account? Sign In" : "New User"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
