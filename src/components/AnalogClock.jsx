/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {useEffect, useState} from 'react';

import "./analogClock.css";
import Slider from '@mui/material/Slider'
import {useLocation, useNavigate} from 'react-router-dom';

import axios from 'axios';

import generateToken from "../GenerateToken";

const AnalogClock = ({children}) => {
  const location = useLocation();
  const navigate = useNavigate ();
  const [prevTime,setPrevTime]=useState(new Date())
  const [seconds,setSeconds]=useState(prevTime.getSeconds()*6)
  const [hours,setHours]=useState(prevTime.getHours()*30)
  const [minute,setMinute]=useState(prevTime.getMinutes()*6)
  const currentHourDegree = prevTime.getHours () * 30;
  const currentMinuteDegree = prevTime.getMinutes () * 6;
  const ans5=Math.abs (currentMinuteDegree - minute);
  console.log(ans5)
  if (Math.abs (currentHourDegree - hours) === 60 && Math.abs (currentMinuteDegree - minute) === 720
  ) {
    navigate ('/success');
  }
  const [value, setValue] =useState(()=>{
  const params = new URLSearchParams (location.search);
    const x=Number (params.get ('sliderValue'));
    if(params.get('sliderValue') && x>=0 && x<=100){
      return x
    }else{
      return 50
    }
  });
  const token = generateToken (30);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleShare = async() => {

    try{
      const res=await axios.post('/storeToken',{
        token:token
      })
      const newUrl = `${window.location.origin}${window.location.pathname}?sliderValue=${value}&token=${token}`;
      navigator.clipboard.writeText(newUrl).then(() => {
        alert('URL copied to clipboard!');
      })
    }catch(err){
      alert (`${err} ${err.response.data.message}`);
    }
    
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 6);
    }, value*20);
    return () => clearInterval (interval);
    
  }, [value]);

  useEffect(()=>{
    if(seconds%360==0){
      setMinute((minute)=>minute-6)
    }
  },[seconds])

  useEffect(()=>{
    if(minute==0 || minute%360==0)
    setHours((hours)=>hours-30)
  },[minute])

  return (
    <>
        
        <div className="bg-primary min-h-screen text-center flex flex-col items-center">
          {children}
          <div className="clock">
            <div className="dot"></div>
            <div className="hour twelve">12</div>
            <div className="hour one">1</div>
            <div className="hour two">2</div>
            <div className="hour three">3</div>
            <div className="hour four">4</div>
            <div className="hour five">5</div>
            <div className="hour six">6</div>
            <div className="hour seven">7</div>
            <div className="hour eight">8</div>
            <div className="hour nine">9</div>
            <div className="hour ten">10</div>
            <div className="hour eleven">11</div>
            <div
              className="hour-hand"
              style={{
                transform: `rotateZ(${hours}deg)`,
              }}
            ></div>
            <div
              className="minute-hand"
              style={{
                transform: `rotateZ(${minute}deg)`,
              }}
            ></div>
            <div
              className="second-hand"
              style={{
                transform: `rotateZ(${seconds}deg)`,
              }}
            ></div>
          </div>
          <Slider aria-label="Volume" value={value} onChange={handleChange} sx={{
                width:'300px',
                marginTop:'5rem',
                marginBottom:'5rem',
                color: 'white',
                '& .MuiSlider-thumb': {
                  color: 'white',
                },
                '& .MuiSlider-track': {
                  color: 'white',
                },
                '& .MuiSlider-rail': {
                  color: 'grey',
                },
              }}/>
          <button onClick={handleShare} className="mb-1 py-4 px-8 bg-white text-primary-dark font-medium rounded-3xl text-lg">Share</button>
        </div>
    </>
    
  );
};

export default AnalogClock;

