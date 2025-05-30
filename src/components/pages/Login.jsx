import React, { useState } from 'react';
import Navbar from '../organism/Navbar.jsx';
import LoginForm from '../molecules/LoginForm.jsx';

function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin2 = () => {
        setIsLoggedIn(true);
    };
    
    return (
        <>
        <main className='m-0 p-0 flex flex-col bg-baseBackground min-h-screen'>
            <Navbar isLoggedIn={false} />
            {!isLoggedIn ? (
            <section className='flex container m-auto py-32 lg:py-0 px-4'>
                <LoginForm onLogin={handleLogin2} />
            </section>
            ) : null
        }
        </main>
        </>
    )
}

export default Login