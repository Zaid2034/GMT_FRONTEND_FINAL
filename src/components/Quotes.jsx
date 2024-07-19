/* eslint-disable no-unused-vars */
import React,{useState,useEffect} from 'react'
import axios from 'axios';
const Quotes = () => {
  console.log('Quotes re render')  
  const [quotes,setQuotes]=useState('Good Morning')
  const category = 'happiness';
  const apiKey = 'MTsbwwfhKsZ8VQV8Uj0kSw==HQYWAeSB6OfQYfzP';
  const url = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
  useEffect (() => {
  const intervalId = setInterval (() => {
    axios
      .get (url, {
        headers: {'X-Api-Key': apiKey},
      })
      .then (response => {
        setQuotes (response.data[0].quote);
        console.log (response.data[0].quote);
      })
      .catch (error => {
        console.error (
          'Error: ',
          error.response ? error.response.data : error.message
        );
      });
  }, 5000);

  return () => clearInterval (intervalId);
}, []);


  return (
      <>
        <div className="w-[95%] text-sm lg:w-[70%] md:h-[150px] md:text-lg text-white mb-6 pt-8 font-bold">{quotes}</div>
      </>
  )
}

export default Quotes