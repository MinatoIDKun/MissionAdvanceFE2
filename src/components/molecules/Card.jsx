import React from 'react';

function Card({ 
  image, 
  title, 
  description, 
  avatar, 
  role, 
  ratingIcon, 
  rating, 
  profileIcon,
  price,
  category
}) {
  // const contentDescription = ()


  return (
    <>
    <div className="p-4 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-other-border">
      {/* Gambar */}
      <div className='flex md:flex-col'>
        <div className="w-full h-48 overflow-hidden mb-4">
          <img 
            src={image || "src/assets/images/Card-Images/img1.svg"} 
            alt={title || "Card title"} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Konten */}
        <div className='flex flex-col'>
          <div className="mb-4">
            <h6 className="font-semibold text-lg mb-2">
              {title || "Big 4 Auditor Financial Analyst"}
            </h6>
            
            <p className="text-textDark-secondary text-sm hidden md:block">
              {description || "Mulai transformasi dengan instruktur profesional, harga yang terjangkau dan kurikulum terbaik."}
            </p>
          </div>

          { /* Deskripsi */ }
          <div className="flex items-center">
            <img
              src={profileIcon || "src/assets/images/Avatar-Icon/avatar1.svg"} 
              alt={title || "Avatar Icon"}
              className='rounded-xl w-10 h-10 mr-2'
            />

            <div className='flex flex-col'>
            <p className='text-dark-primary font-bold'>
              {avatar || "Jenna Ortega"}
            </p>
            
            <p className='hidden md:block text-textDark-secondary'>
              Senior accountant di
              <span className='font-bold text-textDark-secondary ml-1'>{ role || "Gojek" }</span>
            </p>

            <p className='block md:hidden text-textDark-secondary'>
              {role || "Senior accountant"}
            </p>

            </div>
          </div>
        </div>
      </div>

      { /* Rating & Harga */ }
       <div className="flex justify-between items-center mt-4">
        <div className='flex'>
          <img
          src={ratingIcon || "src/assets/images/yellow-star.svg"}
          />
          <img
          src={ratingIcon || "src/assets/images/yellow-star.svg"}
          />
          <img
          src={ratingIcon || "src/assets/images/half-star.svg"}
          />
          <img
          src={ratingIcon || "src/assets/images/blank-star.svg"}
          />
          <img
          src={ratingIcon || "src/assets/images/blank-star.svg"}
          />
          <p className='underline text-textDark-secondary ml-2'>
          {rating || "3.5 (86)"}
          </p>
        </div>

        <div>
          <h4 className='text-primary-default'>{price || "300K"}</h4>
        </div>
      </div>

    </div>
    </>
  );
}

export default Card;
