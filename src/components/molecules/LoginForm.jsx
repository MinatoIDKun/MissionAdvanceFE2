import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GoogleButton from '../atoms/GoogleButton.jsx';
import Divider from '../atoms/Divider.jsx';
import { useAuth } from '../../hooks/useAuth.js';

function LoginForm ({onLogin}) {
    const [email, setEmail] = useState('');
    const [kataSandi, setKataSandi] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [localLoading, setLocalLoading] = useState(false);
    const [localError, setLocalError] = useState('');
    const { user, loading, error, fetchUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLocalLoading(true);
        setLocalError('');

        const emailRegex = () => {
            return email.match(/^\S+@\S+\.\S+$/);
        };

        if (!emailRegex(email)) {
            setLocalError('Email tidak valid');
            setLocalLoading(false);
            return;
        }

        if (kataSandi.length < 8) {
            setLocalError('Kata sandi harus minimal 8 karakter');
            setLocalLoading(false);
            return;
        }

        try {
            await fetchUser();
            
            const foundUser = user.find(u => u.email === email);
            
            if (!foundUser) {
                setLocalError('Email tidak terdaftar');
                setLocalLoading(false);
                return;
            }
            
            if (foundUser.password !== kataSandi) {
                setLocalError('Kata sandi salah');
                setLocalLoading(false);
                return;
            }
            
            localStorage.setItem('currentUser', JSON.stringify(foundUser));
            
            if (onLogin) {
                onLogin(foundUser);
            }
            
            // Redirect ke home
            navigate('/home');
        } catch (err) {
            console.error('Login error:', err);
            setLocalError('Gagal masuk. Silakan coba lagi.');
        } finally {
            setLocalLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isLoading = localLoading || loading;
    const errorMessage = localError || error;

    return (
        <>
            <div className='container w-sm md:w-2xl lg:w-3xl lg:mt-0 mx-auto md:p-6 p-4 bg-other-primaryBackground border-1 border-other-border rounded-ss-sm'>
                <form onSubmit={handleLogin}>
                    <h1 className='text-center text-2xl md:text-3xl lg:text-5xl lg:mb-2'>Masuk ke Akun</h1>
                    <h6 className='text-textDark-secondary font-light text-center text-base md:text-md lg:text-xl'>Yuk, lanjutin belajarmu di videobelajar</h6>
                    
                    {/* Error Message */}
                    {errorMessage && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 mb-2">
                            <p>{errorMessage}</p>
                        </div>
                    )}
                    
                    <div className='mt-6 md:mt-7 lg:mt-8 xl:mt-9'>
                        {/* Email input */}
                        <label className='block text-sm font-medium text-textDark-primary mb-1'>E-Mail
                            <span className='text-red-600 ml-1.5'>*</span>
                            <input 
                                type="email" 
                                id="E-mail" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                                className='w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-primary-500 mb-6'
                            />
                        </label>

                        {/* Password Input */}
                        <label className='block text-sm font-medium text-textDark-primary mb-1'>Kata Sandi
                            <span className='text-red-600 ml-1.5'>*</span>
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"}
                                id="kata-sandi" 
                                value={kataSandi} 
                                onChange={(e) => setKataSandi(e.target.value)} 
                                required
                                className='w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-primary-500 mb-2'
                            />
                            <button 
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        
                        <div className='text-right text-sm md:mb-4 lg:mb-6 font-medium text-textDark-tertiary'>
                            <span className='hover:text-primary-400 cursor-pointer'>
                                Lupa Password?
                            </span>
                        </div>

                        <button 
                            type='submit'
                            disabled={isLoading}
                            className={`${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary-default'} text-textLight-primary w-full h-8 md:h-12 lg:h-14 rounded-xl mt-6 font-medium cursor-pointer`}
                        >
                            {isLoading ? 'Memproses...' : 'Masuk'}
                        </button>

                        <Link to={"/register"}>
                            <button 
                                type='button' 
                                className='bg-primary-100 text-primary-default w-full h-8 md:h-12 lg:h-14 rounded-xl mt-4 font-medium cursor-pointer'
                            >
                                Daftar
                            </button>
                        </Link>

                        <Divider />

                        <GoogleButton />
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginForm;