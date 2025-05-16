import React, { useState, useEffect } from 'react';
import 'animate.css';

const ReservationSection = () => {
  const [showGoogleForm, setShowGoogleForm] = useState(false);
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdeafbV3qcDTxRyZxwg0e_-IRBnT7N0exBRCBQ0kj11E-1ADA/viewform";

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          if (entry.target.classList.contains('section-title')) {
            entry.target.classList.add('animate__animated', 'animate__fadeInDown');
            entry.target.classList.remove('animate__fadeOutUp');
          } else {
            entry.target.classList.add('animate__animated', 'animate__flipInY');
            entry.target.classList.remove('animate__flipOutY');
          }
        } else {
          if (entry.target.classList.contains('section-title')) {
            entry.target.classList.add('animate__animated', 'animate__fadeOutUp');
            entry.target.classList.remove('animate__fadeInDown');
          } else if (!showGoogleForm) { // Only animate out if not showing Google Form
            entry.target.classList.add('animate__animated', 'animate__flipOutY');
            entry.target.classList.remove('animate__flipInY');
            entry.target.addEventListener('animationend', () => {
              if (!entry.target.classList.contains('animate__fadeInDown') && 
                  !entry.target.classList.contains('animate__flipInY')) {
                entry.target.style.opacity = '0';
              }
            }, { once: true });
          }
        }
      });
    }, {
      threshold: 0.2
    });

    const sections = document.querySelectorAll('.animate-section, .section-title');
    sections.forEach(section => {
      if (!showGoogleForm || !section.classList.contains('animate-section')) {
        section.style.opacity = '0';
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [showGoogleForm]);

  const handleReservationClick = () => {
    window.open(googleFormUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      id="reservations"
      className="py-20 relative overflow-hidden bg-[#f9f5f0]"
    >
      <div className="absolute inset-0 opacity-10 bg-pattern bg-[url('../public/images/watercolor-pattern.jpg')]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title text-4xl font-bold text-center mb-16 text-red-900">
          <span className="block font-cursive text-golden mb-2">預訂</span>
          Make a Reservation
        </h2>

        <div className="max-w-2xl mx-auto">
          <div className="animate-section bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-red-900">Ready to Book?</h3>
              <p className="text-gray-600 mt-2">
                Click below to access our secure reservation system
              </p>
            </div>
            <div className="text-center">
              <button
                onClick={handleReservationClick}
                className="bg-golden hover:bg-golden-dark text-red-900 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Reserve Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;