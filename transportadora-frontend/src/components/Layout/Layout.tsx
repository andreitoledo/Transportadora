// src/components/Layout/Layout.tsx

import { Box, CssBaseline } from '@mui/material';
import DrawerComponent from './Drawer';
import AppBarHeader from './AppBarHeader'; // 👈 importa aqui
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBarHeader /> {/* 👈 usa o AppBarHeader */}

      <DrawerComponent />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          mt: 8, // espaço para não ficar embaixo do AppBar
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
