import React, { useState } from 'react';
import axios from 'axios';

const Graphs = () => {
  const [barChartUrl, setBarChartUrl] = useState('');
  const [lineChartUrl, setLineChartUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBarChart = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://127.0.0.1:5000/bar-chart', {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(new Blob([response.data]));
      setBarChartUrl(url);
    } catch (error) {
      setError('Failed to fetch bar chart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchLineChart = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://127.0.0.1:5000/comparative-graph', {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(new Blob([response.data]));
      setLineChartUrl(url);
    } catch (error) {
      setError('Failed to fetch line chart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Graphs and Charts</h2>
      <div className="mb-4">
        <button
          onClick={fetchBarChart}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Load Bar Chart
        </button>
        {barChartUrl && (
          <div className="mt-4">
            <img
              src={barChartUrl}
              alt="Bar Chart"
              className="w-full max-w-3xl rounded shadow-lg"
            />
          </div>
        )}
      </div>
      <div className="mb-4">
        <button
          onClick={fetchLineChart}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Load Line Chart
        </button>
        {lineChartUrl && (
          <div className="mt-4">
            <img
              src={lineChartUrl}
              alt="Line Chart"
              className="w-full max-w-3xl rounded shadow-lg"
            />
          </div>
        )}
      </div>
      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Graphs;
