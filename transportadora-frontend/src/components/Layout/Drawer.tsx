// src/components/Layout/Drawer.tsx

import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Dashboard, People, LocalShipping } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function DrawerComponent() {
  const navigate = useNavigate();

  const drawerWidth = 240;

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Clientes', icon: <People />, path: '/clientes' },
    { text: 'Contatos', icon: <People />, path: '/contatos' },
    { text: 'Pedidos', icon: <LocalShipping />, path: '/pedidos' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItemButton key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
