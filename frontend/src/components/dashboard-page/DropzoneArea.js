import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const DropzoneArea = ({ onDrop, label, iconSize = 48, borderColor = '#ccc', activeBgColor = '#f0f8ff', textColor = '#1976d2' }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles); // Transmet les fichiers au Dashboard
    }
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: `2px dashed ${borderColor}`,
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: isDragActive ? activeBgColor : 'inherit',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer'
      }}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon sx={{ fontSize: iconSize, color: borderColor }} />
      <Typography variant="body1" sx={{ mt: 2, color : "#6c757d", fontSize : "0.8rem"}}>
        {label} <span style={{ color: textColor, cursor: 'pointer' }}>Parcourir</span>
      </Typography>
    </Box>
  );
};

export default DropzoneArea;
