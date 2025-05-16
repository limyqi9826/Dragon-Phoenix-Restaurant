import React, { useEffect } from 'react';
import 'animate.css';

const AboutSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const target = entry.target;
  
        if (entry.isIntersecting) {
          target.style.opacity = '1';
  
          if (target.classList.contains('animated-line')) {
            target.classList.add('animate__animated', 'animate__fadeInDown');
            target.classList.remove('animate__fadeOutUp');
          }
  
          if (target.classList.contains('animated-flip')) {
            target.classList.add('animate__animated', 'animate__flipInX');
            target.classList.remove('animate__flipOutX');
          }
        } else {
          if (target.classList.contains('animated-line')) {
            target.classList.add('animate__animated', 'animate__fadeOutUp');
            target.classList.remove('animate__fadeInDown');
          }
  
          if (target.classList.contains('animated-flip')) {
            target.classList.add('animate__animated', 'animate__flipOutX');
            target.classList.remove('animate__flipInX');
          }
        }
      });
    }, { threshold: 0.1 });
  
    const lines = document.querySelectorAll('.animated-line, .animated-flip');
    lines.forEach((line, index) => {
      line.style.opacity = '0';
      line.style.animationDelay = `${index * 0.3}s`;
      observer.observe(line);
    });
  
    return () => observer.disconnect();
  }, []);

  const handleMeetChefClick = (e) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      const navHeight = document.querySelector('nav')?.offsetHeight || 0;
      const elementPosition = contactSection.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };
    
  return (
    <section 
      id="about"
      className="about-section py-20 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 bg-pattern bg-[url('../public/images/chinese-pattern.jpg')]"></div>
      <div className="absolute top-20 left-10 opacity-10 chopsticks-icon">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="#D4AF37">
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title text-4xl font-bold text-center mb-16 text-red-900">
          <span className="block font-cursive text-golden mb-2">我们的故事</span>
          Our Story
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div 
            className="image-section animated-flip relative w-full lg:w-1/2 rounded-lg overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-golden opacity-10"></div>
            <img 
              src="/images/restaurant-interior.jpg" 
              alt="Dragon Phoenix Restaurant Interior"
              className="w-full h-auto object-cover transform transition-all duration-500 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
              <p className="font-cursive text-golden text-xl">Since 1985</p>
            </div>
          </div>

          <div className="text-content w-full lg:w-1/2">
            <div className="animated-line">
              <h3 className="text-2xl font-bold text-red-900 mb-4">
                Authentic Flavors, Modern Elegance
              </h3>
            </div>

            <div className="animated-line">
              <p className="text-gray-700 mb-4">
              Founded by Master Chef Li Wei in New York's Chinatown, Dragon Phoenix brings three generations of culinary tradition to your table. Our recipes originate from Sichuan province, perfected over decades.
              </p>
            </div>

            <div className="animated-line">
              <p className="text-gray-700 mb-6">
              We combine time-honored techniques with seasonal ingredients, creating a harmony of flavors that celebrates both tradition and innovation.
              </p>
            </div>

            <div className="animated-line">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="text-golden mr-3 mt-1">✓</div>
                  <p>Recipes passed down from Imperial chefs</p>
                </div>
                <div className="flex items-start">
                  <div className="text-golden mr-3 mt-1">✓</div>
                  <p>Locally-sourced organic ingredients</p>
                </div>
                <div className="flex items-start">
                  <div className="text-golden mr-3 mt-1">✓</div>
                  <p>Modern interpretation of classic dishes</p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleMeetChefClick}
              className="mt-8 bg-red-900 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Meet Our Chef
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;