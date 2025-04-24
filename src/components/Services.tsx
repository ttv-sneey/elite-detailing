import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Car, Sparkles, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ 
  title, 
  price, 
  description, 
  features, 
  icon, 
  primary = false,
  pricingSuffix = ""
}) => {
  const Icon = icon;
  
  return (
    <motion.div 
      className={`card h-full flex flex-col ${primary ? 'border-2 border-blue-500' : ''}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={`p-6 ${primary ? 'bg-blue-50' : 'bg-white'}`}>
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold text-blue-900">${price}</span>
          <span className="text-gray-500">{pricingSuffix}</span>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <ArrowRight size={16} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto p-6 pt-0">
        <Link to="/booking" className={`w-full block text-center py-2 px-4 rounded-md font-medium ${
          primary 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-gray-100 text-blue-600 hover:bg-gray-200'
        } transition-colors`}>
          Book Now
        </Link>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our premium car detailing packages, designed to keep your vehicle looking its absolute best.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Premium Packages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Express Package */}
            <ServiceCard 
              title="Express Package"
              price="200"
              pricingSuffix=" (Car) / $220 (SUV)"
              description="A comprehensive detailing service to keep your vehicle looking fresh."
              features={[
                "Interior shampooing",
                "Leather care",
                "Complete vacuum",
                "Mat cleaning",
                "Headliner cleaning",
                "Interior & exterior glass cleaning",
                "Deodorization",
                "Hand wash",
                "Wheel cleaning",
                "Tire shine"
              ]}
              icon={Car}
            />
            
            {/* Gold Package */}
            <ServiceCard 
              title="Gold Package"
              price="380"
              pricingSuffix=" (Car) / $400 (SUV)"
              description="Our premium detailing service with paint enhancement and protection."
              features={[
                "Everything in Express Package",
                "Paint enhancement polishing",
                "Ceramic coating application",
                "Optional add-on: 3-step deep paint correction"
              ]}
              icon={Sparkles}
              primary={true}
            />
            
            {/* Always Fresh Program */}
            <ServiceCard 
              title="Always Fresh Program"
              price="80"
              pricingSuffix="/detail (Car) / $90 (SUV)"
              description="Our subscription service for regular maintenance at a significant discount."
              features={[
                "Choose Express or Gold package",
                "Bi-weekly or Monthly cleanings",
                "25% off per detail",
                "Priority scheduling",
                "Consistent maintenance",
                "Flexible scheduling"
              ]}
              icon={Shield}
            />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-center mb-8">A La Carte Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-6">
              <h4 className="font-bold text-lg mb-3">Full Interior Detail</h4>
              <p className="mb-2">Car: $125 | SUV: $145</p>
              <p className="text-gray-600">Complete interior cleaning and restoration, including shampooing, leather care, and deodorization.</p>
            </div>
            
            <div className="card p-6">
              <h4 className="font-bold text-lg mb-3">Full Exterior Detail</h4>
              <p className="mb-2">Car: $90 | SUV: $100</p>
              <p className="text-gray-600">Thorough exterior washing, polishing, and protection to restore your vehicle's shine.</p>
            </div>
            
            <div className="card p-6">
              <h4 className="font-bold text-lg mb-3">Glass Coating</h4>
              <p className="mb-2">Car: $25 | SUV: $40</p>
              <p className="text-gray-600">Professional glass treatment for improved visibility and water repellency.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold mb-4">Custom Services</h3>
          <p className="mb-6">For Touch-ups, Paint Correction, or Ceramic Coating, please contact us with your vehicle details.</p>
          <a href="#contact" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
            Request Custom Service <ArrowRight size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;