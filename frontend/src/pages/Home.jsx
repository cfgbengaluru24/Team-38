import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";
import logo from "../assets/logo.png";

const Home = () => {
  return (
    <div className="flex flex-wrap h-screen">
      <div className="w-full md:w-1/2 bg-[#F9F5E8] flex flex-col items-center justify-center font-semibold">
        <div className="flex items-center justify-start mb-10">
          <img src={logo} alt="" className="w-14 bg-transparent block mr-2" />
          <div className="text-2xl font font-extrabold">Best Practices Foundation</div>
        </div>
        <Link to="/trainee-signin">
          <button className="bg-[#00715D] text-white py-2 rounded px-44 mb-8 hover:opacity-85">
            Trainee Log In
          </button>
        </Link>
        <Link to="/trainer-signin">
          <button className="bg-[#00715D] text-white px-44 py-2 rounded mb-2 hover:opacity-85">
            Trainer Log In
          </button>
        </Link>
      </div>
      <div className="hidden md:block w-full md:w-1/2 md:h-screen">
        <img src={hero} alt="Hero" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Home;
