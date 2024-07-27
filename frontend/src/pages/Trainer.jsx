import woman from "../assets/woman1.jpg";

const Trainer = () => {
  return (
    <div className="relative flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <div className="box flex flex-col md:flex-row justify-center items-center bg-white p-6 rounded-lg shadow-lg">
        <div className="right mb-4 md:mb-0 md:mr-4">
          <img src={woman} alt="Example Image" className="w-32 h-32 md:w-48 md:h-48" />
        </div>
        <div className="left text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, eum.
          </h2>
          <p className="mb-4">Lorem ipsum dolor sit amet.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mb-2 md:mb-0 md:mr-2">
            Monitor Trainee
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Monitor Customer
          </button>
        </div>
      </div>
      <button className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        
      </button>
    </div>
  );
};

export default Trainer;
