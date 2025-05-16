import React, { useEffect, useRef, useState } from 'react';
import 'animate.css';

const ContactSection = () => {
  const sectionRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
  
        if (entry.isIntersecting) {
          if (el.classList.contains('animated-fade')) {
            el.classList.add('animate__animated', 'animate__fadeInDown');
            el.classList.remove('animate__fadeOutDown');
            el.classList.remove('opacity-0');
          }
  
          if (el.classList.contains('animated-pin')) {
            el.classList.add('animate__animated', 'animate__bounceInDown');
          }
  
          if (el.classList.contains('animated-stagger')) {
            const children = el.querySelectorAll('.form-field');
            children.forEach((child, index) => {
              child.style.animationDelay = `${index * 0.2}s`;
              child.classList.add('animate__animated', 'animate__fadeInDown');
              child.classList.remove('animate__fadeOutDown');
              child.classList.remove('opacity-0');
            });
          }
        } else {
          if (el.classList.contains('animated-fade')) {
            el.classList.add('animate__animated', 'animate__fadeOutDown');
            el.classList.remove('animate__fadeInDown');
            el.classList.add('opacity-0');
          }
  
          if (el.classList.contains('animated-stagger')) {
            const children = el.querySelectorAll('.form-field');
            children.forEach((child) => {
              child.classList.add('animate__animated', 'animate__fadeOutDown');
              child.classList.remove('animate__fadeInDown');
              child.classList.add('opacity-0');
            });
          }
        }
      });
    }, { threshold: 0.2 });
  
    const targets = sectionRef.current.querySelectorAll('.animated-fade, .animated-pin, .animated-stagger');
    targets.forEach((t) => observer.observe(t));
  
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const formattedPhone = value.replace(/[^\d\s()-]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: formattedPhone
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, email, message, phone } = formData;
  
    if (!name.trim() || !email.trim() || !message.trim() || !phone.trim()) {
      setSubmitStatus('error');
      alert('Please fill in all required fields (Name, Email, Message)');
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch('https://formsubmit.co/ajax/5f6ef1e7509b6ad5f7475faa522859ad', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          _subject: `New message from ${name} (Dragon Phoenix Website)`
        })
      });
  
      const data = await response.json();
      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="contact-section py-20 bg-[#f9f5f0] relative overflow-hidden"
    >
      <div className="absolute top-20 right-10 opacity-20 floating-lantern animate__animated animate__pulse animate__infinite animate__slow">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="#D4AF37">
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 text-red-900 animated-fade opacity-0">
          <span className="block font-cursive text-golden mb-2">联系我们</span>
          Contact Us
        </h2>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Map */}
          <div className="w-full lg:w-1/2 rounded-xl overflow-hidden shadow-xl relative">
            <div className="h-full bg-gray-200">
              <img 
                src="/images/map-location.jpg" 
                alt="Restaurant Location"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="map-pin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-900 text-4xl">
              📍
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4">
              <p className="font-bold">123 Dragon Street, Chinatown, New York</p>
              <p>Nearest subway: Canal St (N, Q, R, W, 6, J, Z)</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-1/2 bg-white p-8 rounded-xl shadow-xl animated-stagger">
            <h3 className="text-2xl font-bold text-red-900 mb-6">
              Send Us a Message
            </h3>

            {submitStatus === 'success' ? (
              <div className="animate__animated animate__fadeIn bg-green-100 text-green-800 p-4 rounded mb-6">
                Thank you! Your message has been sent. We'll respond within 24 hours.
              </div>
            ) : submitStatus === 'error' ? (
              <div className="animate__animated animate__fadeIn bg-red-100 text-red-800 p-4 rounded mb-6">
                Error sending message. Please try again or call us directly.
              </div>
            ) : null}

            <form onSubmit={handleSubmit}>
              <div className="form-field mb-4 opacity-0">
                <label className="block text-gray-700 mb-2">Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-golden"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="form-field mb-4 opacity-0">
                <label className="block text-gray-700 mb-2">Email *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-golden"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div className="form-field mb-4 opacity-0">
                <label className="block text-gray-700 mb-2">Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-golden"
                  placeholder="(123) 456-7890"
                  pattern="[\d\s()-]+"
                  title="Please enter a valid phone number"
                  required
                />
                <small className="text-gray-500 mt-1">Format: (123) 456-7890</small>
              </div>
              
              <div className="form-field mb-6 opacity-0">
                <label className="block text-gray-700 mb-2">Message *</label>
                <textarea 
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-golden"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`form-field w-full opacity-0 bg-golden hover:bg-golden-dark text-red-900 font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;