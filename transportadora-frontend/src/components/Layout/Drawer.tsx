import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';

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

        {/* Adiciona Clientes ao menu lateral */}
        <ListItem button onClick={() => navigate('/clientes')}>
          <ListItemIcon>
            <PeopleIcon /> {/* importe do MUI */}
          </ListItemIcon>
          <ListItemText primary="Clientes" />
        </ListItem>

        {/* Adiciona Contatos ao menu lateral */}
        <ListItem button onClick={() => navigate('/contatos')}>
          <ListItemIcon>
            <PeopleIcon /> {/* importe do MUI */}
          </ListItemIcon>
          <ListItemText primary="Contatos" />
        </ListItem>

        {/* Adiciona Pedidos ao menu lateral */}
        <ListItem button onClick={() => navigate('/pedidos')}>
          <ListItemIcon>
            <PeopleIcon /> {/* importe do MUI */}
          </ListItemIcon>
          <ListItemText primary="Pedidos" />
        </ListItem>

      </List>
    </Drawer>
  );
};
