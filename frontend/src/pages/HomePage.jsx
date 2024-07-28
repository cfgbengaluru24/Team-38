import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import logo from '../assets/logo.png';
import image1 from '../assets/image1.jpeg';
import image2 from '../assets/image2.jpeg';
import image3 from '../assets/image3.jpeg';
import image6 from '../assets/image6.jpg';
import image7 from '../assets/image7.jpg';
import image5 from '../assets/image5.jpg';
import Modal from './Modal';
import DonationForm from '../components/DonationForm';
import Testimonials from '../components/Testimonial';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-green-800 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-12 mr-2" />
          <span className="text-white text-lg font-bold">Best Practices Foundation</span>
        </div>
        <div>
          <Link to="/" className="text-white hover:underline mr-4">Login</Link>
        </div>
      </nav>

      {/* Text and Image Section */}
      <div className="relative flex flex-col md:flex-row items-center bg-green-50 w-full p-6 md:p-12">
        <div className="flex flex-col md:w-1/2 p-6 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">
            Help Us Make a Difference
          </h2>
          <p className="text-lg mb-4">
            Your donation can change lives. Join us in our mission to empower the poor by providing essential resources and support. Every contribution counts towards building a better future for those in need.
          </p>
          <p className="text-lg mb-4">
            By supporting our initiatives, you become a part of a movement dedicated to making a tangible difference. Let's work together to create lasting change and build a more equitable world.
          </p>
          <div className="flex justify-center md:justify-start mt-4 space-x-4">
            <button 
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
              onClick={openModal}
            >
              Support Us
            </button>
            <Link to="/move" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
              Move Implement
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src={image7}
            alt="Donation"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      {/* Vision and Mission */}
      <div className="p-8 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Our Vision and Mission</h2>
        <div className="flex flex-wrap justify-center">
          <div className="m-4 p-6 bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-96">
            <div className="md:w-1/2 p-4">
              <h3 className="text-xl font-bold mb-2">Vision</h3>
              <p>Our vision is to create a world where every person has the opportunity to achieve their full potential.</p>
            </div>
            <div className="md:w-1/2">
              <img src={image3} alt="Vision" className="w-full h-full object-cover rounded-r-lg" />
            </div>
          </div>
          <div className="m-4 p-6 bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-96">
            <div className="md:w-1/2 p-4">
              <h3 className="text-xl font-bold mb-2">Mission</h3>
              <p>Our mission is to empower the poor by providing them with the skills and resources they need to succeed.</p>
            </div>
            <div className="md:w-1/2">
              <img src={image1} alt="Mission" className="w-full h-full object-cover rounded-r-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <Testimonials/>

      {/* Footer */}
      <footer className="bg-gray-800 p-4 text-white text-center">
        <p>&copy; 2024 Best Practices Foundation | All rights reserved.</p>
        <div className="flex justify-center mt-2">
          <Link to="/privacy" className="text-white hover:underline mx-2">Privacy Policy</Link>
          <Link to="/terms" className="text-white hover:underline mx-2">Terms of Use</Link>
          <Link to="/contact" className="text-white hover:underline mx-2">Contact Us</Link>
        </div>
      </footer>

      {/* Modal for Donation Form */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <DonationForm />
      </Modal>
    </div>
  );
};

export default HomePage;
