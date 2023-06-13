import React from 'react'
import { useState, useEffect } from 'react';
import EditEvent from '../modal/editEvent';
import AddEvent from '../modal/AddEvent';
import RightSideBar from '../RightSideBar/rightSideBar';
import MyCalendar from '../calender/Calender';

export default function HomeScreen() {

    const [dateSelected, setDateSelected] = useState();
    const [showModal, setShowModal] = useState(false);
    const [events, setEvents] = useState([]);
    const [showEditModal, setShowEditModal] =useState(false);
  
    const fetchEvents = async ()=>{
      const id = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/api/events/user/'+id);
      const data = await response.json();
      console.log(data)
      setEvents(data); 
    }
  
    useEffect(()=>{
      fetchEvents();
    })

  return (
    <div className="w-full">
    {
      showModal &&
      <AddEvent dateSelected={dateSelected} setShowModal={setShowModal}/>
    }
    
    {
      showEditModal &&
      <EditEvent dateSelected={dateSelected} setShowEditModal={setShowEditModal}/>
    }

  <div className='flex flex-row back-home'>
    <div className='w-[20%]'>
      {events && <RightSideBar events={events} dateSelected={dateSelected} setShowModal={setShowModal}/>
}
    </div>

    <div className='w-[80%]'>
  <MyCalendar setDateSelected={setDateSelected} />
  </div>
  </div>
  </div>
  )
}
