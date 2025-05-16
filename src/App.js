import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import HeroSection from './components/HeroSection';
import Navigation from './components/Navigation';
import AboutSection from './components/AboutSection';
import MenuSection from './components/MenuSection';
import InfoBar from './components/InfoBar';
import ReservationSection from './components/ReservationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AllMenuView from './components/AllMenuView';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function App() {
  const appRef = useRef();

  useGSAP(() => {
    gsap.utils.toArray('.animate-on-scroll').forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });

    gsap.from('.dish-card', {
      opacity: 0,
      y: 100,
      stagger: 0.2,
      duration: 1,
      scrollTrigger: {
        trigger: '.menu-section',
        start: 'top 70%',
      },
    });
  }, { scope: appRef });

  return (
    <Router>
      <div className="app" ref={appRef}>
        <Navigation />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <AboutSection />
              <MenuSection />
              <InfoBar />
              <ReservationSection />
              <ContactSection />
            </>
          } />
          <Route path="/all-menu" element={<AllMenuView />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;