import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout/Layout';
import { ClientesPage } from '../pages/Clientes/ClientesPage';
import { ContatosPage } from '../pages/Contatos/ContatosPage';
import { PedidosPage } from '../pages/Pedidos/PedidosPage';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { MotoristasPage } from '../pages/Motoristas/MotoristasPage';
import { VeiculosPage } from '../pages/Veiculos/VeiculosPage';

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
<Routes>
  <Route path="/login" element={<Login />} />
  
  {isAuthenticated ? (
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="clientes" element={<ClientesPage />} />
        <Route path="contatos" element={<ContatosPage />} />
        <Route path="pedidos" element={<PedidosPage />} />
        <Route path="motoristas" element={<MotoristasPage />} />  
        <Route path="veiculos" element={<VeiculosPage />} />     

      </Route>
    </>
  ) : (
    <Route path="*" element={<Navigate to="/login" replace />} />
  )}
</Routes>

    </BrowserRouter>
  );
};
