import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Car, Shield, Image } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="text-blue-600 mr-2">
            <Car size={28} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-blue-900">Elite Detailing</span>
            <span className="text-xs text-blue-600">by Isaac Ali</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link 
                to="/" 
                className={`${isScrolled ? 'text-blue-900' : 'text-white'} hover:text-blue-600 font-medium transition-colors`}
              >
                Home
              </Link>
            </li>
            <li>
              <a 
                href="/#services" 
                className={`${isScrolled ? 'text-blue-900' : 'text-white'} hover:text-blue-600 font-medium transition-colors`}
              >
                Services
              </a>
            </li>
            <li>
              <Link 
                to="/portfolio" 
                className={`${isScrolled ? 'text-blue-900' : 'text-white'} hover:text-blue-600 font-medium transition-colors`}
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link 
                to="/booking" 
                className={`${isScrolled ? 'text-blue-900' : 'text-white'} hover:text-blue-600 font-medium transition-colors`}
              >
                Book Now
              </Link>
            </li>
            <li>
              <a 
                href="/#contact" 
                className={`${isScrolled ? 'text-blue-900' : 'text-white'} hover:text-blue-600 font-medium transition-colors`}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-blue-900"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <ul className="container-custom py-4 space-y-4">
            <li>
              <Link 
                to="/" 
                className="block text-blue-900 hover:text-blue-600 font-medium py-2"
              >
                Home
              </Link>
            </li>
            <li>
              <a 
                href="/#services" 
                className="block text-blue-900 hover:text-blue-600 font-medium py-2"
              >
                Services
              </a>
            </li>
            <li>
              <Link 
                to="/portfolio" 
                className="block text-blue-900 hover:text-blue-600 font-medium py-2"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link 
                to="/booking" 
                className="block text-blue-900 hover:text-blue-600 font-medium py-2"
              >
                Book Now
              </Link>
            </li>
            <li>
              <a 
                href="/#contact" 
                className="block text-blue-900 hover:text-blue-600 font-medium py-2"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;