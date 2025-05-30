import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import GoogleButton from '../atoms/GoogleButton.jsx'
import Divider from '../atoms/Divider.jsx'
import { getUsers, addUser } from '../../hooks/useApi.js'

function RegisterForm () {
    const [email, setEmail] = useState('');
    const [kataSandi, setKataSandi] = useState('');
    const [namaLengkap, setNamaLengkap] = useState('');
    const [konfirmasiKataSandi, setKonfirmasiKataSandi] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [noHp, setNoHp] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        const emailRegex = () => {
            return email.match(/^\S+@\S+\.\S+$/);
        };

        if (!emailRegex(email)) {
            setErrorMessage('Format email tidak valid');
            setLoading(false);
            return;
        }

        const phoneRegex = () => {
            return noHp.match(/^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/);
        }

        if (!phoneRegex(noHp)) {
            setErrorMessage('Format nomor HP tidak valid');
            setLoading(false);
            return;
        }

        if (kataSandi.length < 8) {
            setErrorMessage('Kata sandi harus minimal 8 karakter');
            setLoading(false);
            return;
        }

        if (kataSandi !== konfirmasiKataSandi) {
            setErrorMessage('Kata sandi dan konfirmasi kata sandi tidak sama');
            setLoading(false);
            return;
        }

        try {
            const existingUsers = await getUsers();
            
            const emailExists = existingUsers.some(user => user.email === email);
            if (emailExists) {
                setErrorMessage('Email sudah terdaftar. Silakan gunakan email lain.');
                setLoading(false);
                return;
            }
            
            const phoneExists = existingUsers.some(user => user.phone === noHp);
            if (phoneExists) {
                setErrorMessage('Nomor HP sudah terdaftar. Silakan gunakan nomor HP lain.');
                setLoading(false);
                return;
            }

            const newUser = {
                email: email,
                password: kataSandi,
                name: namaLengkap,
                phone: noHp
            }

            await addUser(newUser);
            setSuccessMessage('Registrasi berhasil! Silakan periksa email Anda untuk melakukan validasi akun.');
            
            setTimeout(() => {
                navigate('/login');
            }, 3000);
            
        } catch (error) {
            console.error("Error saat menambahkan pengguna baru:", error);
            setErrorMessage('Registrasi gagal! Silakan coba lagi.');
        } finally {
            setLoading(false);
        }

    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

  return (
    <>
        <div className='container w-sm md:w-2xl lg:w-3xl lg:mt-0 mx-auto md:p-6 p-4 bg-other-primaryBackground border-1 border-other-border rounded-ss-sm'>
            <form onSubmit={handleRegister}>
                <h1 className='text-center text-2xl md:text-3xl lg:text-5xl lg:mb-2'>Pendaftaran Akun</h1>
                <h6 className='text-textDark-secondary font-light text-center text-base md:text-md lg:text-xl'>Yuk, daftarkan akunmu sekarang juga!</h6>
                
                {/* Error Message */}
                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 mb-2">
                        <p>{errorMessage}</p>
                    </div>
                )}
                
                {/* Success Message */}
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4 mb-2">
                        <p>{successMessage}</p>
                    </div>
                )}
                
                <div className='mt-6 md:mt-7 lg:mt-8 xl:mt-9'>
                <label className='block text-sm font-medium text-textDark-primary mb-1'>Nama Lengkap
                        <span className='text-red-600 ml-1.5'>*</span>
                        <input type="name" id="namaLengkap" value={namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)} required
                        className='w-full h-14 px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-primary-500'
                        />
                    </label>
                    <label className='block text-sm font-medium text-textDark-primary mb-1'>E-Mail
                        <span className='text-red-600 ml-1.5'>*</span>
                        <input type="email" id="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required
                        className='w-full h-14 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-primary-500'
                        />
                    </label>
                    <label className='block text-sm font-medium text-textDark-primary mb-1 mt-6'>No. Hp
                        <span className='text-red-600 ml-1.5'>*</span>
                        <div className='flex justify-around'>
                            <select className='mr-6 border border-gray-300 rounded-lg'>
                                <option value="0">+62</option>
                            </select>
                            <input className='w-full h-14 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-primary-500'
                            type='no-hp' id='no-Hp' value={noHp} onChange={(e) => setNoHp(e.target.value)} required/>
                        </div>
                    </label>
                    <label className='my-6 block text-sm font-medium text-textDark-primary mb-1'>Kata Sandi
                        <span className='text-red-600 ml-1.5'>*</span>
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
                    </label>
                    <label className='my-6 block text-sm font-medium text-textDark-primary mb-1'>Konfirmasi Kata Sandi
                        <span className='text-red-600 ml-1.5'>*</span>
                        <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"}
                            id="konfirmasi-kata-sandi" 
                            value={konfirmasiKataSandi} 
                            onChange={(e) => setKonfirmasiKataSandi(e.target.value)} 
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
                    </label>

                    <div className='text-right text-sm md:mb-4 lg:mb-6 font-medium text-textDark-tertiary'>
                    <span className='hover:text-primary-400 cursor-pointer'>
                        Lupa Password?
                    </span>
                    </div>

                    <button 
                    type='submit'
                    disabled={loading}
                    className={`${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary-default hover:bg-primary-400'} text-textLight-primary w-full h-8 md:h-12 lg:h-14 rounded-xl mt-4 font-medium cursor-pointer`}>
                        {loading ? 'Memproses...' : 'Daftar'}
                    </button>

                    <Link to={"/login"}>
                    <button
                    type="button"
                    className='bg-primary-100 text-primary-default w-full h-8 md:h-12 lg:h-14 rounded-xl mt-6 font-medium cursor-pointer'>
                        Masuk
                    </button>
                    </Link>

                    <Divider />
                    <GoogleButton />
                </div>
            </form>
        </div>
    </>
  )
}

export default RegisterForm