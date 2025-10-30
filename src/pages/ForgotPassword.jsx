import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const res = await axios.post('http://localhost:3000/auth/forgot-password', { email });
            setMessage(res.data.message);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='shadow-lg px-8 py-5 border w-80'>
                <h2 className='text-lg font-bold mb-4'>Forgot Password</h2>
                {message && <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 mb-3 rounded text-sm">{message}</div>}
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 mb-3 rounded text-sm">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className='block text-gray-700'>Email</label>
                        <input type="email" placeholder='Enter your email' className='w-full px-3 py-2 border' value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2">Send Reset Link</button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword; 