import React, { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';

const Calendar = ({setDateSelected}) => {
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const handlePrevMonth = () => {
        setSelectedDate(selectedDate.subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setSelectedDate(selectedDate.add(1, 'month'));
    };


    const dateClicked = (date) => {
        console.log(date.target.outerText+' '+selectedDate.format('MMMM YYYY'))
        setDateSelected(date.target.outerText+' '+selectedDate.format('MMMM, YYYY'));
    }

    const renderCalendar = () => {
        const monthStart = selectedDate.startOf('month');
        const monthEnd = selectedDate.endOf('month');
        const startDate = monthStart.startOf('week');
        const endDate = monthEnd.endOf('week');

        const calendar = [];
        let day = startDate;
        while (day.isBefore(endDate)) {
            if (day.$M === selectedDate.$M) {
                calendar.push(
                    <div key={day} className="px-2 py-4 text-xl font-medium  text-center">
                       <span onClick={dateClicked} className='cursor-pointer'>
                        {day.format('D')}
                        </span> 
                    </div>
                );
            }
            else{
                calendar.push(
                    <div key={day} className="px-2 py-4">
                    </div>
                );
            }
            day = day.add(1, 'day');
        } 

        return calendar;
    };

    return (
        <div className=" w-full px-8 ">
            <div className="flex justify-between items-center relative z-0 mt-[16vh]  mb-4 px-16">
                <button
                    className=" font-bold"
                    onClick={handlePrevMonth}
                >

                    <img src='arrow-right.png' className='rotate-180'/>
                    
                </button>
                <h2 className="text-2xl text-white font-bold">
                    {selectedDate.format('MMMM YYYY')}
                </h2>
                <button
                    className=" font-bold"
                    onClick={handleNextMonth}
                >
                    <img src='arrow-right.png' />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-2 mt-8 py-4 text-white">
                <div className="text-center text-xl font-bold">Sun</div>
                <div className="text-center text-xl font-bold">Mon</div>
                <div className="text-center text-xl font-bold">Tue</div>
                <div className="text-center text-xl font-bold">Wed</div>
                <div className="text-center text-xl font-bold">Thu</div>
                <div className="text-center text-xl font-bold">Fri</div>
                <div className="text-center text-xl font-bold">Sat</div>
                {renderCalendar()}
            </div>
        </div>
    );
};

export default Calendar;
