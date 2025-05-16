import React, { useEffect } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYelp } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import 'animate.css';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const lines = document.querySelectorAll('.footer-line');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const children = entry.target.querySelectorAll('.footer-line');

        if (entry.isIntersecting) {
          children.forEach((line, i) => {
            line.classList.remove('animate__fadeOut');
            line.style.opacity = '0';
            line.style.animationDelay = `${i * 0.2}s`;
            line.classList.add('animate__animated', 'animate__fadeIn');
            line.style.opacity = '1';
          });
        } else {
          children.forEach((line) => {
            line.classList.remove('animate__fadeIn');
            line.classList.add('animate__fadeOut');
          });
        }
      });
    }, { threshold: 0.1 });

    const sectionGroups = document.querySelectorAll('.footer-section');
    sectionGroups.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = async (e, sectionId) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      await navigate('/');
    }
    
    // Wait for navigation and DOM to be ready
    setTimeout(() => {
      const element = document.querySelector(sectionId);
      if (element) {
        const elementPosition = element.offsetTop;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <footer className="bg-red-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Section */}
          <div className="footer-section">
            <h3 className="text-2xl font-cursive text-golden mb-4 footer-line">龍鳳樓</h3>
            <p className="mb-4 footer-line">Authentic Chinese cuisine with a modern touch in the heart of the city.</p>
            <div className="flex space-x-4 footer-line">
              <button className="hover:text-golden transition" aria-label="Facebook"><FaFacebook /></button>
              <button className="hover:text-golden transition" aria-label="Instagram"><FaInstagram /></button>
              <button className="hover:text-golden transition" aria-label="Twitter"><FaTwitter /></button>
              <button className="hover:text-golden transition" aria-label="Yelp"><FaYelp /></button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="text-lg font-bold mb-4 footer-line">Quick Links</h4>
            <ul className="space-y-2">
              <li className="footer-line">
                <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-white hover:text-golden transition">Home</a>
              </li>
              <li className="footer-line">
                <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="text-white hover:text-golden transition">About Us</a>
              </li>
              <li className="footer-line">
                <a href="#menu" onClick={(e) => handleNavClick(e, '#menu')} className="text-white hover:text-golden transition">Menu</a>
              </li>
              <li className="footer-line">
                <a href="#reservations" onClick={(e) => handleNavClick(e, '#reservations')} className="text-white hover:text-golden transition">Reservations</a>
              </li>
              <li className="footer-line">
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="text-white hover:text-golden transition">Contact</a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="footer-section">
            <h4 className="text-lg font-bold mb-4 footer-line">Hours</h4>
            <ul className="space-y-2">
              <li className="footer-line">Monday - Friday: 11AM - 10PM</li>
              <li className="footer-line">Saturday - Sunday: 11AM - 11PM</li>
              <li className="footer-line mt-4">Happy Hour: 3PM - 6PM Daily</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="text-lg font-bold mb-4 footer-line">Contact</h4>
            <address className="not-italic">
              <p className="footer-line">123 Dragon Street</p>
              <p className="footer-line">Chinatown, New York, NY 10013</p>
              <p className="mt-2 footer-line">Phone: (212) 555-8888</p>
              <p className="footer-line">Email: info@dragonphoenix.com</p>
            </address>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-golden/30 mt-8 pt-8 text-center footer-section">
          <p className="footer-line">&copy; {new Date().getFullYear()} Dragon Phoenix Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
