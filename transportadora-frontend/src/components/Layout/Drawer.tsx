// src/components/Layout/Drawer.tsx

import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, IconButton, Divider, Tooltip, Box, useTheme } from '@mui/material';
import { Dashboard, People, LocalShipping, Contacts, Menu, ChevronLeft, Logout, Home, DirectionsCar } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // <- certifique-se que existe isso

export default function DrawerComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { logout } = useAuth();

  const drawerWidth = 240;
  const miniDrawerWidth = 72;

  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Clientes', icon: <People />, path: '/clientes' },
    { text: 'Contatos', icon: <Contacts />, path: '/contatos' },
    { text: 'Pedidos', icon: <LocalShipping />, path: '/pedidos' },
    { text: 'Motoristas', icon: <People />, path: '/motoristas' },
    { text: 'Veiculos', icon: <DirectionsCar />, path: '/veiculos' },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : miniDrawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : miniDrawerWidth,
          overflowX: 'hidden',
          backdropFilter: 'blur(8px)',
          backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.7)'
            : 'rgba(18, 18, 18, 0.7)',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      {/* Topo - Botão Menu */}
      <Box>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'space-between' : 'center',
            px: [1],
          }}
        >
          {open && (
            <IconButton onClick={() => navigate('/dashboard')}>
              <Home />
            </IconButton>
          )}
          <IconButton onClick={handleDrawerToggle}>
            {open ? <ChevronLeft /> : <Menu />}
          </IconButton>
        </Toolbar>

        <Divider />

        {/* Menu */}
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            const listItem = (
              <ListItemButton
                key={item.text}
                onClick={() => navigate(item.path)}
                selected={isActive}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.action.selected,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: isActive ? theme.palette.primary.main : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: isActive ? theme.palette.primary.main : 'inherit',
                    fontWeight: isActive ? 'bold' : 'normal',
                  }}
                />
              </ListItemButton>
            );

            return open ? listItem : (
              <Tooltip key={item.text} title={item.text} placement="right">
                {listItem}
              </Tooltip>
            );
          })}
        </List>
      </Box>

      {/* Rodapé - Logout */}
      <Box>
        <Divider />
        <List>
          <ListItemButton
            onClick={logout}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Sair" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}
