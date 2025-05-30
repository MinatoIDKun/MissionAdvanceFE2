import React from 'react';
import Navbar from '../organism/Navbar.jsx';
import RegisterForm from '../molecules/RegisterForm.jsx';

function Register() {

    return (
        <>
        <main className='m-0 p-0 flex flex-col bg-baseBackground min-h-screen'>
            <Navbar />
            <section className='flex container m-auto py-32 lg:py-0 px-4'>
                <RegisterForm />
            </section>
        </main>
        </>
    )
}

export default Register