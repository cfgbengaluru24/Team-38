import React, { useState } from 'react';

const FormComponent = () => {
  // Pre-filled data
  const [formData, setFormData] = useState({
    revenue: '10000',
    expenses: '5000',
    profit: '5000',
    itemsSold: '200',
    bestSellingItems: 'Soap',
    customerFeedback: 'Great service!',
    customerSatisfaction: 'High',
    repeatCustomers: '50'
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data here
    console.log('Form submitted:', formData);
  };

  return (
    <form className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Business Report Form</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="revenue">Revenue</label>
        <input
          id="revenue"
          name="revenue"
          type="text"
          value={formData.revenue}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="expenses">Expenses</label>
        <input
          id="expenses"
          name="expenses"
          type="text"
          value={formData.expenses}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="profit">Profit</label>
        <input
          id="profit"
          name="profit"
          type="text"
          value={formData.profit}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="itemsSold">Number of Items/Services Sold</label>
        <input
          id="itemsSold"
          name="itemsSold"
          type="text"
          value={formData.itemsSold}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="bestSellingItems">Best-Selling Items/Services</label>
        <input
          id="bestSellingItems"
          name="bestSellingItems"
          type="text"
          value={formData.bestSellingItems}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="customerFeedback">Customer Feedback</label>
        <input
          id="customerFeedback"
          name="customerFeedback"
          type="text"
          value={formData.customerFeedback}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="customerSatisfaction">Customer Satisfaction Levels</label>
        <input
          id="customerSatisfaction"
          name="customerSatisfaction"
          type="text"
          value={formData.customerSatisfaction}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="repeatCustomers">Number of Repeat Customers</label>
        <input
          id="repeatCustomers"
          name="repeatCustomers"
          type="text"
          value={formData.repeatCustomers}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
    </form>
  );
};

export default FormComponent;
