import woman from "../assets/woman1.jpg"
const Monitor = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <div className="box flex flex-col md:flex-row justify-center items-center bg-white p-6 rounded-lg shadow-lg">
        <div className="right mb-4 md:mb-0 md:mr-4">
          <img src={woman} alt="Example Image" className="w-32 h-32 md:w-48 md:h-48" />
        </div>
        <div className="left text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, eum.</h2>
          <p className="mb-4">Lorem ipsum dolor sit amet.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mb-2 md:mb-0 md:mr-2">Monitor Trainee</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Monitor Customer</button>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
