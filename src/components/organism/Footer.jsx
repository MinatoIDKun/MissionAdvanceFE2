import React, { useState } from 'react';

function Footer() {
    const [expandedSections, setExpandedSections] = useState({
        kategori: false,
        perusahaan: false,
        komunitas: false
    });

    const toggleSection = (section) => {
        setExpandedSections({
            ...expandedSections,
            [section]: !expandedSections[section]
        });
    };

    return (
    <>
    <footer className='border-t border-other-border bg-other-primaryBackground w-full mt-16 py-8'>
        <div className='container mx-auto px-4 lg:px-20'>
            {/* Main Footer Content */}
            <div className='flex flex-col md:flex-row justify-between mb-8'>
                {/* Company Info Section - Left Side */}
                <div className='w-full md:w-1/3 mb-8 md:mb-0 md:pr-12'>
                    <img
                        src={'src/assets/images/logo-videobelajar.svg'}
                        alt='logo-videobelajar'
                        className='mb-4'
                    />
                    <p className='text-textDark-primary mb-2 font-bold'>
                        Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
                    </p>
                    <p className='text-textDark-secondary mb-1'>
                        Jl. Usman Effendi No. 50 Lowokwaru, Malang
                    </p>
                    <p className='text-textDark-secondary'>
                        +62-877-7123-1234
                    </p>
                </div>

                {/* Footer Links Section - Right Side */}
                <div className='w-full md:4/5 md:'>
                    <div className='flex flex-wrap'>
                        {/* Kategori Column */}
                        <div className='w-full md:w-1/3 mb-4 md:mb-0'>
                            <div 
                                className='flex justify-between items-center cursor-pointer md:cursor-default'
                                onClick={() => toggleSection('kategori')}
                            >
                                <h4 className='font-bold text-textDark-primary mb-2 md:mb-4'>Kategori</h4>
                                <span className='md:hidden'>
                                    {expandedSections.kategori ? '−' : '+'}
                                </span>
                            </div>
                            <ul className={`transition-all duration-300 overflow-hidden ${expandedSections.kategori ? 'max-h-60' : 'max-h-0 md:max-h-60'}`}>
                                <li className='mb-2 text-textDark-secondary'>Digital & Teknologi</li>
                                <li className='mb-2 text-textDark-secondary'>Pemasaran</li>
                                <li className='mb-2 text-textDark-secondary'>Manajemen Bisnis</li>
                                <li className='mb-2 text-textDark-secondary'>Pengembangan Diri</li>
                                <li className='mb-2 text-textDark-secondary'>Desain</li>
                            </ul>
                        </div>

                        {/* Perusahaan Column */}
                        <div className='w-full md:w-1/3 mb-4 md:mb-0'>
                            <div 
                                className='flex justify-between items-center cursor-pointer md:cursor-default'
                                onClick={() => toggleSection('perusahaan')}
                            >
                                <h4 className='font-bold text-textDark-primary mb-2 md:mb-4'>Perusahaan</h4>
                                <span className='md:hidden'>
                                    {expandedSections.perusahaan ? '−' : '+'}
                                </span>
                            </div>
                            <ul className={`transition-all duration-300 overflow-hidden ${expandedSections.perusahaan ? 'max-h-60' : 'max-h-0 md:max-h-60'}`}>
                                <li className='mb-2 text-textDark-secondary'>Tentang Kami</li>
                                <li className='mb-2 text-textDark-secondary'>FAQ</li>
                                <li className='mb-2 text-textDark-secondary'>Kebijakan Privasi</li>
                                <li className='mb-2 text-textDark-secondary'>Ketentuan Layanan</li>
                                <li className='mb-2 text-textDark-secondary'>Bantuan</li>
                            </ul>
                        </div>

                        {/* Komunitas Column */}
                        <div className='w-full md:w-1/3'>
                            <div 
                                className='flex justify-between items-center cursor-pointer md:cursor-default'
                                onClick={() => toggleSection('komunitas')}
                            >
                                <h4 className='font-bold text-textDark-primary mb-2 md:mb-4'>Komunitas</h4>
                                <span className='md:hidden'>
                                    {expandedSections.komunitas ? '−' : '+'}
                                </span>
                            </div>
                            <ul className={`transition-all duration-300 overflow-hidden ${expandedSections.komunitas ? 'max-h-60' : 'max-h-0 md:max-h-60'}`}>
                                <li className='mb-2 text-textDark-secondary'>Tips Sukses</li>
                                <li className='mb-2 text-textDark-secondary'>Blog</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className='flex flex-col-reverse md:flex-row md:justify-between md:items-center text-textDark-secondary border-t border-other-border pt-4 gap-3'>
                <div className='md:bottom'>
                <p className=''>@2023 Gerobak Sayur All Rights Reserved.</p>
                </div>
                {/* Social Media Icons */}
                <div className='flex gap-5'>
                <img 
                    src={'src/assets/images/linkedin.svg'} 
                    alt="Facebook" 
                    className='w-10 h-10'
                />
                <img 
                    src={'src/assets/images/facebook.svg'}
                    alt="LinkedIn" 
                    className='w-10 h-10'
                />
                <img 
                    src={'src/assets/images/instagram.svg'}
                    alt="Instagram" 
                    className='w-10 h-10'
                />
                <img 
                    src={'src/assets/images/twitter.svg'}
                    alt="Twitter" 
                    className='w-10 h-10'
                />
                </div>
            </div>
        </div>
    </footer>
    </>
    )
}    

export default Footer