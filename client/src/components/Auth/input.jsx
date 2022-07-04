import React from "react";
import { TextField, Grid, IconButton } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Input({ name, half, handleChange, label, handleShowPassword, type }) {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        type={type}
        InputProps={
          name === "password"?{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {type === "password" ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }:null
        }
      />
    </Grid>
  );
}

export default Input;
