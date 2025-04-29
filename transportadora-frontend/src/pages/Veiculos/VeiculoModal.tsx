import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface VeiculoModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (veiculo: any) => void;
  veiculo?: any;
}

const tiposVeiculo = [
  'CAMINHAO',
  'VAN',
  'CARRETA',
  'UTILITARIO'
];

export function VeiculoModal({ open, onClose, onSave, veiculo }: VeiculoModalProps) {
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [ano, setAno] = useState<number>(2024);
  const [capacidadeKg, setCapacidadeKg] = useState<number>(0);
  const [tipo, setTipo] = useState<string>('CAMINHAO');

  useEffect(() => {
    if (veiculo) {
      setPlaca(veiculo.placa || '');
      setModelo(veiculo.modelo || '');
      setMarca(veiculo.marca || '');
      setAno(veiculo.ano || 2024);
      setCapacidadeKg(veiculo.capacidadeKg || 0);
      setTipo(veiculo.tipo || 'CAMINHAO');
    } else {
      setPlaca('');
      setModelo('');
      setMarca('');
      setAno(2024);
      setCapacidadeKg(0);
      setTipo('CAMINHAO');
    }
  }, [veiculo]);

  const handleSubmit = async () => {
    try {
      await onSave({
        ...veiculo,
        ano: Number(veiculo.ano),
        capacidadeKg: Number(veiculo.capacidadeKg),
      });
      onClose();
      toast.success('Veículo salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar veículo', error);
      toast.error('Erro ao salvar veículo.');
    }
  };
  
  
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{veiculo ? 'Editar Veículo' : 'Novo Veículo'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField label="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} fullWidth />
          <TextField label="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} fullWidth />
          <TextField label="Marca" value={marca} onChange={(e) => setMarca(e.target.value)} fullWidth />
          <TextField label="Ano" type="number" value={ano} onChange={(e) => setAno(Number(e.target.value))} fullWidth />
          <TextField label="Capacidade (Kg)" type="number" value={capacidadeKg} onChange={(e) => setCapacidadeKg(Number(e.target.value))} fullWidth />
          <TextField select label="Tipo de Veículo" value={tipo} onChange={(e) => setTipo(e.target.value)} fullWidth>
            {tiposVeiculo.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
