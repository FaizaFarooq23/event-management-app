import React, { useState } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';
import EditEvent from '../modal/editEvent';
export default function CommonCard({ event_id, Time, Name }) {
    const [showEditModal, setShowEditModal] = useState(false);

const handleOnDeleteEvent = () => {
   
        fetch(`http://localhost:8000/api/events/${event_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            window.location.reload();
        })
        .catch(err => console.log(err))
    
}



    return (
<div>
    {
        showEditModal &&
        <EditEvent event_id={event_id} name={Name} Time={Time} setShowModal={setShowEditModal}/>
      }
        <div className='flex  rounded-[20px]  justify-between ml-4 pl-5 py-2 text-left mt-2 w-[90%] '>
            <div className='flex flex-col justify-between'>
               <div className='flex flex-col justify-items-center '>
                <span className='text-white  font-semibold text-[15px]'>
                    {Time}
                </span>
            </div>
            <div>
                <span className='text-white text-xs font-semibold'>
                    {Name}                </span>
            </div>
            </div>
            <div className='text-white text-2xl  flex items-end pb-1 justify-between'>
             <span className='pr-3 cursor-pointer' onClick={handleOnDeleteEvent}><RiDeleteBinLine/></span>
                
               <span className='pr-6 cursor-pointer' onClick={()=>setShowEditModal(true)}>
                <AiOutlineEdit />
                </span> 
            </div>
        </div>
</div>

    )
}
