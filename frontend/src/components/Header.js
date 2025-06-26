import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
const links = [
    { label: 'Deshboard' , href: `/admin/deshboard`},
    { label: 'Options' , href: `/admin/options`},
    { label: 'Add Ons' , href: `/admin/addons` },
    {  label: 'Monograms' , href: `/admin/monograms` },
]
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white border-b-[1px] border-solid border-gray sticky top-0 z-50">
      <div className='max-w-screen-2xl mx-auto px-10 '>
      <div className="">
      <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Customizer</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {links.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="text-xs text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}

          </nav> 
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              Home
            </a>
            <a href="#" className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              About
            </a>
            
            {/* Mobile Services */}
            <div className="space-y-1">
              <button
                onClick={toggleDropdown}
                className="w-full text-left text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center justify-between"
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="pl-6 space-y-1">
                  <a href="#" className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm transition-colors duration-200">
                    Web Development
                  </a>
                  <a href="#" className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm transition-colors duration-200">
                    Mobile Apps
                  </a>
                  <a href="#" className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm transition-colors duration-200">
                    UI/UX Design
                  </a>
                </div>
              )}
            </div>
            
            <a href="#" className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              Contact
            </a>
            
            {/* Mobile CTA Buttons */}
            <div className="pt-4 pb-2 border-t border-gray-200 space-y-2">
              <a href="#" className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                Login
              </a>
              <a href="#" className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg text-base font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-center">
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
      </div>
    </header>
  );
};

export default Header;