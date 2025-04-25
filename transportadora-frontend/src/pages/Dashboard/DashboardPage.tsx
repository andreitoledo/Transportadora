import { Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
      const res = await axios.get('http://localhost:3000/api/v1/pedidos');
      const pedidos = res.data;

      setTotalPedidos(pedidos.length);
      setValorTotal(pedidos.reduce((sum: number, pedido: any) => sum + pedido.valorMercadoria, 0));

      const statusCount = { AGUARDANDO_COLETA: 0, EM_TRANSITO: 0, ENTREGUE: 0 };
      const tipoCount = { NORMAL: 0, EXPRESSA: 0, AGENDADA: 0 };

      pedidos.forEach((pedido: any) => {
        statusCount[pedido.status] = (statusCount[pedido.status] || 0) + 1;
        tipoCount[pedido.tipoEntrega] = (tipoCount[pedido.tipoEntrega] || 0) + 1;
      });

      setPedidosPorStatus(statusCount);
      setPedidosPorTipo(tipoCount);

    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <Grid container spacing={3} padding={2}>
      <Grid item xs={12} md={3}>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h6">Total de Pedidos</Typography>
          <Typography variant="h4">{totalPedidos}</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={3}>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h6">Valor Total (R$)</Typography>
          <Typography variant="h4">{valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={3}>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h6">Status dos Pedidos</Typography>
          <Typography variant="body1">Aguardando: {pedidosPorStatus.AGUARDANDO_COLETA}</Typography>
          <Typography variant="body1">Em Trânsito: {pedidosPorStatus.EM_TRANSITO}</Typography>
          <Typography variant="body1">Entregues: {pedidosPorStatus.ENTREGUE}</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={3}>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h6">Tipo de Entrega</Typography>
          <Typography variant="body1">Normal: {pedidosPorTipo.NORMAL}</Typography>
          <Typography variant="body1">Expressa: {pedidosPorTipo.EXPRESSA}</Typography>
          <Typography variant="body1">Agendada: {pedidosPorTipo.AGENDADA}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
