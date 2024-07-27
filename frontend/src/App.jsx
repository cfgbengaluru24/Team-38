import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import TraineeSignin from "./pages/TraineeSignin";
import TrainerSignin from "./pages/TrainerSignin";
import TraineeSignup from "./pages/TraineeSignup";
import TrainerSignup from "./pages/TrainerSignup";
import Trainee from "./pages/Trainee";
import Trainer from "./pages/Trainer";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>

        <Route path="/trainee-signin" element={<TraineeSignin />} />
        <Route path="/trainee-signup" element={<TraineeSignup />} />
        <Route path="/trainer-signup" element={<TrainerSignup />} />
        <Route path="/trainer-signin" element={<TrainerSignin />} />
        <Route path="/trainee" element={<Trainee />} />
        <Route path="/trainer" element={<Trainer />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
