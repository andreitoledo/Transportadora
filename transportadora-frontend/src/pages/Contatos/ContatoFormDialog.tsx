import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

interface ContatoFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export const ContatoFormDialog = ({ open, onClose, onSave, initialData }: ContatoFormDialogProps) => {
  const [formData, setFormData] = useState<any>({});
  const [clientes, setClientes] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      setFormData(initialData || {});
      loadClientes();
    }
  }, [open, initialData]);

  const loadClientes = async () => {
    try {
      const res = await api.get('/clientes');
      setClientes(res.data.data);
    } catch (err) {
      console.error('Erro ao carregar clientes:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name!]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{formData.id ? 'Editar Contato' : 'Novo Contato'}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} marginTop={1}>
          <Grid xs={12}>
            <TextField
              name="nome"
              label="Nome"
              fullWidth
              value={formData.nome || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid xs={12}>
            <TextField
              name="email"
              label="Email"
              fullWidth
              value={formData.email || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid xs={12}>
            <TextField
              name="telefone"
              label="Telefone"
              fullWidth
              value={formData.telefone || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid xs={12}>
            <TextField
              name="departamento"
              label="Departamento"
              fullWidth
              value={formData.departamento || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid xs={12}>
            <FormControl fullWidth>
              <InputLabel id="clienteId-label">Cliente</InputLabel>
              <Select
                labelId="clienteId-label"
                name="clienteId"
                value={formData.clienteId || ''}
                onChange={handleChange}
                label="Cliente"
              >
                {clientes.map((cliente) => (
                  <MenuItem key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
