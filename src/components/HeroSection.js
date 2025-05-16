import React, { useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import 'animate.css';
import '../App.css';

const HeroSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.classList.add('animate__animated', 'animate__fadeInUp');
          entry.target.classList.remove('animate__fadeOutDown');
        } else {
          if (entry.target.classList.contains('animate__fadeInUp')) {
            entry.target.classList.add('animate__animated', 'animate__fadeOutDown');
            entry.target.classList.remove('animate__fadeInUp');
          }
        }
      });
    }, {
      threshold: 0.2
    });

    const textElement = document.querySelector('.hero-text');
    if (textElement) {
      textElement.style.opacity = '0';
      observer.observe(textElement);
    }

    const buttonElement = document.querySelector('.hero-button');
    if (buttonElement) {
      buttonElement.style.opacity = '0';
      buttonElement.style.animationDelay = '0.5s';
      observer.observe(buttonElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="home"
      className="hero-section h-screen relative flex items-center justify-center bg-[url('../public/images/hero-bg.jpg')] bg-cover bg-center animate__animated animate__zoomInOut"
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div className="hero-text">
          <h1 className="text-6xl md:text-8xl font-cursive text-golden mb-2">
            龍鳳樓
          </h1>
          <h2 className="text-2xl md:text-3xl text-white font-light mb-8">
            Dragon Phoenix Chinese Cuisine
          </h2>
        </div>
        
        <button
          onClick={() => document.querySelector('#reservations').scrollIntoView({ behavior: 'smooth' })}
          className="hero-button bg-golden hover:bg-golden-dark text-red-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
        >
          Make a Reservation
        </button>
      </div>
      
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-2xl animate__animated animate__bounce animate__infinite"
      >
        <FaChevronDown />
      </div>
    </section>
  );
};

export default HeroSection;