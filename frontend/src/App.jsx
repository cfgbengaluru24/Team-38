import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import TraineeSignin from "./pages/TraineeSignin";
import TrainerSignin from "./pages/TrainerSignin";
import TraineeSignup from "./pages/TraineeSignup";
import Trainee from "./pages/Trainee";
import Trainer from "./pages/Trainer";
import Test from "./pages/Test";
import MonitorTrainee from "./pages/MonitorTrainee";
import MonitorCustomer from "./pages/MonitorCustomer";
import TraineeInfo from "./pages/TraineeInfo";
import ChatbotUI from "./pages/ChatbotUI";
import Predict from "./pages/Predict";
import CustomerInfo from "./pages/CustomerInfo";
import HomePage from "./pages/HomePage";
import MoveImplementation from "./pages/MoveImplementation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/trainee-signin" element={<TraineeSignin />} />
        <Route path="/trainee-signup" element={<TraineeSignup />} />
        <Route path="/trainer-signin" element={<TrainerSignin />} />
        <Route path="/trainee" element={<Trainee />} />
        <Route path="/trainer" element={<Trainer />} />
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<HomePage />} />
        <Route path="/move" element={<MoveImplementation />} />
        <Route path="/customer-info/:id" element={<CustomerInfo />} />
        <Route path="/trainee/test" element={<Test />} />
        <Route path="/monitortrainee" element={<MonitorTrainee />} />
        <Route path="/monitorcustomer" element={<MonitorCustomer />} />
        <Route path="/trainee-info/:id" element={<TraineeInfo />} />
        <Route path="/chatbot" element={<ChatbotUI />} />
        <Route path="/predict" element={<Predict />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
