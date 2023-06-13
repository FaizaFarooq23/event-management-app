import React, { useState } from 'react'
import './login.css'
import { useLocation, useNavigate } from 'react-router-dom'


export default function Login() {
  const [loggingIn, setLoggingIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const handleOnClick = (e) => {
    setLoggingIn(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = { username: userName, password: password }
    if (loggingIn) {
      fetch('http://localhost:8000/api/users/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      }).then((res) => {
        console.log(res)
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Something went wrong')
        }
      }).then((data) => {
        console.log(data)
        localStorage.setItem('user', data.username)
        localStorage.setItem('token', data._id)
        navigate(location.state?.from ? location.state.from : '/')
        window.location.reload()
      }).catch((err) => {
        console.log(err)
      })

    }
    else {
      const res = fetch('http://localhost:8000/api/users/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)

      }).then((res) => {
        console.log(res)
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Something went wrong')
        }
      }
      ).then((data) => {
        console.log(data)
        localStorage.setItem('user', data.username)
        localStorage.setItem('token', data._id)
        navigate(location.state?.from ? location.state.from : '/')
        window.location.reload()
      }
      ).catch((err) => {
        console.log(err)
      }
      )

    }


  }

  return (
    <div className=' flex justify-center items-center'>
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form id="SignupForm" onSubmit={handleSubmit} >
            <label className='labl' htmlFor="chk" aria-hidden="true">Sign up</label>
            <input className='input' type="text" name="Name" id="name" placeholder="User name" value={userName} onChange={(e) => setUserName(e.target.value)} required="" />
            <input className='input' type="password" name="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required="" />
            <button className='.butn' onClick={() => setLoggingIn(false)}>Sign up</button>
          </form>
        </div>

        <div className="login">
          <form id="login-form" onSubmit={handleSubmit}>
            <label className='labl' htmlFor="chk" aria-hidden="true">Login</label>
            <input className='input' type="text" id="Username" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" required="" />
            <input className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="Password" placeholder="Password" required="" />
            <button className='.butn' id="submitButton" type="onclick " onClick={handleOnClick}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}
