import React from "react";
import image from '../../assets/GPS/illustrator.svg';

const Illustration = ({ image, alt }) => (
  <div className="hidden lg:block w-full lg:w-[45%]">
  
    <img src={image} alt={alt} className="w-full h-[60vh] object-cover rounded-xl shadow-lg" />
  </div>
);

export default Illustration;
