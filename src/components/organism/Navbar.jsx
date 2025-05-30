import React, { useState } from 'react'

function Navbar ({isLoggedIn}) {

    return (
    <>
    <nav className='border-b-1 border-other-border bg-other-primaryBackground z-1000 fixed w-full drop-shadow-lg md:drop-shadow-none'>
            {!isLoggedIn ? 
            <div className='flex container mx-auto py-4 lg:px-20'>
            <img
                src={'src/assets/images/logo-videobelajar.svg'}
                alt='logo-videobelajar'
                className='h-12 md:h-14'
            />
            </div>
             : 
            <div className='flex container mx-auto py-4 lg:px-20 justify-between'>
                <img
                    src={'src/assets/images/logo-videobelajar.svg'}
                    alt='logo-videobelajar'
                    className='h-12 md:h-14'
                />
                <div className='flex justify-between items-center gap-5'>
                    <button className='text-textDark-secondary hidden md:block'>
                        Kategori
                    </button>
                    <img
                    src={'src/assets/images/Avatar-Icon/Profile.png'}
                    alt='logo-videobelajar'
                    className='h-8 md:h-12 hidden md:block'
                    />
                </div>
            </div>
            }  
    </nav>
    </>
    );
};

export default Navbar