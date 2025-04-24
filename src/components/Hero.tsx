import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBooking = () => {
    navigate('/booking');
  };

  return (
    <section 
      className="relative h-screen min-h-[600px] flex items-center justify-center text-white"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://images.pexels.com/photos/3785927/pexels-photo-3785927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container-custom text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Elite Detailing by Isaac Ali
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Drive clean. Stay fresh. Elite results, every time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleBooking}
              className="btn-primary text-lg px-8 py-4 relative z-10"
            >
              Book a Detail
            </button>
            <button 
              onClick={scrollToServices} 
              className="btn-secondary text-lg px-8 py-4 relative z-10"
            >
              Explore Services
            </button>
          </div>
        </motion.div>
      </div>
      
      <button 
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce text-white hover:text-blue-400 transition-colors duration-300 z-10"
      >
        <ChevronDown size={32} />
      </button>
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20 pointer-events-none"></div>
    </section>
  );
};

export default Hero;