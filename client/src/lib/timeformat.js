import React from 'react'

const timeFormat = (minutes) => {
    const hours = Math.floor(minutes/60);
    const minutesreminder = minutes%60;
    return `${hours}h ${minutesreminder}m`
  
}

export default timeFormat