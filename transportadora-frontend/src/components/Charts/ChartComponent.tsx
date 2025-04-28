// src/components/Charts/ChartComponent.tsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registra os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ChartComponent = () => {
  // Dados mock para o gráfico de "Pedidos por Tipo"
  const data = {
    labels: ['Normal', 'Urgente'],
    datasets: [
      {
        label: 'Pedidos por Tipo',
        data: [3, 2], // Exemplo: 3 pedidos normais e 2 pedidos urgentes
        backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Pedidos por Tipo',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ChartComponent;
