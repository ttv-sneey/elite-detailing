import React from 'react';
import { motion } from 'framer-motion';
import CalendlyWidget from '../components/CalendlyWidget';

const BookingPage = () => {
  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-center mb-2">Book Your Detailing Service</h1>
          <p className="text-gray-600 text-center mb-8">Select a date and time that works for you</p>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <CalendlyWidget 
              url="https://calendly.com/arjunnatt99?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=ffffff"
              minWidth="100%"
              height="700px"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;