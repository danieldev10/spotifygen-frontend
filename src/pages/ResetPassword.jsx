import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const res = await axios.post('http://localhost:3000/auth/reset-password', { token, password });
            setMessage(res.data.message);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='shadow-lg px-8 py-5 border w-80'>
                <h2 className='text-lg font-bold mb-4'>Reset Password</h2>
                {message && <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 mb-3 rounded text-sm">{message}</div>}
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 mb-3 rounded text-sm">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className='block text-gray-700'>New Password</label>
                        <input type="password" placeholder='Enter new password' className='w-full px-3 py-2 border' value={password} onChange={e => setPassword(e.target.value)} required />
                        <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.</p>
                    </div>
                    <button className="w-full bg-green-600 text-white py-2">Reset Password</button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword; 