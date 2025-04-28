// src/pages/Dashboard/DashboardPage.tsx

import { Box, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getPedidos, getClientes } from '../../services/apiService'; // Supondo que você já tem um service de API
import { ChartComponent } from '../../components/Charts/ChartComponent'; // Vamos criar esse ChartComponent depois

export function DashboardPage() {
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);
  const [totalUrgentes, setTotalUrgentes] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const pedidos = await getPedidos();
        const clientes = await getClientes();

        setTotalPedidos(pedidos.length);
        setTotalClientes(clientes.length);
        setTotalUrgentes(pedidos.filter((p: any) => p.tipoEntrega === 'URGENTE').length);
      } catch (error) {
        console.error('Erro ao carregar dados do Dashboard', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Cards */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Total de Pedidos</Typography>
            <Typography variant="h4">{totalPedidos}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Total de Clientes</Typography>
            <Typography variant="h4">{totalClientes}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Pedidos Urgentes</Typography>
            <Typography variant="h4">{totalUrgentes}</Typography>
          </Paper>
        </Grid>

        {/* Gráficos */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Pedidos por Tipo</Typography>
            <ChartComponent />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Faturamento Mensal</Typography>
            <ChartComponent />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
