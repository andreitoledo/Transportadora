import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import axios from 'axios';
  
  interface ContatoFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    initialData?: any;
  }
  
  interface Cliente {
    id: string;
    nome: string;
  }
  
  export const ContatoFormDialog = ({ open, onClose, onSave, initialData }: ContatoFormDialogProps) => {
    const [formData, setFormData] = useState<any>(initialData || {});
    const [clientes, setClientes] = useState<Cliente[]>([]);
  
    useEffect(() => {
      if (open) {
        axios.get('http://localhost:3000/api/v1/clientes')
          .then(response => setClientes(response.data))
          .catch(error => console.error('Erro ao buscar clientes', error));
      }
    }, [open]);
  
    useEffect(() => {
      setFormData(initialData || {});
    }, [initialData]);
  
    const handleChange = (e: any) => {
      const { name, value } = e.target;
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = () => {
      onSave(formData);
    };
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{initialData ? 'Editar Contato' : 'Novo Contato'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Cliente</InputLabel>
                <Select
                  value={formData.clienteId || ''}
                  label="Cliente"
                  name="clienteId"
                  onChange={handleChange}
                >
                  {clientes.map(cliente => (
                    <MenuItem key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
  
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                name="nome"
                value={formData.nome || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Telefone"
                name="telefone"
                value={formData.telefone || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Departamento"
                name="departamento"
                value={formData.departamento || ''}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  