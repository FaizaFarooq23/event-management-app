import React, { useState, useEffect } from 'react'
import CommonCard from '../common/Common'
import { IoIosAddCircleOutline } from 'react-icons/io';
export default function RightSideBar({ dateSelected, setShowModal ,events }) {
  const [username, setUsername] = useState('')

  //logout function
  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    window.location.reload()
  }
  

  useEffect(()=>{
    try{
    const user = localStorage.getItem('user')
    setUsername(user)
    } catch{
      setUsername('User')
    }
  },[])

    
const handleAddEvent = () => {
  setShowModal(true);
}

  return (

    <div className='w-full shadow-2xl h-screen'>

      <div className=' w-full flex flex-col  items-start justify-between h-full' >
        <div className='flex flex-col justify-center mt-4 items-center w-full'>
          <div className='w-full flex items-center justify-center '>
            <div

              className="border border-[#C867C5] rounded-full flex justify-center items-center h-40  w-40"
            >
              <img className='w-[153px] h-[153px] rounded-full' src="\pexels.jpg" alt='profile-picture' />
            </div>
          </div>
          <div className='mt-4'>
            <span className=' text-xl text-white font-bold tracking-[5%]'>
            {username}
            </span>
          </div>
          <div>
            <span className='text-xs  text-white leading-5 tracking-[5%]'>
             Go with the flow
            </span>

          </div>
        </div>
        <div className='text-white font-bold flex justify-center w-full items-center'>
          {dateSelected}
        </div>
        <div className='w-full shadow-2xl'>
        <div className='h-[200px] overflow-y-scroll w-full'>
          {events &&
            events.map((event) => (
              dateSelected === event.date &&
              <CommonCard event_id={event._id} Name={event.eventname}  Time={event.time} />
            ))
          }
        </div>
        {dateSelected &&
        <div className='w-full flex py-4 justify-center px-8  text-4xl text-white'>
          <span className='cursor-pointer' onClick={handleAddEvent}><IoIosAddCircleOutline /></span>


        </div>
        }
        </div>
          <div className='flex justify-center w-full  items-center'>
            <button className='text-white font-bold  mb-4' onClick={handleLogout} >Logout</button>
          </div>
       
      </div>

    </div>
  ) 
}
