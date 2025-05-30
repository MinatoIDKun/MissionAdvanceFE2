import React from 'react';

function GoogleButton () {

  return (
    <>
    <button className='bg-white text-textDark-tertiary font-bold border-1 border-other-border2 w-full h-8 md:h-12 lg:h-14 rounded-xl mt-6 flex justify-center items-center cursor-pointer'>
        <img src='src/assets/images/google-icon.svg' alt='google-icon' 
        className='mr-2.5' />
        Masuk dengan Google
    </button>
    </>
    )
}

export default GoogleButton