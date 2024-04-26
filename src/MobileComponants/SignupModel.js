import React, { useState } from 'react';
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const SignupModel = ({ open, toggleModal }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUpError, setSignUpError] = useState(null);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const userData = {
      fullName,
      email,
      username,
      password
    };

    try {
      console.log(userData)
      const response = await axios.post(`${process.env.REACT_APP_API_URL_Properties}/Signup`, userData);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setSignUpError(null);
      toggleModal();
    } catch (error) {
      setSignUpError(error.response.data.message);
      console.log(error)
    }
  };

  return (
        <Dialog open={open} onClose={toggleModal} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create myASPC account</DialogTitle>
          <DialogContent>
            <DialogContentText >
              <label>To sign up, please enter your email address here.</label>
              <p style={{ color: 'red' }}>{signUpError}</p>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="Email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="UserName"
              label="User Name"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="Password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSignUp} color="primary">
              Sign Up
            </Button>
          </DialogActions>
        </Dialog>
  )
}

export default SignupModel;
