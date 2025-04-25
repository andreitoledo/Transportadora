import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
  } from '@mui/material';
  import DashboardIcon from '@mui/icons-material/Dashboard';
  import { useNavigate } from 'react-router-dom';
  
  const drawerWidth = 240;
  
  export const DrawerComponent = () => {
    const navigate = useNavigate();
  
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <List>
          <ListItem button onClick={() => navigate('/')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
      </Drawer>
    );
  };
  