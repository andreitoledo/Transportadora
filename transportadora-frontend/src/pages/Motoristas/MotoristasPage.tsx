// src/pages/Motoristas/MotoristasPage.tsx

import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { MotoristaModal } from './MotoristaModal';
import { MotoristaService, Motorista } from '../../services/MotoristaService';
import { toast } from 'react-toastify';

export function MotoristasPage() {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingMotorista, setEditingMotorista] = useState<Motorista | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchMotoristas = async () => {
    setLoading(true);
    try {
      const data = await MotoristaService.getAll();
      setMotoristas(data);
    } catch (error) {
      console.error('Erro ao buscar motoristas', error);
      toast.error('Erro ao buscar motoristas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMotoristas();
  }, []);

  const handleSave = async (motorista: Motorista) => {
    try {
      if (motorista.id) {
        await MotoristaService.update(motorista.id, motorista);
        toast.success('Motorista atualizado com sucesso!');
      } else {
        await MotoristaService.create(motorista);
        toast.success('Motorista cadastrado com sucesso!');
      }
      setOpenModal(false);
      fetchMotoristas();
    } catch (error) {
      console.error('Erro ao salvar motorista', error);
      toast.error('Erro ao salvar motorista.');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await MotoristaService.remove(deleteId);
      toast.success('Motorista excluído com sucesso!');
      setDeleteId(null);
      fetchMotoristas();
    } catch (error) {
      console.error('Erro ao excluir motorista', error);
      toast.error('Erro ao excluir motorista.');
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" mb={2}>Motoristas</Typography>

      <Button variant="contained" onClick={() => { setEditingMotorista(null); setOpenModal(true); }}>
        + Novo Motorista
      </Button>

      {/* Loading Spinner */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Box mt={2}>
          {motoristas.map((m) => (
            <Box key={m.id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
              <Typography><strong>Nome:</strong> {m.nome}</Typography>
              <Typography><strong>CNH:</strong> {m.cnh}</Typography>
              <Typography><strong>Telefone:</strong> {m.telefone}</Typography>
              <Box mt={1}>
                <Button size="small" onClick={() => { setEditingMotorista(m); setOpenModal(true); }}>
                  Editar
                </Button>
                <Button size="small" color="error" onClick={() => setDeleteId(m.id!)} sx={{ ml: 1 }}>
                  Excluir
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* Modal de criação/edição */}
      <MotoristaModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
        motorista={editingMotorista}
      />

      {/* Dialog de confirmação exclusão */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>Deseja realmente excluir este motorista?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancelar</Button>
          <Button color="error" onClick={handleDelete}>Excluir</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
