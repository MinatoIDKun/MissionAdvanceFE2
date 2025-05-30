import React from 'react'

function Newsletter () {

  return (
    <section className='container mx-auto px-4 lg:px-20 mb-16'>
        <div className='w-full py-8 md:py-10 px-4 md:px-8 lg:px-12 bg-other-primaryBackground rounded-xl shadow-other-baseBackground shadow-2xl'
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("src/assets/images/cc34e79e1f52284620dbea34fb453966.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}> 
          <p className='text-center text-textLight-secondary uppercase text-sm md:text-base'>
            Newsletter
          </p>
          <h3 className='text-center text-textLight-primary my-2.5 text-xl md:text-2xl lg:text-3xl font-bold'>
            Mau Belajar Lebih Banyak?
          </h3>
          <p className='text-center text-textLight-primary text-sm md:text-base max-w-3xl mx-auto'>
          Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik hariesok.id
          </p>

          <div className='relative mt-6 md:mt-10 max-w-xl mx-auto'>
            <input className='w-full h-12 md:h-14 bg-other-primaryBackground rounded-xl text-textDark-secondary text-sm md:text-md px-4'
            placeholder='Masukkan Emailmu'
            >
            </input>
            <button className='absolute right-2 top-1/2 transform -translate-y-1/2 w-24 md:w-32 h-8 md:h-10 bg-secondary-default rounded-xl text-textLight-primary font-bold text-xs md:text-md'>
              Subscribe
            </button>
          </div>
        </div>
    </section>
  )

}

export default Newsletter