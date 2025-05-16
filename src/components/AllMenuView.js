import React from 'react';
import 'animate.css';

const MenuPage = () => {
  const menuCategories = [
    {
      title: '开胃菜 | Appetizers',
      items: [
        {
          name: '春卷 | Spring Rolls',
          chineseName: '春卷',
          description: 'Crispy rolls filled with vegetables and minced pork',
          price: '$6.50',
          spicy: false,
          vegetarian: true
        },
        {
          name: '麻辣黄瓜 | Spicy Cucumber Salad',
          chineseName: '麻辣黄瓜',
          description: 'Fresh cucumbers tossed in garlic-chili oil',
          price: '$5.00',
          spicy: true,
          vegetarian: true
        },
        {
          name: '葱油饼 | Scallion Pancakes',
          chineseName: '葱油饼',
          description: 'Flaky layered pancakes with scallions',
          price: '$7.00',
          spicy: false,
          vegetarian: true
        },
        {
          name: '红油抄手 | Wontons in Chili Oil',
          chineseName: '红油抄手',
          description: 'Pork dumplings drenched in Sichuan chili sauce',
          price: '$8.50',
          spicy: true,
          vegetarian: false
        }
      ]
    },
    {
      title: '主菜 | Main Courses',
      items: [
        {
          name: '宫保鸡丁 | Kung Pao Chicken',
          chineseName: '宫保鸡丁',
          description: 'Classic Sichuan dish with chicken, peanuts, and chili',
          price: '$16.00',
          spicy: true,
          vegetarian: false
        },
        {
          name: '北京烤鸭 | Peking Duck',
          chineseName: '北京烤鸭',
          description: 'Crispy duck served with pancakes and hoisin sauce',
          price: '$38.00',
          spicy: false,
          vegetarian: false,
          popular: true
        },
        {
          name: '鱼香茄子 | Eggplant in Garlic Sauce',
          chineseName: '鱼香茄子',
          description: 'Stir-fried eggplant with savory garlic sauce',
          price: '$14.00',
          spicy: false,
          vegetarian: true
        },
        {
          name: '水煮鱼 | Sichuan Boiled Fish',
          chineseName: '水煮鱼',
          description: 'Tender fish fillets in numbing chili broth',
          price: '$22.00',
          spicy: true,
          vegetarian: false,
          popular: true
        }
      ]
    },
    {
      title: '面食 | Noodles & Rice',
      items: [
        {
          name: '四川担担面 | Dan Dan Noodles',
          chineseName: '四川担担面',
          description: 'Wheat noodles with spicy peanut-pork sauce',
          price: '$12.00',
          spicy: true,
          vegetarian: false
        },
        {
          name: '扬州炒饭 | Yangzhou Fried Rice',
          chineseName: '扬州炒饭',
          description: 'Classic fried rice with shrimp, ham, and vegetables',
          price: '$14.00',
          spicy: false,
          vegetarian: false
        },
        {
          name: '牛肉炒河粉 | Beef Chow Fun',
          chineseName: '牛肉炒河粉',
          description: 'Wide rice noodles with tender beef and bean sprouts',
          price: '$16.00',
          spicy: false,
          vegetarian: false
        }
      ]
    },
    {
      title: '甜品 | Desserts',
      items: [
        {
          name: '芒果布丁 | Mango Pudding',
          chineseName: '芒果布丁',
          description: 'Silky coconut-mango pudding with fresh fruit',
          price: '$7.00',
          spicy: false,
          vegetarian: true
        },
        {
          name: '芝麻球 | Sesame Balls',
          chineseName: '芝麻球',
          description: 'Crispy glutinous rice balls with red bean paste',
          price: '$6.50',
          spicy: false,
          vegetarian: true
        }
      ]
    }
  ];

  return (
    <div className="menu-page bg-[#f9f5f0]">
      {/* Hero Header */}
      <div className="relative h-96 bg-[url('../public/images/menu-hero.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-cursive text-golden mb-2">
            菜单
          </h1>
          <p className="text-2xl text-white">Our Culinary Journey</p>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="container mx-auto px-4 py-12">
        {menuCategories.map((category, index) => (
          <section 
            key={index} 
            className={`menu-section mb-20 ${index % 2 === 0 ? 'bg-white' : 'bg-[#f9f5f0]'} p-8 rounded-xl shadow-md`}
          >
            <h2 className="text-3xl font-bold mb-8 text-red-900 border-b-2 border-golden pb-2">
              {category.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-red-900">
                        <span className="block text-golden">{item.chineseName}</span>
                        {item.name.split('|')[1].trim()}
                      </h3>
                      <p className="text-gray-600 mt-2">{item.description}</p>
                    </div>
                    <span className="text-golden font-bold">{item.price}</span>
                  </div>
                  
                  <div className="flex mt-4 space-x-2">
                    {item.spicy && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                        Spicy
                      </span>
                    )}
                    {item.vegetarian && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Vegetarian
                      </span>
                    )}
                    {item.popular && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        Popular
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Beverage Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-red-900 border-b-2 border-golden pb-2">
            饮品 | Beverages
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: '铁观音茶 | Tieguanyin Tea', price: '$5.00' },
              { name: '珍珠奶茶 | Bubble Tea', price: '$6.50' },
              { name: '酸梅汤 | Plum Juice', price: '$4.50' },
              { name: '青岛啤酒 | Tsingtao Beer', price: '$7.00' }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-[#f9f5f0] p-6 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-bold text-red-900">
                  <span className="block text-golden">{item.name.split('|')[0].trim()}</span>
                  {item.name.split('|')[1].trim()}
                </h3>
                <p className="text-golden font-bold mt-2">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuPage;
