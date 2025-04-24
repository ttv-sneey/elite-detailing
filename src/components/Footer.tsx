import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Instagram, Facebook, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-white">
      <div className="container-custom pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <Car size={24} className="mr-2" />
              <span className="text-xl font-bold">Elite Detailing</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Premium car detailing services that keep your vehicle looking its best.
              Drive clean. Stay fresh. Elite results, every time.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/elite_detailing_l6/" className="text-white hover:text-blue-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="mailto:info@elitedetailing.com" className="text-white hover:text-blue-300 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-white transition-colors">
                  Book a Detail
                </Link>
              </li>
              <li>
                <a href="/#contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>416-269-1305</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:info@elitedetailing.com" className="hover:text-blue-300 transition-colors">
                  info@elitedetailing.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Hours of Operation</h4>
              <p className="text-gray-300">Monday - Friday: 8am - 6pm</p>
              <p className="text-gray-300">Saturday: 9am - 4pm</p>
              <p className="text-gray-300">Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {currentYear} Elite Detailing by Isaac Ali. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;