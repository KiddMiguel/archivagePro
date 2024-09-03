import React, { useState, useEffect } from "react";
import {
  Toolbar,
  IconButton,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Avatar,
  List,
  Paper,
  ClickAwayListener,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import RenderIcon from "./RenderIcon";
import { deleteFile, downloadFile, getAllFiles } from "../../services/service";

export default function Header({ user, rootFolder }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [files, setFiles] = useState([]);

  const handleFiles = async () => {
    const files = await getAllFiles(rootFolder.owner);
    let totalSizeInBytes = 0;

    // Convertir la taille des fichiers en Ko, Mo, Go et calculer la taille totale
    files && files.forEach((file) => {
      totalSizeInBytes += file.length; // Ajouter la taille de chaque fichier en octets

      // Formater la taille de chaque fichier individuellement
      let fileSize = file.length;
      let i = 0;
      const byteUnits = ['octets', 'Ko', 'Mo', 'Go', 'To', 'Po', 'Eo', 'Zo', 'Yo'];

      while (fileSize >= 1024 && i < byteUnits.length - 1) {
        fileSize /= 1024;
        i++;
      }

      file.fileSize = `${fileSize.toFixed(2)} ${byteUnits[i]}`;
    });

    setFiles(files);
  };

  const handleDownloadClick = async (fileId) => {
    setIsDownloading(true);
    await downloadFile(fileId);
    setIsDownloading(false);
  };

  const handleDeleteClick = async (fileId) => {
    setIsDeleting(true);
    await deleteFile(fileId); 
    setIsDeleting(false);
  };

  useEffect(() => {
    handleFiles();

    if (searchTerm) {
      const results = files.filter((file) =>
        file.filename.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFiles(results);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchTerm, files]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClickAway = () => {
    setShowDropdown(false);
  };

  return (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "inherit",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", width: "30%", position: "relative" }}>
        <TextField
          variant="outlined"
          placeholder="Recherche de fichiers..."
          size="small"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              borderRadius: "10px",
              height: "35px",
              fontSize: "14px",
            },
          }}
        />
        {showDropdown && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Paper
              sx={{
                position: "absolute",
                top: "40px",
                left: 0,
                right: 0,
                zIndex: 10,
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              <List>
                {filteredFiles.map((file, index) => (
                  <Box key={index} display="flex" alignItems="center" justifyContent="space-between" sx={{ fontWeight: "600", p: 1 }}>
                    <Box display="flex" alignItems="center" sx={{ fontWeight: "600", fontSize: "13px" }}>
                      <Avatar sx={{ bgcolor: "#f5f5f5", color: "#000"}}>
                        {<RenderIcon type={file.filename.split(".").slice(-1)[0]} />}
                      </Avatar>
                      {decodeURIComponent(escape(file.filename.slice(0, 30)))}
                    </Box>
                    <Box>
                      <IconButton onClick={() => handleDownloadClick(file._id)} aria-label="download">
                        {isDownloading ? (
                          <CircularProgress size={19} sx={{ color: 'grey', position: 'absolute' }} />
                        ) : (
                          <DownloadIcon sx={{ color: 'grey', fontSize: "17px" }} />
                        )}
                      </IconButton>
                      {/* <IconButton onClick={() => handleDeleteClick(file._id)} aria-label="delete">
                        {isDeleting ? (
                          <CircularProgress size={19} sx={{ color: 'grey', position: 'absolute' }} />
                        ) : (
                          <DeleteIcon sx={{ color: 'grey', fontSize: "17px" }} />
                        )}
                      </IconButton> */}
                    </Box>
                  </Box>
                ))}
              </List>
            </Paper>
          </ClickAwayListener>
        )}
      </Box>

      <Link to="/settings" style={{ textDecoration: "none", color: "inherit" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography sx={{ fontSize: "14px" }} variant="h6">
            {user.firstName + " " + user.lastName}
          </Typography>
          <Avatar
            alt={`${user?.firstName} ${user?.lastName}`}
            src="/path/to/avatar.jpg"
          />
        </Box>
      </Link>
    </Toolbar>
  );
}
