import React from 'react';
import Navbar from '../organism/Navbar';
import Footer from '../organism/Footer';

function RootLayouts (isLoggedIn) {

  return (
    <>
    <Navbar isLoggedIn={true}/>
    <Footer />
    </>
  )
}

export default RootLayouts