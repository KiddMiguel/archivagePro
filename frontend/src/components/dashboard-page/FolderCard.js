import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ButtonBase,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const FolderCard = ({
  icon,
  title,
  onOpen,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

return (
    <Card
        sx={{
            display: "flex",
            alignItems: "center",
            padding: 0,
            borderRadius: 2,
            backgroundColor: "#e3f2fd",
            border: "0.3px solid rgba(0, 0, 0, 0.12)",
            boxShadow: "none",
        }}
    >
        <CardContent
            sx={{
                padding: 1,
                display: "flex",
                alignItems: "center",
                width: "100%",
            }}
        >
            <ButtonBase
                onClick={onOpen}
                sx={{
                    width: 35,
                    height: 35,
                    borderRadius: 2,
                }}
            >
                <Avatar
                    sx={{
                        width: 35,
                        height: 35,
                        backgroundColor: "white",
                        color: "#1976d2",
                        fontSize: 20,
                    }}
                >
                    {icon}
                </Avatar>
            </ButtonBase>

            <Typography
                variant="body1"
                sx={{
                    ml: 2,
                    fontWeight: "500",
                    fontSize: {xs : "12px", md : "12px", lg : "12px"},
                    color: "black",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: {xs : "11ch" , md : "11ch", lg : "15ch"},
                }}
            >
                {title}
            </Typography>

            <IconButton
                aria-controls="folder-menu"
                aria-haspopup="true"
                onClick={(e) => {
                    e.stopPropagation(); // Stop click event from triggering the card's onClick
                    handleClick(e);
                }}
                sx={{ ml: 1 }}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="folder-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Ouvrir</MenuItem>
                <MenuItem onClick={handleClose}>Modifier</MenuItem>
                <MenuItem onClick={handleClose}>Supprimer</MenuItem>
            </Menu>
        </CardContent>
    </Card>
);
};

export default FolderCard;
