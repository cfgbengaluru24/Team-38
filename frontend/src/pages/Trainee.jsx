import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../config";

const Trainee = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchModules();
  }, [currentUser.id]);

  return (
    <div className="flex flex-wrap justify-center">
      {modules.map((module) => (
        <div
          key={module.moduleId}
          className="m-4 p-4 border rounded-lg shadow-lg w-64 bg-white"
        >
          <h2 className="text-xl font-bold mb-2">{module.moduleName}</h2>
          <p
            className={`text-lg ${
              module.completed ? "text-green-500" : "text-red-500"
            }`}
          >
            {module.completed ? "Completed" : "Not Completed"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Trainee;
