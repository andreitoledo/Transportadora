import {
    Box,
    Button,
    IconButton,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
  } from '@mui/material';
  import { DataGrid, GridColDef } from '@mui/x-data-grid';
  import { useEffect, useState } from 'react';
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/Delete';
  import AddIcon from '@mui/icons-material/Add';
  import axios from 'axios';
  
  interface Cliente {
    id: string;
    nome: string;
    tipo: 'FISICA' | 'JURIDICA';
    documento: string;
    email: string;
    telefone: string;
    endereco: string;
    createdAt: string;
  }
  
  const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
  });
  
  export const ClientesPage = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(true);
  
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState<Partial<Cliente>>({});
    const [editingId, setEditingId] = useState<string | null>(null);
  
    const loadClientes = async () => {
      try {
        const res = await api.get('/clientes');
        setClientes(res.data);
      } catch (err) {
        console.error('Erro ao carregar clientes:', err);
      } finally {
        setLoading(false);
      }
    };
  
    const handleSave = async () => {
      try {
        const clientePayload = {
          nome: formData.nome,
          tipo: formData.tipo,
          documento: formData.documento,
          telefone: formData.telefone,
          email: formData.email,
          endereco: formData.endereco,
        };
    
        if (editingId) {
          await api.put(`/clientes/${editingId}`, clientePayload);
        } else {
          await api.post('/clientes', clientePayload);
        }
    
        setDialogOpen(false);
        setFormData({});
        setEditingId(null);
        loadClientes();
      } catch (err) {
        console.error('Erro ao salvar cliente:', err);
      }
    };
    
  
    const handleDelete = async (id: string) => {
      if (confirm('Tem certeza que deseja excluir este cliente?')) {
        try {
          await api.delete(`/clientes/${id}`);
          loadClientes();
        } catch (err) {
          console.error('Erro ao excluir cliente:', err);
        }
      }
    };
  
    const openDialog = (cliente?: Cliente) => {
      if (cliente) {
        setFormData(cliente);
        setEditingId(cliente.id);
      } else {
        setFormData({});
        setEditingId(null);
      }
      setDialogOpen(true);
    };
  
    const columns: GridColDef[] = [
      { field: 'nome', headerName: 'Nome', flex: 1 },
      { field: 'tipo', headerName: 'Tipo', width: 100 },
      { field: 'documento', headerName: 'Documento', width: 160 },
      { field: 'email', headerName: 'Email', flex: 1 },
      { field: 'telefone', headerName: 'Telefone', width: 150 },
      {
        field: 'actions',
        headerName: 'Ações',
        width: 130,
        renderCell: (params) => (
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
      loadClientes();
    }, []);
  
    return (
      <Box>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5">Clientes</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => openDialog()}>
            Novo Cliente
          </Button>
        </Box>
  
        <DataGrid
          rows={clientes}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
          loading={loading}
        />
  
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editingId ? 'Editar Cliente' : 'Novo Cliente'}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome"
                  value={formData.nome || ''}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tipo (FISICA/JURIDICA)"
                  value={formData.tipo || ''}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value as 'FISICA' | 'JURIDICA' })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Documento"
                  value={formData.documento || ''}
                  onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Telefone"
                  value={formData.telefone || ''}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Endereço"
                  value={formData.endereco || ''}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} variant="contained">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };
  