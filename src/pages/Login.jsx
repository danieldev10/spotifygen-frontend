import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setError(''); // Clear error when user edits any field
    }

    const handleSumbit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/auth/login', values)
            if (response.status === 201) {
                localStorage.setItem('token', response.data.token);
                navigate('/');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else if (err.request) {
                setError('No response from server.');
            } else {
                setError('Login failed.');
            }
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='shadow-lg px-8 py-5 border w-72'>
                <h2 className='text-lg font-bold mb-4'>Login</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 mb-3 rounded text-sm">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSumbit}>
                    <div className="mb-4">
                        <label htmlFor="email" className='block text-gray-700'>Email</label>
                        <input type="email" placeholder='Enter Email' className='w-full px-3 py-2 border'
                            name="email" onChange={handleChanges} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className='block text-gray-700'>Password</label>
                        <input type="password" placeholder='Enter Password' className='w-full px-3 py-2 border'
                            name="password" onChange={handleChanges} />
                    </div>
                    <button className="w-full bg-green-600 text-white py-2 ">Submit</button>
                </form>
                <a
                    href="http://localhost:3000/auth/google"
                    className="w-full bg-red-600 text-white py-2 block text-center rounded"
                >
                    Login with Google
                </a>
                <a
                    href="http://localhost:3000/auth/spotify"
                    className="w-full bg-green-600 text-white py-2 block text-center rounded"
                >
                    Login with Spotify
                </a>
                <div className="text-center">
                    <span>Don't Have Account?</span>
                    <Link to='/register' className='text-blue-500'>Signup</Link>
                </div>
            </div>
        </div>
    )
}

export default Login