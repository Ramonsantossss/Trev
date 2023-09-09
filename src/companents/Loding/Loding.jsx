import React, { useState } from 'react'
import "./Loding.scss"
function Loding() {
    const [loging, setLoging] = useState(true);

 
        setTimeout(()=>{
            setLoging(false)
        },3500)
          
    
  
  return (
    <div className={loging?"center":"displaynone"}>
        
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
    </div>
  )
}

export default Loding