import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Contact from '../components/Contact';
import { ShieldCheck, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description }) => {
  const Icon = icon;
  
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const HomePage = () => {
  return (
    <>
      <Hero />
      
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose Elite Detailing</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're committed to providing exceptional car detailing services with attention to detail and premium quality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={ShieldCheck}
              title="Premium Quality"
              description="We use only the highest quality products and techniques to ensure your vehicle receives the best care possible."
            />
            <FeatureCard 
              icon={Clock}
              title="Convenient Scheduling"
              description="Our flexible booking system makes it easy to schedule your detailing service at a time that works for you."
            />
            <FeatureCard 
              icon={Star}
              title="Experienced Service"
              description="With years of experience, Isaac Ali and the team deliver exceptional results that exceed expectations."
            />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-blue-600 text-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold">Ready to make your car look its best?</h2>
              <p className="text-blue-100 mt-2">Book your detailing appointment today.</p>
            </div>
            <a 
              href="/booking" 
              className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-blue-50 transition-colors"
            >
              Book a Detail
            </a>
          </div>
        </div>
      </section>
      
      <Services />
      <Contact />
    </>
  );
};

export default HomePage;