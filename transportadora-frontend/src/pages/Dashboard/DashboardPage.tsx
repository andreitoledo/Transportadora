import { Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export const DashboardPage = () => {
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [pedidosPorStatus, setPedidosPorStatus] = useState({
    AGUARDANDO_COLETA: 0,
    EM_TRANSITO: 0,
    ENTREGUE: 0,
  });
  const [pedidosPorTipo, setPedidosPorTipo] = useState({
    NORMAL: 0,
    EXPRESSA: 0,
    AGENDADA: 0,
  });

  const fetchPedidos = async () => {
    try {
      const res = await api.get('/pedidos');
      const pedidos = res.data.data; // <-- AQUI você pega o array correto
  
      console.log('Pedidos carregados:', pedidos);
  
      const totalPedidos = pedidos.length;
      const pedidosEntregues = pedidos.filter((p: any) => p.status === 'ENTREGUE').length;
  
      setResumo({
        totalPedidos,
        pedidosEntregues,
      });
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };
  

  useEffect(() => {
    fetchPedidos();
  }, []);

  const statusChartData = {
    labels: ['Aguardando Coleta', 'Em Trânsito', 'Entregue'],
    datasets: [
      {
        data: [
          pedidosPorStatus.AGUARDANDO_COLETA,
          pedidosPorStatus.EM_TRANSITO,
          pedidosPorStatus.ENTREGUE,
        ],
        backgroundColor: ['#FFCD56', '#36A2EB', '#4CAF50'],
      },
    ],
  };

  const tipoChartData = {
    labels: ['Normal', 'Expressa', 'Agendada'],
    datasets: [
      {
        label: 'Tipo de Entrega',
        data: [
          pedidosPorTipo.NORMAL,
          pedidosPorTipo.EXPRESSA,
          pedidosPorTipo.AGENDADA,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <Grid container spacing={3} padding={2}>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h6">Total de Pedidos</Typography>
          <Typography variant="h4">{totalPedidos}</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h6">Valor Total (R$)</Typography>
          <Typography variant="h4">
            {valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h6">Status dos Pedidos</Typography>
          <Pie data={statusChartData} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h6">Pedidos por Tipo de Entrega</Typography>
          <Bar data={tipoChartData} />
        </Paper>
      </Grid>
    </Grid>
  );
};
