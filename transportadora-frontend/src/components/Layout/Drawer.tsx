// src/components/Layout/Drawer.tsx

import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Dashboard, People, LocalShipping, Contacts } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { grey, blue } from '@mui/material/colors';

export default function DrawerComponent() {
  const navigate = useNavigate();
  const location = useLocation();

  const drawerWidth = 240;

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Clientes', icon: <People />, path: '/clientes' },
    { text: 'Contatos', icon: <Contacts />, path: '/contatos' },
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
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={isActive}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: grey[300],
                  '&:hover': {
                    backgroundColor: grey[400],
                  },
                },
                '&:hover': {
                  backgroundColor: grey[100],
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? blue[700] : 'inherit', // Ícone azul se ativo
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  color: isActive ? blue[700] : 'inherit', // Texto azul se ativo
                  fontWeight: isActive ? 'bold' : 'normal', // Negrito se ativo
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
}
