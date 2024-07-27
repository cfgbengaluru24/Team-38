import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import 'tailwindcss/tailwind.css';

const MonitorTrainee = () => {
  const [freshers, setFreshers] = useState([]);
  const navigate = useNavigate(); // Use the navigate hook for navigation

  useEffect(() => {
    const fetchFreshers = async () => {
      const res = await fetch(
        `${BACKEND_URL}/api/t/freshers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      setFreshers(data);
    };

    fetchFreshers();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/trainee-info/${id}`); // Navigate to the TraineeInfo page with fresher ID
  };

  return (
    <div className="flex flex-wrap justify-center p-4 bg-gray-100 min-h-screen">
      {freshers.map((fresher) => !fresher.testScore && (
        <div
          key={fresher.id}
          className="m-4 p-6 border border-gray-300 rounded-lg shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
          onClick={() => handleCardClick(fresher.id)}
        >
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">{fresher.name}</h2>
          <p className="text-lg text-gray-600 mb-4 md:mb-6">{fresher.email}</p>
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

export default MonitorTrainee;
