// src/components/Layout/AppBarHeader.tsx

import { AppBar, Avatar, Badge, Box, IconButton, Popover, Toolbar, Tooltip, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { deepPurple } from '@mui/material/colors';

export default function AppBarHeader() {
  const { user } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // 🔔 Exemplo de notificações (mock)
  const notifications = [
    { id: 1, message: 'Novo pedido recebido' },
    { id: 2, message: 'Cliente atualizado' },
    { id: 3, message: 'Contato respondido' },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'primary.main',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo ou título */}
        <Typography variant="h6" noWrap component="div">
          Sistema de Transportes
        </Typography>

        {/* Área usuário + notificação */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Botão de notificações */}
          <Tooltip title="Notificações">
            <IconButton size="large" color="inherit" onClick={handleClick}>
              <Badge badgeContent={notifications.length} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Nome usuário */}
          <Typography variant="body1" noWrap component="div">
            {user?.nome || 'Usuário'}
          </Typography>

          {/* Avatar usuário */}
          <Avatar sx={{ bgcolor: deepPurple[500] }}>
            {user?.nome ? user.nome.charAt(0).toUpperCase() : 'U'}
          </Avatar>
        </Box>

        {/* Popover de Notificações */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box sx={{ p: 2, width: 250 }}>
            <Typography variant="h6" gutterBottom>Notificações</Typography>
            <List dense>
              {notifications.map((notif) => (
                <ListItem key={notif.id}>
                  <ListItemText primary={notif.message} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Popover>
      </Toolbar>
    </AppBar>
  );
}
