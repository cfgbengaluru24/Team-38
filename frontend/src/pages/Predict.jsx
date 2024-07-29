import React, { useState } from 'react';
import axios from 'axios';

const Predict = () => {
  const [investment, setInvestment] = useState('');
  const [learningRate, setLearningRate] = useState('');
  const [marketTrends, setMarketTrends] = useState('');
  const [demographicSpecifications, setDemographicSpecifications] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPrediction(null);
    setLoading(true);

    const input_data = [
      [
        parseInt(investment, 10),
        parseFloat(learningRate),
        parseFloat(marketTrends),
        parseInt(demographicSpecifications, 10),
      ]
    ];

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict-business-score', { input_data });
      setPrediction(response.data.prediction.toFixed(2));
    } catch (error) {
      setError('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Predict Business Score</h2>
        <div> <b>
          
          Market conditions:  
          </b>
  Higher Scores (Close to 1): Indicate favorable market conditions, suggesting a supportive environment for business growth and success. This could mean high consumer demand, low competition, and stable economic conditions.
Lower Scores (Close to 0): Indicate challenging market conditions, suggesting a less supportive or more competitive environment. This could mean low consumer demand, high competition, and economic instability.
</div>

<div className='mt-2'>


<b>
Demographic Specifications  :

</b>
1 - Urban, Low Income
2 - Urban, Middle Income
3 - Rural, Low Income
4 - Rural, Middle Income</div>
        <div className="mb-4">
          <label className="block text-gray-700">Investment</label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            min="10000"
            max="100000"
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Learning Rate</label>
          <input
            type="number"
            value={learningRate}
            onChange={(e) => setLearningRate(e.target.value)}
            min="0"
            max="1"
            step="0.01"
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Market Trends</label>
          <input
            type="number"
            value={marketTrends}
            onChange={(e) => setMarketTrends(e.target.value)}
            min="0"
            max="1"
            step="0.01"
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Demographic Specifications</label>
          <input
            type="number"
            value={demographicSpecifications}
            onChange={(e) => setDemographicSpecifications(e.target.value)}
            min="1"
            max="4"
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Predict
        </button>
      </form>
      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {prediction && (
        <div className="mt-6 p-4 bg-white rounded shadow-md w-full max-w-lg text-center">
          <h3 className="text-xl font-bold">Prediction Result</h3>
          <p className="text-2xl">{prediction}%</p>
        </div>
      )}
    </div>
  );
};

export default Predict;
