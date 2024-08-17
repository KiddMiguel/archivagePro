import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import GradeIcon from "@mui/icons-material/Grade";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import DropzoneArea from "./DropzoneArea";

const drawerWidth = 240;

export default function LeftBar({ open }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleDrop = (acceptedFiles) => {
    console.log("Files dropped:", acceptedFiles);
  };

  const listItemStyle = (selectedIndex, currentIndex) => ({
    color: selectedIndex === currentIndex ? "#1976d2" : "#6c757d",
    paddingTop: "1px",
    backgroundColor: "inherit",
    "&.Mui-selected": {
      backgroundColor: "inherit",
      "&:hover": {
        backgroundColor: "inherit",
      },
    },
    "&:hover": {
      backgroundColor: "inherit",
    },
  });
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
      variant="permanent"
      anchor="left"
      open={open}
    >
      <Box>
        <Toolbar>
          <Typography variant="h3">ArchiDrive</Typography>
        </Toolbar>
        <Divider />
        <List>
          <ListItem
            button
            key="Dashboard"
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
            sx={listItemStyle(selectedIndex, 0)}
          >
            <ListItemIcon>
              <DashboardIcon
                sx={{
                  fontSize: 22,
                  color: selectedIndex === 0 ? "#1976d2" : "inherit",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              primaryTypographyProps={{
                fontWeight: selectedIndex === 0 ? "500" : "regular",
              }}
            />
          </ListItem>

          <ListItem
            button
            key="Favoris"
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
            sx={listItemStyle(selectedIndex, 1)}
          >
            <ListItemIcon>
              <GradeIcon
                sx={{
                  fontSize: 22,
                  color: selectedIndex === 1 ? "#1976d2" : "inherit",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Favoris"
              primaryTypographyProps={{
                fontWeight: selectedIndex === 1 ? "500" : "regular",
              }}
            />
          </ListItem>

          <ListItem
            button
            key="Corbeille"
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
            sx={listItemStyle(selectedIndex, 2)}
          >
            <ListItemIcon>
              <DeleteSweepIcon
                sx={{
                  fontSize: 22,
                  color: selectedIndex === 2 ? "#1976d2" : "inherit",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Corbeille"
              primaryTypographyProps={{
                fontWeight: selectedIndex === 2 ? "500" : "regular",
              }}
            />
          </ListItem>
        </List>
      </Box>

      <Box sx={{ mb: 2 }}>
        <List>
          <Box
            sx={{
              padding: "16px",
              width: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <DropzoneArea
              onDrop={handleDrop}
              label="Glisser des fichiers, ou"
              iconSize={48}
              borderColor="#ccc"
              activeBgColor="#f0f8ff"
              textColor="#1976d2"
            />
          </Box>
          <Divider
            sx={{
              mb: 2,
              mt: 2,
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <ListItem
            button
            key="Paramètres"
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
            sx={listItemStyle(selectedIndex, 3)}
          >
            <ListItemIcon>
              <SettingsIcon
                sx={{
                  fontSize: 22,
                  color: selectedIndex === 3 ? "#1976d2" : "inherit",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Paramètres"
              primaryTypographyProps={{
                fontWeight: selectedIndex === 3 ? "500" : "regular",
              }}
            />
          </ListItem>

          <ListItem
            button
            key="Déconnexion"
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
            sx={{ color: "#c1121f" }}
          >
            <ListItemIcon>
              <LogoutIcon
                sx={{
                  fontSize: 22,
                  color: "#c1121f",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Déconnexion" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
