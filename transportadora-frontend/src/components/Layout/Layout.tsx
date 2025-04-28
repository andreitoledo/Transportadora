// src/components/Layout/Layout.tsx
import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import DrawerComponent from './Drawer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Sistema de Transportes
          </Typography>
        </Toolbar>
      </AppBar>

      <DrawerComponent />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
