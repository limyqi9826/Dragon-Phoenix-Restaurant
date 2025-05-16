import React, { useEffect } from 'react';
import 'animate.css';
import { useNavigate } from 'react-router-dom';

const MenuSection = () => {
  const navigate = useNavigate();
  const featuredDishes = [
    {
      id: 1,
      chineseName: '北京烤鴨',
      englishName: 'Peking Duck',
      description: 'Crispy roasted duck served with thin pancakes, hoisin sauce, and fresh scallions',
      price: '$38',
      image: '/images/peking-duck.jpg'
    },
    {
      id: 2,
      chineseName: '宮保雞丁',
      englishName: 'Kung Pao Chicken',
      description: 'Spicy stir-fried chicken with peanuts, vegetables, and chili peppers',
      price: '$22',
      image: '/images/kung-pao.jpg'
    },
    {
      id: 3,
      chineseName: '小籠包',
      englishName: 'Soup Dumplings',
      description: 'Delicate steamed dumplings filled with pork and hot, flavorful broth',
      price: '$16',
      image: '/images/dumplings.jpg'
    },
    {
      id: 4,
      chineseName: '麻婆豆腐',
      englishName: 'Mapo Tofu',
      description: 'Silken tofu in a spicy sauce with minced pork and Sichuan peppercorns',
      price: '$18',
      image: '/images/mapo-tofu.jpg'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // For grid cards, add a delay based on their index
          if (entry.target.classList.contains('dish-card')) {
            const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
            entry.target.style.animationDelay = `${index * 0.2}s`;
          }
          entry.target.style.opacity = '1';
          entry.target.classList.add('animate__animated', 'animate__flipInX');
          entry.target.classList.remove('animate__flipOutX');
        } else {
          if (entry.target.classList.contains('animate__flipInX')) {
            entry.target.style.animationDelay = '0s'; // Reset delay for out animation
            entry.target.classList.add('animate__animated', 'animate__flipOutX');
            entry.target.classList.remove('animate__flipInX');
          }
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px'
    });

    document.querySelectorAll('.dish-card').forEach(card => {
      card.style.opacity = '0';
      card.style.animationDuration = '1s';
      observer.observe(card);
    });

    const title = document.querySelector('.section-title');
    if (title) {
      title.style.opacity = '0';
      observer.observe(title);
    }

    return () => observer.disconnect();
  }, []);

  const handleViewFullMenu = () => {
    navigate('/all-menu');
    // Reset scroll position to top after navigation
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      id="menu"
      className="menu-section py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <h2 className="section-title text-4xl font-bold text-center mb-16 text-red-900">
          <span className="block font-cursive text-golden mb-2">招牌菜</span>
          Signature Dishes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredDishes.map((dish) => (
            <div 
              key={dish.id}
              className="dish-card bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={dish.image} 
                  alt={dish.englishName}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-red-900">
                  <span className="block text-golden">{dish.chineseName}</span>
                  {dish.englishName}
                </h3>
                <p className="text-gray-600 my-3">{dish.description}</p>
                <p className="text-golden font-bold">{dish.price}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button 
            onClick={handleViewFullMenu}
            className="bg-red-900 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;