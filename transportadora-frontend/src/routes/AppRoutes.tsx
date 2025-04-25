import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { useAuth } from '../context/AuthContext';
import { Layout } from '../components/Layout/Layout';
import { ClientesPage } from '../pages/Clientes/ClientesPage';
import { ContatosPage } from '../pages/Contatos/ContatosPage';
import { PedidosPage } from '../pages/Pedidos/PedidosPage';

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {isAuthenticated ? (
          <>
            <Route
              path="/"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
        <Route
          path="/clientes"
          element={
            <Layout>
              <ClientesPage />
            </Layout>
          }
        />

        <Route
          path="/contatos"
          element={
            <Layout>
              <ContatosPage />
            </Layout>
          }
        />

        <Route
          path="/pedidos"
          element={
            <Layout>
              <PedidosPage />
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};
