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
import { ContatoFormDialog } from './ContatoFormDialog';
import { api } from '../../services/api'; // usamos o mesmo axios com token!

export const ContatosPage = () => {
  const [contatos, setContatos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContato, setEditingContato] = useState<any>(null);

  const loadContatos = async () => {
    try {
      const res = await api.get('/contatos');
      setContatos(res.data.data); // <-- pegando res.data.data igual fizemos para Clientes
    } catch (err) {
      console.error('Erro ao carregar contatos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: any) => {
    try {
      const payload = {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        departamento: data.departamento,
        clienteId: data.clienteId,
      };

      if (editingContato) {
        await api.put(`/contatos/${editingContato.id}`, payload);
      } else {
        await api.post('/contatos', payload);
      }

      setDialogOpen(false);
      setEditingContato(null);
      loadContatos();
    } catch (err) {
      console.error('Erro ao salvar contato:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja realmente excluir este contato?')) {
      try {
        await api.delete(`/contatos/${id}`);
        loadContatos();
      } catch (err) {
        console.error('Erro ao excluir contato:', err);
      }
    }
  };

  const openDialog = (contato?: any) => {
    setEditingContato(contato || null);
    setDialogOpen(true);
  };

  const columns: GridColDef[] = [
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'telefone', headerName: 'Telefone', width: 150 },
    { field: 'departamento', headerName: 'Departamento', flex: 1 },
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
    loadContatos();
  }, []);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Contatos</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => openDialog()}
        >
          Novo Contato
        </Button>
      </Box>

      <DataGrid
        rows={contatos}
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
        getRowId={(row: any) => row.id}
        loading={loading}
      />

      <ContatoFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialData={editingContato}
      />
    </Box>
  );
};
