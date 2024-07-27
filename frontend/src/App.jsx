import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TraineeSignin from "./pages/TraineeSignin";
import TraineeSignup from "./pages/TraineeSignup";
import Trainee from "./pages/Trainee";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/trainee-signin" element={<TraineeSignin />} />
        <Route path="/trainee-signup" element={<TraineeSignup />} />
        <Route path="/trainee" element={<Trainee />} />
        <Route path="/" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
