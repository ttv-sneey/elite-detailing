import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ThankYouPage = () => {
  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle size={48} className="text-green-600" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for booking with us. We've sent a confirmation email with all the details.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
              <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  You will receive a confirmation email from Calendly with your appointment details, including:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Date and time of your appointment</li>
                  <li>Service details</li>
                  <li>Location information</li>
                  <li>What to expect</li>
                </ul>
                <p className="text-gray-600">
                  If you need to make any changes to your booking, you can do so directly through the link in your confirmation email.
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <Link to="/" className="btn-primary">
                Return to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYouPage;