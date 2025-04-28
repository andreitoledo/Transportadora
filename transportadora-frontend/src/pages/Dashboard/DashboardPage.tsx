import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { api } from '../../services/api';
import { Bar, Doughnut } from 'react-chartjs-2';

export const DashboardPage = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);

  const fetchPedidos = async () => {
    try {
      const res = await api.get('/pedidos');
      setPedidos(res.data.data); // ✅ aqui!
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const totalPedidos = pedidos.length;
  const valorTotal = pedidos.reduce((acc, pedido) => acc + pedido.valorMercadoria, 0);

  const statusCounts = pedidos.reduce((acc, pedido) => {
    acc[pedido.status] = (acc[pedido.status] || 0) + 1;
    return acc;
  }, {} as any);

  const tipoEntregaCounts = pedidos.reduce((acc, pedido) => {
    acc[pedido.tipoEntrega] = (acc[pedido.tipoEntrega] || 0) + 1;
    return acc;
  }, {} as any);

  return (
    <Box>
      <Typography variant="h4" mb={4}>Dashboard</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total de Pedidos</Typography>
              <Typography variant="h4">{totalPedidos}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Valor Total (R$)</Typography>
              <Typography variant="h4">
                {valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Status dos Pedidos</Typography>
              <Doughnut
                data={{
                  labels: Object.keys(statusCounts),
                  datasets: [
                    {
                      label: 'Status',
                      data: Object.values(statusCounts),
                      backgroundColor: ['#FFC107', '#2196F3', '#4CAF50', '#FF5722'],
                    },
                  ],
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pedidos por Tipo de Entrega</Typography>
              <Bar
                data={{
                  labels: Object.keys(tipoEntregaCounts),
                  datasets: [
                    {
                      label: 'Tipo de Entrega',
                      data: Object.values(tipoEntregaCounts),
                      backgroundColor: '#FF6384',
                    },
                  ],
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
