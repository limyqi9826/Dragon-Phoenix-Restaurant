import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  useGSAP(() => {
    // Wait for DOM to be ready
    const body = document.body;
    if (body) {
      ScrollTrigger.create({
        trigger: body,
        start: '50px top',
        onEnter: () => gsap.to(navRef.current, { backgroundColor: 'rgba(0,0,0,0.9)', duration: 0.3 }),
        onLeaveBack: () => gsap.to(navRef.current, { backgroundColor: 'transparent', duration: 0.3 }),
      });
    }
  }, { scope: navRef, dependencies: [] });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = async (e, sectionId) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      await navigate('/');
      setTimeout(() => {
        const element = document.querySelector(sectionId);
        if (element) {
          const navHeight = navRef.current.offsetHeight;
          const elementPosition = element.offsetTop - navHeight;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.querySelector(sectionId);
      if (element) {
        const navHeight = navRef.current.offsetHeight;
        const elementPosition = element.offsetTop - navHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
    
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <nav 
      ref={navRef}
      className="fixed w-full z-50 transition-all duration-300 bg-transparent"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-cursive text-golden">
          龍鳳樓
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-white hover:text-golden transition drop-shadow-lg hover:drop-shadow-[0_0_0.3rem_#BF9B30]">Home</a>
          <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="text-white hover:text-golden transition drop-shadow-lg hover:drop-shadow-[0_0_0.3rem_#BF9B30]">About</a>
          <a href="#menu" onClick={(e) => handleNavClick(e, '#menu')} className="text-white hover:text-golden transition drop-shadow-lg hover:drop-shadow-[0_0_0.3rem_#BF9B30]">Menu</a>
          <a href="#reservations" onClick={(e) => handleNavClick(e, '#reservations')} className="text-white hover:text-golden transition drop-shadow-lg hover:drop-shadow-[0_0_0.3rem_#BF9B30]">Reservations</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="text-white hover:text-golden transition drop-shadow-lg hover:drop-shadow-[0_0_0.3rem_#BF9B30]">Contact</a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white text-2xl"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 w-full py-4 px-4">
          <div className="flex flex-col space-y-4">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-white hover:text-golden transition drop-shadow-lg hover:drop-shadow-[0_0_0.3rem_#BF9B30]">Home</a>
            <a href="#menu" onClick={(e) => handleNavClick(e, '#menu')} className="text-white hover:text-golden transition drop-shadow-lg hover:drop-shadow-[0_0_0.3rem_#BF9B30]">Menu</a>
            <a href="#reservations" onClick={(e) => handleNavClick(e, '#reservations')} className="text-white hover:text-golden transition drop-shadow-lg hover:drop-shadow-[0_0_0.3rem_#BF9B30]">Reservations</a>
            <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="text-white hover:text-golden transition drop-shadow-lg hover:drop-shadow-[0_0_0.3rem_#BF9B30]">About</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="text-white hover:text-golden transition drop-shadow-lg hover:drop-shadow-[0_0_0.3rem_#BF9B30]">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;