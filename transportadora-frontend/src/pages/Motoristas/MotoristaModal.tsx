import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { createMotorista, updateMotorista } from '../../services/apiService';

interface MotoristaModalProps {
  open: boolean;
  onClose: () => void;
  motorista?: any; // Melhorar esse tipo se quiser
}

export function MotoristaModal({ open, onClose, motorista }: MotoristaModalProps) {
  const [nome, setNome] = useState('');
  const [cnh, setCnh] = useState('');
  const [telefone, setTelefone] = useState('');

  // Esses são os campos ocultos
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [validadeCnh, setValidadeCnh] = useState('');

  useEffect(() => {
    if (motorista) {
      setNome(motorista.nome || '');
      setCnh(motorista.cnh || '');
      setTelefone(motorista.telefone || '');

      setCpf(motorista.cpf || '');
      setEmail(motorista.email || '');
      setValidadeCnh(motorista.validadeCnh || new Date().toISOString());
    } else {
      setNome('');
      setCnh('');
      setTelefone('');

      setCpf('');
      setEmail('');
      setValidadeCnh(new Date().toISOString()); // inicializa para evitar erro
    }
  }, [motorista]);

  const handleSubmit = async () => {
    const payload = {
      nome,
      cnh,
      telefone,
      cpf,
      email,
      validadeCnh,
      status: true,
    };

    try {
      if (motorista && motorista.id) {
        await updateMotorista(motorista.id, payload);
      } else {
        await createMotorista(payload);
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar motorista:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{motorista ? 'Editar Motorista' : 'Novo Motorista'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            fullWidth
          />
          <TextField
            label="CNH"
            value={cnh}
            onChange={(e) => setCnh(e.target.value)}
            fullWidth
          />
          <TextField
            label="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            fullWidth
          />

          <TextField
            label="Cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            fullWidth
          />

          <TextField
            label="validadeCnh"
            value={validadeCnh}
            onChange={(e) => setValidadeCnh(e.target.value)}
            fullWidth
          />

          <TextField
            label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          {/* <TextField
            label="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          /> */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
