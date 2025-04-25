import {
  Box,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { PedidoFormDialog } from './PedidoFormDialog';
import axios from 'axios';

export const PedidosPage = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPedido, setEditingPedido] = useState<any>(null);

  const loadPedidos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/pedidos');
      setPedidos(res.data);
    } catch (err) {
      console.error('Erro ao carregar pedidos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: any) => {
    try {
      const payload = {
        descricao: data.descricao,
        valorMercadoria: data.valorMercadoria,
        peso: data.peso,
        dimensoes: data.dimensoes,
        tipoEntrega: data.tipoEntrega,
        status: data.status, // ✅ Correção feita aqui
        enderecoColeta: data.enderecoColeta,
        enderecoEntrega: data.enderecoEntrega,
        observacoes: data.observacoes,
        remetenteId: data.remetenteId,
        destinatarioId: data.destinatarioId,
      };

      console.log('🚚 Payload enviado:', payload);

      if (editingPedido) {
        await axios.put(`http://localhost:3000/api/v1/pedidos/${editingPedido.id}`, payload);
      } else {
        await axios.post('http://localhost:3000/api/v1/pedidos', payload);
      }

      setDialogOpen(false);
      setEditingPedido(null);
      loadPedidos();
    } catch (err) {
      console.error('Erro ao salvar pedido:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja realmente excluir este pedido?')) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/pedidos/${id}`);
        loadPedidos();
      } catch (err) {
        console.error('Erro ao excluir pedido:', err);
      }
    }
  };

  const openDialog = (pedido?: any) => {
    setEditingPedido(pedido || null);
    setDialogOpen(true);
  };

  const columns: GridColDef[] = [
    { field: 'descricao', headerName: 'Descrição', flex: 1 },
    { field: 'tipoEntrega', headerName: 'Tipo', width: 150 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'valorMercadoria', headerName: 'Valor (R$)', width: 150 },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 150,
      renderCell: (params: { row: any }) => (
        <>
          <IconButton onClick={() => openDialog(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    loadPedidos();
  }, []);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Pedidos</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => openDialog()}>
          Novo Pedido
        </Button>
      </Box>

      <DataGrid
        rows={pedidos}
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
        getRowId={(row: any) => row.id}
        loading={loading}
      />

      <PedidoFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialData={editingPedido}
      />
    </Box>
  );
};
