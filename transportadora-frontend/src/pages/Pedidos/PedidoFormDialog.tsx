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

interface PedidoFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export const PedidoFormDialog = ({ open, onClose, onSave, initialData }: PedidoFormDialogProps) => {
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('🚚 Dados para salvar pedido:', formData);
    if (!formData.descricao || !formData.valorMercadoria || !formData.peso || !formData.tipoEntrega || !formData.status || !formData.remetenteId || !formData.destinatarioId) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{formData.id ? 'Editar Pedido' : 'Novo Pedido'}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} marginTop={1}>
          <Grid item xs={12}>
            <TextField
              name="descricao"
              label="Descrição"
              fullWidth
              value={formData.descricao || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="valorMercadoria"
              label="Valor Mercadoria"
              type="number"
              fullWidth
              value={formData.valorMercadoria || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="peso"
              label="Peso (Kg)"
              type="number"
              fullWidth
              value={formData.peso || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="dimensoes"
              label="Dimensões"
              fullWidth
              value={formData.dimensoes || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="tipoEntrega-label">Tipo de Entrega</InputLabel>
              <Select
                labelId="tipoEntrega-label"
                id="tipoEntrega"
                value={formData.tipoEntrega || ''}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, tipoEntrega: e.target.value }))}
                label="Tipo de Entrega"
              >
                <MenuItem value="NORMAL">Normal</MenuItem>
                <MenuItem value="EXPRESSA">Expressa</MenuItem>
                <MenuItem value="AGENDADA">Agendada</MenuItem>
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                value={formData.status || ''}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, status: e.target.value }))}
                label="Status"
              >
                <MenuItem value="AGUARDANDO_COLETA">Aguardando Coleta</MenuItem>
                <MenuItem value="EM_TRANSITO">Em Trânsito</MenuItem>
                <MenuItem value="ENTREGUE">Entregue</MenuItem>
                <MenuItem value="DEVOLVIDO">Devolvido</MenuItem>
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={12}>
            <TextField
              name="enderecoColeta"
              label="Endereço Coleta"
              fullWidth
              value={formData.enderecoColeta || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="enderecoEntrega"
              label="Endereço Entrega"
              fullWidth
              value={formData.enderecoEntrega || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="observacoes"
              label="Observações"
              fullWidth
              value={formData.observacoes || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="remetenteId-label">Remetente</InputLabel>
              <Select
                labelId="remetenteId-label"
                id="remetenteId"
                value={formData.remetenteId || ''}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, remetenteId: e.target.value }))}
                label="Remetente"
              >
                {clientes.map((cliente) => (
                  <MenuItem key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="destinatarioId-label">Destinatário</InputLabel>
              <Select
                labelId="destinatarioId-label"
                id="destinatarioId"
                value={formData.destinatarioId || ''}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, destinatarioId: e.target.value }))}
                label="Destinatário"
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
