import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const SaveSearchModal = ({ isOpen, onClose, handleSaveSearch}) => {
  const [searchName, setSearchName] = useState('');

  const handleSave = () => {
    // Implement save logic here
    handleSaveSearch(searchName);
    onClose(); // Close the modal after save
  };

  const body = (
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      outline: 'none', // Removes the default focus outline
    }}>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Save Search
      </Typography>
      <TextField
        fullWidth
        label="Save Search Name"
        variant="outlined"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        sx={{ mb: 2 }}
      />
      

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="save-search-modal-title"
      aria-describedby="save-search-modal-description"
    >
      {body}
    </Modal>
  );
}

export default SaveSearchModal;
