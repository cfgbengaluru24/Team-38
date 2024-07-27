import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../config";
import 'tailwindcss/tailwind.css';

const Trainee = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [modules, setModules] = useState({});

  useEffect(() => {
    const fetchModules = async () => {
      const res = await fetch(
        `${BACKEND_URL}/api/f/module?id=${currentUser.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      setModules(data);
    };

    fetchModules();
  }, [currentUser.id]);

  return (
    <div className="flex flex-wrap justify-center">
      {Object.entries(modules).map(([moduleName, completed]) => (
        <div
          key={moduleName}
          className="m-4 p-4 border rounded-lg shadow-lg w-64 bg-white"
        >
          <h2 className="text-xl font-bold mb-2">{moduleName}</h2>
          <p className={`text-lg ${completed ? "text-green-500" : "text-red-500"}`}>
            {completed ? "Completed" : "Not Completed"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Trainee;
