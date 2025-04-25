import { Box, Typography, Paper } from '@mui/material';

export const Dashboard = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bem-vindo à Transportadora 🚛
        </Typography>
        <Typography variant="body1">
          Esse é o seu painel inicial. Aqui você verá KPIs, status de pedidos e atalhos rápidos.
        </Typography>
      </Paper>
    </Box>
  );
};
