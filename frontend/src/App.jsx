import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
<<<<<<< HEAD
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
=======
import TraineeSignin from "./pages/TraineeSignin";
import TrainerSignin from "./pages/TrainerSignin";
import TraineeSignup from "./pages/TraineeSignup";
import TrainerSignup from "./pages/TrainerSignup";
import Trainee from "./pages/Trainee";
import Trainer from "./pages/Trainer";
>>>>>>> 3cb69bb4fb02f02bce68a4e2e3135e55ccccbf33
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
<<<<<<< HEAD
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
=======
        <Route path="/trainee-signin" element={<TraineeSignin />} />
        <Route path="/trainee-signup" element={<TraineeSignup />} />
        <Route path="/trainer-signup" element={<TrainerSignup />} />
        <Route path="/trainer-signin" element={<TrainerSignin />} />
        <Route path="/trainee" element={<Trainee />} />
        <Route path="/trainer" element={<Trainer />} />
        <Route path="/" element={<Home />} />
>>>>>>> 3cb69bb4fb02f02bce68a4e2e3135e55ccccbf33
      </Routes>
    </BrowserRouter>
  );
}

export default App;
