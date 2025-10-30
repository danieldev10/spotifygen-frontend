import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'


function Home() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(true)

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                navigate('/login')
                return
            }
            const response = await axios.get('http://localhost:3000/auth/home', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.status === 201 && response.data.user) {
                setUsername(response.data.user.username)
            } else {
                navigate('/login')
            }
        } catch (err) {
            navigate('/login')
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
        // eslint-disable-next-line
    }, [])

    if (loading) return <div>Loading...</div>

    return (
        <div className='text-3xl text-blue-500'>
            {username ? `Welcome back, ${username}` : "Home"}
            <br />
            <Link to="/generate-playlist" className='text-blue-600 underline'>Generate a Playlist</Link>
            <br />
            <button onClick={handleLogout} className="text-base text-red-500 underline mt-4">Logout</button>
        </div>
    )
}

export default Home