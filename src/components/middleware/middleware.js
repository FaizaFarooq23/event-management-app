import React, { useContext, useEffect, useState } from 'react'
import Login from '../../login/login'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

export default function Middleware({ children }) {
    const [loggedIn, setLoggedIn] = useState(false)
    const { setUser } = useContext(UserContext)
    const [spinner, setSpinner] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        setSpinner(true)
        const user = (localStorage.getItem("user"))
        if (user) {
                setLoggedIn(true);
                setUser(user);
                setSpinner(false)
        } else {
            setSpinner(false)
            navigate("/login");
        }

    }, [])


    if (loggedIn) {
        return (
            <div className=" w-full">
                {children}
            </div>
        )
    }





    return (
        <>
            {/* Spinner */}
            {spinner ?
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        :
        <Login />    
        }

        </>
    )
}
