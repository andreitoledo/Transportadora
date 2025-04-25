import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface PedidoFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export const PedidoFormDialog = ({
  open,
  onClose,
  onSave,
  initialData,
}: PedidoFormDialogProps) => {
  const [formData, setFormData] = useState<any>({
    descricao: '',
    valorMercadoria: '',
    peso: '',
    dimensoes: '',
    tipoEntrega: 'NORMAL',
    status: 'AGUARDANDO_COLETA',
    enderecoColeta: '',
    enderecoEntrega: '',
    observacoes: '',
    remetenteId: '',
    destinatarioId: '',
  });

  const [clientes, setClientes] = useState<any[]>([]);

  const fetchClientes = async () => {
    const res = await axios.get('http://localhost:3000/api/v1/clientes');
    setClientes(res.data);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        valorMercadoria: initialData.valorMercadoria || '',
        peso: initialData.peso || '',
        tipoEntrega: initialData.tipoEntrega || 'NORMAL',
        status: initialData.status || 'AGUARDANDO_COLETA',
      });
    } else {
      setFormData({
        descricao: '',
        valorMercadoria: '',
        peso: '',
        dimensoes: '',
        tipoEntrega: 'NORMAL',
        status: 'AGUARDANDO_COLETA',
        enderecoColeta: '',
        enderecoEntrega: '',
        observacoes: '',
        remetenteId: '',
        destinatarioId: '',
      });
    }
  }, [initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = () => {
    const payload = {
      ...(initialData?.id && { id: initialData.id }),
      descricao: formData.descricao,
      valorMercadoria: parseFloat(formData.valorMercadoria),
      peso: parseFloat(formData.peso),
      dimensoes: formData.dimensoes,
      tipoEntrega: formData.tipoEntrega,
      status: formData.status, // <<< apenas pega o que o usuário selecionou!
      enderecoColeta: formData.enderecoColeta,
      enderecoEntrega: formData.enderecoEntrega,
      observacoes: formData.observacoes,
      remetenteId: formData.remetenteId,
      destinatarioId: formData.destinatarioId,
    };
  
    console.log('🔎 Payload enviado para salvar:', payload);
  
    onSave(payload);
    onClose();
  };
  
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{initialData ? 'Editar Pedido' : 'Novo Pedido'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <TextField
              name="descricao"
              label="Descrição"
              value={formData.descricao}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="valorMercadoria"
              label="Valor da Mercadoria (R$)"
              type="number"
              value={formData.valorMercadoria}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="peso"
              label="Peso (kg)"
              type="number"
              value={formData.peso}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="dimensoes"
              label="Dimensões"
              value={formData.dimensoes}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              name="tipoEntrega"
              label="Tipo de Entrega"
              value={formData.tipoEntrega}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="NORMAL">Normal</MenuItem>
              <MenuItem value="EXPRESSA">Expressa</MenuItem>
              <MenuItem value="AGENDADA">Agendada</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              name="status"
              label="Status"
              value={formData.status}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="AGUARDANDO_COLETA">Aguardando Coleta</MenuItem>
              <MenuItem value="EM_TRANSITO">Em Trânsito</MenuItem>
              <MenuItem value="ENTREGUE">Entregue</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="enderecoColeta"
              label="Endereço de Coleta"
              value={formData.enderecoColeta}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="enderecoEntrega"
              label="Endereço de Entrega"
              value={formData.enderecoEntrega}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              name="remetenteId"
              label="Remetente"
              value={formData.remetenteId}
              onChange={handleChange}
              fullWidth
            >
              {clientes.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.nome}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              name="destinatarioId"
              label="Destinatário"
              value={formData.destinatarioId}
              onChange={handleChange}
              fullWidth
            >
              {clientes.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.nome}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="observacoes"
              label="Observações"
              value={formData.observacoes}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
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
