import React, { useEffect, useState } from 'react'
import useParams from 'react-router-dom'
const SeetLayout = () => {

  const{id, date} = useParams();
  const[selectedSeates, setSelectedSeates]= useState([])
  const[selectedTime, setSelectedTime] =useState(null)
  const[show, setShow]=useState(null)

  const navigate = useNavigate()
  const getshow = async()=>{
    const show= dummyShowsData.find(show = show._id === id)
    if(show){
      setShow({
        movie: show,
        dateTime: dummyDateTimeData
      })
    }
  }

  useEffect(()=>{
    getshow()
  },[])


  return show ? (
    <div>

    </div>
  ): (
    <Loading/>
  )
}

export default SeetLayout