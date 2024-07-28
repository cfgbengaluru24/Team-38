import React from 'react';
import 'tailwindcss/tailwind.css';
import imagee from '../assets/imagee.jpg'; // Ensure the path is correct

const MoveImplementation = () => {
  return (
    <div className="p-8 bg-white">
      <h1 className="text-3xl font-bold text-center mb-8">MOVE Implementation Framework (Theory of Change)</h1>
      <div className="flex justify-center mb-8">
        <img src={imagee} alt="MOVE Implementation Framework" className="max-w-full h-auto rounded-lg shadow-lg" />
      </div>
      <div className="text-lg leading-7 space-y-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Mobilization of Women:</h2>
          <p className="pl-4">This initial stage involves reaching out to women in the community and encouraging them to participate in the program. The goal is to create awareness and interest in entrepreneurship.</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Creation of Self-Help Groups (SHGs):</h2>
          <p className="pl-4">Women who are mobilized are organized into Self-Help Groups (SHGs). These groups provide a support system and facilitate collective action and mutual assistance.</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. Selection and Training of Potential Entrepreneurs: MOVE:</h2>
          <p className="pl-4">From the SHGs, potential entrepreneurs are selected for the MOVE (Market Oriented Value Enhancement) training. This training aims to equip them with the necessary skills and knowledge to start and run their own businesses.</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Skill and Vocational Training:</h2>
          <p className="pl-4">Selected participants undergo further skill and vocational training tailored to their business interests. This training provides them with the technical skills required for their specific entrepreneurial activities.</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Financial Management Training and Bank Linkages:</h2>
          <p className="pl-4">Participants receive training in financial management, including budgeting, accounting, and financial planning. Additionally, linkages with banks are established to facilitate access to financial services and loans.</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. Creation and Submission of Business Development Plans (BDPs) to Banks for Loans:</h2>
          <p className="pl-4">With their training completed, participants develop Business Development Plans (BDPs). These plans are then submitted to banks as part of loan applications to secure funding for their businesses.</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7. Handholding New Businesses:</h2>
          <p className="pl-4">Newly established businesses receive ongoing support and mentorship. This "handholding" phase ensures that entrepreneurs have the guidance and assistance they need during the early stages of their business operations.</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">8. Policy Recommendations for Small Business:</h2>
          <p className="pl-4">Based on the experiences and insights gained from the program, policy recommendations are formulated to support small businesses. These recommendations aim to create a more favorable environment for entrepreneurship and address any challenges faced by the participants.</p>
        </div>
      </div>
    </div>
  );
};

export default MoveImplementation;
