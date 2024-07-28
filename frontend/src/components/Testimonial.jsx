import React from 'react';
import 'tailwindcss/tailwind.css';
import image1 from '../assets/image1.jpeg';
import image2 from '../assets/image2.jpeg';
import image3 from '../assets/image3.jpeg';
import image5 from '../assets/image5.jpg';

const Testimonials = () => {
  const testimonials = [
    {
      image: image1,
      name: 'Anjali Sharma',
      testimonial: 'Joining the MOVE program was a turning point in my life. The training and support I received empowered me to start my own tailoring business, which has significantly improved my family\'s financial situation.',
    },
    {
      image: image2,
      name: 'Lakshmi Nair',
      testimonial: 'Thanks to the MOVE initiative, I was able to gain the skills and confidence needed to establish a small grocery shop in my village. It has been a great success, and I am grateful for the continuous support.',
    },
    {
      image: image3,
      name: 'Rekha Patil',
      testimonial: 'The MOVE program provided me with the necessary vocational training to start a handmade crafts business. The financial management sessions were particularly helpful in managing my finances effectively.',
    },
    {
      image: image5,
      name: 'Sita Devi',
      testimonial: 'I never thought I could run a business until I joined the MOVE program. The mentorship and guidance I received were invaluable, and today, I am proud to run a successful dairy farm.',
    },
  ];

  return (
    <div className="p-8 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
      <div className="flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="m-4 p-6 bg-gray-100 rounded-lg shadow-lg w-80 h-90">
            <img src={testimonial.image} alt={`Testimonial ${index + 1}`} className="w-full h-32 object-cover rounded-t-lg" />
            <h3 className="text-xl font-bold mt-2 mb-2">{testimonial.name}</h3>
            <p>{testimonial.testimonial}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
