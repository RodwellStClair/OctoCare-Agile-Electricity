import { useState, useEffect } from 'react'

// this function will return the current time in hours and minutes

function Clock() {
  // Initialize state with the current time
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);


    return () => clearInterval(intervalId);
  }, []);


  const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


  return <div><h3>Time : {timeString} hrs</h3></div>;
}

export default Clock
