import React from "react";
import {
  Toolbar,
  IconButton,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";

export default function Header({ user }) {
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
      <Box sx={{ display: "flex", alignItems: "center", width: "30%" }}>
        <TextField
          variant="outlined"
          placeholder="Recherche de fichiers..."
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderRadius: "10px",
              height: "35px",
              fontSize: "14px",
            },
          }}
        />
      </Box>

      <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography sx={{ fontSize: "14px" }} variant="h6">
            {user.firstName + " " + user.lastName}
          </Typography>
          <Avatar
            alt={`${user.firstName} ${user.lastName}`}
            src="/path/to/avatar.jpg"
          />
        </Box>
      </Link>
    </Toolbar>
  );
}
