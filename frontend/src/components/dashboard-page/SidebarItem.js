import React, { useState } from 'react';
import { ListItem, ListItemText, List, Collapse, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const SidebarItem = ({ text, selectedIndex, currentIndex, to, subItems = [] }) => {
  const [open, setOpen] = useState(false);

  const listItemStyle = {
    color: selectedIndex === currentIndex ? '#1976d2' : '#6c757d',
    paddingTop: '0px',
    backgroundColor: 'inherit',
    '&.Mui-selected': {
      backgroundColor: 'inherit',
      '&:hover': {
        backgroundColor: 'inherit',
      },
    },
    '&:hover': {
      backgroundColor: 'inherit',
    },
  };

  const handleClick = () => {
    if (subItems.length > 0) {
      setOpen(!open);
    }
  };

  return (
    <>
      <ListItem
        button
        selected={selectedIndex === currentIndex}
        sx={listItemStyle}
        component={to ? Link : 'div'}
        to={to}
        onClick={handleClick}
      >
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            fontWeight: selectedIndex === currentIndex ? '500' : 'regular',
          }}
        />
        {subItems.length > 0 ? (open ? <ExpandLess /> : <ExpandMore />) : null}
      </ListItem>
      {subItems.length > 0 && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subItems.map((subItem) => (
              <ListItem
                key={subItem.index}
                button
                selected={selectedIndex === subItem.index}
                sx={{
                  paddingLeft: 4,
                  paddingTop: 0,
                  fontSize: '0.875rem',
                  color: selectedIndex === subItem.index ? '#1976d2' : '#6c757d',
                }}
                component={Link}
                to={subItem.to}
              >
                <ListItemText
                  primary={subItem.text}
                  primaryTypographyProps={{
                    fontWeight: selectedIndex === subItem.index ? '500' : 'regular',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default SidebarItem;
