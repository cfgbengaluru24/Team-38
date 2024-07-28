import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import 'tailwindcss/tailwind.css';

const MonitorCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await fetch(
        `${BACKEND_URL}/api/t/customers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + "",
          },
        }
      );
      const data = await res.json();
      setCustomers(data);
      console.log("CUST : ", data);
    };

    fetchCustomers();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/customer-info/${id}`);
  };

  return (
    <div className="flex flex-wrap justify-center p-4 bg-gray-100 min-h-screen">
      {customers && customers.length && customers.map((customer) => (
        <div
          key={customer.id}
          className="flex flex-col items-center m-4 p-6 border border-gray-300 rounded-lg shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer h-96"
          onClick={() => handleCardClick(customer.id)}
        >
          <div className="flex flex-col items-center mb-4">
            <img 
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" 
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300 mb-2"
              style={{ aspectRatio: '1 / 1' }}
            />
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center">{customer.name}</h2>
          </div>
          <p className="text-lg text-gray-600 mb-4 md:mb-6 text-center">{customer.email}</p>
          <div className="flex justify-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300">
              View Profile
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MonitorCustomer;
