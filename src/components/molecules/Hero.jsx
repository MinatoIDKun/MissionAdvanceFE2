import React from 'react';


function Hero() {

    return (
    <>
    <section className='container mx-auto px-4 lg:px-20 mb-16'>
        <div className='w-full py-8 md:py-10 px-4 md:px-8 lg:px-12 bg-other-primaryBackground rounded-xl'
        style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("src/assets/images/d25fa2121b31a4ad14c9ebd02127f629.jpeg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            <h1 className='text-center text-textLight-primary text-3xl md:text-4xl lg:text-5xl'>
                Revolusi Pembelajaran: Temukan 
                Ilmu Baru melalui Platform Video Interaktif!
            </h1>
            <p className='text-center text-textLight-primary my-6'>
                Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi.
                Tidak hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda.
            </p>
            <button className='flex mx-auto p-2 md:px-6 justify-center bg-primary-default rounded-xl text-textLight-primary md:font-bold'
            type="button">
                Temukan Video Course untuk Dipelajari!
            </button>
        </div>
    </section>
    </>
    )
}

export default Hero