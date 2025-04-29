import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { VeiculoModal } from './VeiculoModal';
import { Veiculo, VeiculoService } from '../../services/VeiculoService';

export function VeiculosPage() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingVeiculo, setEditingVeiculo] = useState<Veiculo | null>(null);

  const fetchVeiculos = async () => {
    try {
      const data = await VeiculoService.getAll();
      setVeiculos(data);
    } catch (error) {
      console.error('Erro ao buscar veículos', error);
    }
  };

  useEffect(() => {
    fetchVeiculos();
  }, []);

  const handleSave = async (veiculo: Veiculo) => {
    try {
      if (veiculo.id) {
        await VeiculoService.update(veiculo.id, veiculo);
      } else {
        await VeiculoService.create(veiculo);
      }
      setOpenModal(false);
      fetchVeiculos();
    } catch (error) {
      console.error('Erro ao salvar veículo', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await VeiculoService.remove(id);
      fetchVeiculos();
    } catch (error) {
      console.error('Erro ao excluir veículo', error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" mb={2}>Veículos</Typography>

      <Button variant="contained" onClick={() => { setEditingVeiculo(null); setOpenModal(true); }}>
        + Novo Veículo
      </Button>

      <Box mt={2}>
        {veiculos.map((v) => (
          <Box key={v.id} sx={{ mb: 1, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography><strong>Placa:</strong> {v.placa}</Typography>
            <Typography><strong>Modelo:</strong> {v.modelo}</Typography>
            <Typography><strong>Marca:</strong> {v.marca}</Typography>
            <Typography><strong>Ano:</strong> {v.ano}</Typography>
            <Typography><strong>Capacidade (kg):</strong> {v.capacidadeKg}</Typography>
            <Typography><strong>Tipo:</strong> {v.tipo}</Typography>
            <Button size="small" onClick={() => { setEditingVeiculo(v); setOpenModal(true); }}>Editar</Button>
            <Button size="small" color="error" onClick={() => handleDelete(v.id!)}>Excluir</Button>
          </Box>
        ))}
      </Box>

      <VeiculoModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
        veiculo={editingVeiculo}
      />
    </Box>
  );
}
