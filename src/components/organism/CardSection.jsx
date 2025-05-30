import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../molecules/Card.jsx';
import { useProducts } from '../../hooks/useProducts.js';

function CardSection () {
  const [activeCategory, setActiveCategory] = useState('semua');
  const {products, loading, error} = useProducts();
  const navigate = useNavigate();

  const toAdmin = () => {
    navigate('/admin');
  };
  
  const categories = [
    { id: 'semua', name: 'Semua Kelas' },
    { id: 'pemasaran', name: 'Pemasaran' },
    { id: 'desain', name: 'Desain' },
    { id: 'pengembangan', name: 'Pengembangan Diri' },
    { id: 'bisnis', name: 'Bisnis' }
  ];

  const filteredCards = useMemo(() => {
    if (activeCategory === 'semua') {
      return products;
    }
    return products.filter(card => card.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <>
      <div className='container mx-auto px-4 lg:px-20'>
        <h3>Koleksi Video Pembelajaran Unggulan</h3>
        <p className='text-textDark-secondary mb-6'>Jelajahi Dunia Pengetahuan Melalui Pilihan Kami</p>
        
        <div className='relative mb-8 overflow-hidden'>
          <div className='flex overflow-x-auto pb-3 hide-scrollbar justify-between'>
            <div className='flex gap-6 min-w-max'>
              {categories.map((category) => (
                <div key={category.id} className="relative">
                  <button
                    className={`py-3 px-1 text-sm font-medium transition-colors whitespace-nowrap ${
                      activeCategory === category.id
                        ? 'text-tertiary-default hover:cursor-pointer'
                        : 'text-textDark-secondary hover:cursor-pointer'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                  
                  {/* Underline */}
                  <div 
                    className={`absolute bottom-0 left-0 h-1 pb-1 bg-tertiary-default transition-transform duration-300 w-full rounded-xl ${
                      activeCategory === category.id 
                        ? 'scale-x-50' 
                        : 'scale-x-0'
                    }`}
                    style={{ transformOrigin: 'left' }}
                  ></div>
                </div>
              ))}
            </div>
            <button
              type='button'
              onClick={toAdmin}
              className='rounded-2xl text-white bg-primary-default p-2'
            >
              Admin
            </button>
          </div>
        </div>
        
        {/* Cards Container */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {loading ? (
            <div className="col-span-full text-center py-8">
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-8 text-red-500">
              <p>Error: {error}</p>
            </div>
          ) : filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <Card 
                key={card.id}
                image={card.image}
                title={card.title}
                description={card.description}
                avatar={card.avatar}
                role={card.role}
                profileIcon={card.profileIcon}
                ratingIcon={card.ratingIcon}
                rating={card.rating}
                price={card.price}
                category={card.category}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p>Tidak ada kelas dalam kategori ini.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CardSection;
