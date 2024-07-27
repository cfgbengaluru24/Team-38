import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 shadow-md overflow-hidden">
      <div className="flex justify-between items-center max-w-6xl p-4 mx-auto sm:px-10 gap-2">
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-2xl">
            <span className="text-slate-500">Web</span>
            <span className="text-slate-700">App</span>
          </h1>
        </Link>

        <ul className="flex gap-4 font-medium items-center justify-center">
          <Link to="/">
            <li className="hidden md:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden md:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-slate-700 hover:underline text-center">
                Login
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
