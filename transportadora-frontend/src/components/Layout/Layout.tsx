import { Box, CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import { AppBarComponent } from './AppBar';
import { DrawerComponent } from './Drawer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarComponent />
      <DrawerComponent />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};
