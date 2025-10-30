import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GeneratePlaylist() {
    const [prompt, setPrompt] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await axios.post('http://localhost:3000/api/generate-playlist', { prompt }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                setMessage(`✅ Playlist created successfully!`);
            } else {
                setMessage('Something went wrong.');
            }
        } catch (err) {
            console.error(err);
            setMessage('❌ Failed to generate playlist.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen px-4'>
            <h2 className='text-2xl font-semibold mb-6 text-green-700'>Generate Spotify Playlist</h2>
            <form onSubmit={handleSubmit} className='w-full max-w-md'>
                <textarea
                    rows="4"
                    className='w-full p-3 border border-gray-300 rounded mb-4'
                    placeholder='e.g., Create a chill afrobeats playlist for a 40 minutes journey'
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    required
                />
                <button
                    type='submit'
                    disabled={loading}
                    className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700'
                >
                    {loading ? 'Generating...' : 'Generate Playlist'}
                </button>
            </form>
            {message && <div className='mt-4 text-center text-lg'>{message}</div>}
        </div>
    )
}

export default GeneratePlaylist;
