import React, { useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';
import 'animate.css';

const InfoBar = () => {
  const infoBarRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.info-item');
            items.forEach((item, i) => {
              item.classList.remove('animate__fadeOut');
              item.style.opacity = '0';
              item.style.animationDelay = `${i * 0.2}s`;
              item.classList.add('animate__animated', 'animate__bounceIn');
              item.style.opacity = '1';
            });
          } else {
            const items = entry.target.querySelectorAll('.info-item');
            items.forEach((item) => {
              item.classList.remove('animate__bounceIn');
              item.classList.add('animate__fadeOut');
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (infoBarRef.current) {
      observer.observe(infoBarRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={infoBarRef}
      className="py-8 bg-red-900 bg-opacity-90 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 bg-[url('../public/images/chinese-pattern.jpg')] bg-repeat"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-white">
          <div className="info-item flex items-center mb-4 md:mb-0">
            <FaClock className="text-golden mr-3 text-xl" />
            <div>
              <p className="font-bold">Open Daily</p>
              <p>11:00 AM - 10:00 PM</p>
            </div>
          </div>

          <div className="info-item flex items-center mb-4 md:mb-0">
            <FaMapMarkerAlt className="text-golden mr-3 text-xl" />
            <div>
              <p className="font-bold">123 Dragon Street</p>
              <p>Chinatown, New York</p>
            </div>
          </div>

          <div className="info-item flex items-center mb-4 md:mb-0">
            <FaPhone className="text-golden mr-3 text-xl" />
            <div>
              <p className="font-bold">Reservations</p>
              <p>(212) 555-8888</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;