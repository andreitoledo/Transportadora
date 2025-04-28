// src/components/Layout/Drawer.tsx

import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Dashboard, People, LocalShipping, Contacts } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom'; // Importar useLocation
import { grey } from '@mui/material/colors';

export default function DrawerComponent() {
  const navigate = useNavigate();
  const location = useLocation(); // Pega a rota atual

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
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path} // Deixa selecionado se a rota for igual
            sx={{
              '&.Mui-selected': {
                backgroundColor: grey[300], // Cor de fundo para item ativo
                '&:hover': {
                  backgroundColor: grey[400],
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
