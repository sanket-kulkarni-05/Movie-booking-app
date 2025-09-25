import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon } from 'lucide-react'
import { ChevronRightIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const DateSelect = ({dateTime,id}) => {

    const navigate =useNavigate();
     const [selected, setSelected] =useState(null)

     const onBookHandler = ()=>{
        if(!selected){
            alert('Please select a date');
            return
        }
        navigate(`/movies/${id}/${selected}`)
        scrollTo(0,0)
     }



  return (
    <div id='dateSelect' className='pt-30'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg'>
            <BlurCircle top="-100px" left="-100px"/>
            <BlurCircle top="100px" right="0px"/>
            <div>
                <p className='text-lg font-semibold text-white'>Choose Date</p>
                <div className='flex items-center gap-6 text-sm mt-5'>
                    <ChevronLeftIcon width={28} className='text-white cursor-pointer hover:text-primary transition-colors'/>
                    <div className='flex flex-wrap gap-4 max-w-lg'>
                        {Object.keys(dateTime).map((date)=>(
                            <button onClick={()=> setSelected(date)} 
                                key={date} 
                                className={`flex flex-col items-center justify-center h-16 w-16 rounded-lg cursor-pointer hover:bg-primary/20 transition-all border border-transparent hover:border-primary/30 bg-gray-800/50 ${selected=== date ? "bg-primary text-white":"border border-primary/70"}`}
                            >
                                <span className='text-white font-semibold text-lg leading-none'>{new Date(date).getDate()}</span>
                                <span className='text-white text-sm leading-none mt-1'>{new Date(date).toLocaleDateString("en-US",{month:"short"})}</span>
                            </button>
                        ))}
                    </div>
                    <ChevronRightIcon width={28} className='text-white cursor-pointer hover:text-primary transition-colors'/>
                </div>
            </div>
            <button  onClick={onBookHandler} className='bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-all cursor-pointer font-semibold'>Book Now</button>
        </div>
    </div>
  )
}

export default DateSelect