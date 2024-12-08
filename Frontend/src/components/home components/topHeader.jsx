import React from 'react'
import symbol from    "../../assets/nationalSymbol.svg"
import azadi from    "../../assets/azadilogo.svg"
import itulogo from    "../../assets/ITULOGO.svg"
import staysavelogo  from    "../../assets/staysavelog.svg"
import instalogo  from    "../../assets/instalogo.svg"
import tweeterlogo  from    "../../assets/twiterlogo.svg"
import facebooklogo  from    "../../assets/facebooklogo.svg"
import youtube  from    "../../assets/youtube.svg"

export default function TopHeader() {
    // console.log(nationalsymbol);
  return (
    <>
    <div className='bg-[#d0e1fb] h-16 hidden  sm:flex  items-center justify-between p-3'>
      
    <div className='  display: flex  items-center  gap-3.5'>
        <img src={symbol} alt="" />
 <h6>  GOVERMENT OF INDIA  </h6>
        <img src={azadi} alt=""  />
        <img src={itulogo} alt="" />
        <img src={staysavelogo} alt="" />
        </div>
        <div className='display: flex  gap-3.5'>
        <img src={instalogo} alt="" className="cursor-pointer hover:scale-110 transition-transform" />
        <img src={tweeterlogo} alt="" className="cursor-pointer hover:scale-110 transition-transform" />
        <img src={facebooklogo} alt="" className="cursor-pointer hover:scale-110 transition-transform" />
        <img src={youtube} alt=""className="cursor-pointer hover:scale-110 transition-transform"  />
 
        </div>
    </div>
   
    </>
  )
}
