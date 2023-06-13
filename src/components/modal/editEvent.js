import React, { useState } from 'react';
import axios from 'axios';
import { RxCross2 } from 'react-icons/rx';
export default function EditEvent({ setShowModal, event_id, name, Time }) {
  const [eventName, setEventName] = useState(name);
  const [time, setTime] = useState(Time);

  const handleInputChange = (e) => {
    setEventName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.put('http://localhost:8000/api/events/' + event_id, {
      eventname: eventName,
      time: time,
    },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(res);
    setShowModal(false);

    setEventName('');
  };

  return (
    <div className="flex flex-col justify-center absolute top-0 text-left z-50 backdrop-blur-lg items-center h-full w-full ">
      <div className='flex w-full text-white pr-10 top-4 text-2xl absolute cursor-pointer justify-end' >
        <RxCross2 onClick={() => setShowModal(false)} />
      </div>
      <form onSubmit={handleSubmit} className="max-w-md  bg-white rounded-[10px] w-full">


        <div className="flex flex-col   py-2 mt-2 w-full shadow-2xl ">
          <div className=' px-4 my-2'>
            <label className='text-[#1D2671] text-lg font-semibold'>
              Event Time
            </label>
            <input
              type="time"
              className="appearance-none bg-transparent border-none w-full  mr-3 py-1 leading-tight focus:outline-none"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className=' px-4  my-2'>
            <label className='text-[#1D2671] text-lg font-semibold'>
              Event Name
            </label>
            <input
              type="text"
              placeholder="Event name"
              className="appearance-none bg-transparent border-none w-full mr-3 py-1  leading-tight focus:outline-none"
              value={eventName}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex mt-4 justify-center items-center '>
            <button
              type="submit"
              className="flex-shrink-0  text-white text-sm hover:bg-[#323fae] bg-[#1D2671] py-2 px-6 rounded-[10px]"
            >
              Add Event
            </button>
          </div>
        </div>
      </form>
    </div>
  )

}





