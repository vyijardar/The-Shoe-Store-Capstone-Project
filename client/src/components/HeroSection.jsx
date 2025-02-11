import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/HeroSection.css';

// Replace these with your actual image URLs or imported images
const images = [
  'https://res.cloudinary.com/dmubfrefi/image/private/s--L4IjIBr2--/c_crop,h_1688,w_2532,x_234,y_0/c_scale,w_3840/f_auto/q_auto/v1/dee-about-cms-prod-medias/d436e535-3c11-4c54-a798-249accc1f071/rg11hh-p01-fa24-rtp-nike-electric-nouveau-sport-product-superiority-ta-oly-hero-pack-v1-r2.jpg?_a=BAAAV6Bs',
  'https://i0.wp.com/mossandfog.com/wp-content/uploads/2019/07/grit-training-shoes-aarish-netarwala-design_dezeen_2364_hero-1.jpg',
  'https://geekculture.co/wp-content/uploads/2017/07/newbalance-spiderman-shoes.jpg'
];

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Change the image every 3 seconds
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
 const navigate = useNavigate();
  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url(${images[currentSlide]})`
      }}
    >
      <div className="overlay" /> 
      <div className="hero-content">
        <h1>Love the Planet we walk on</h1>
        <p>
        Where Classic Meets Contemporary
        </p>
        <div className="hero-buttons">
          <button onClick={()=>{navigate('/men')}}>Shop Men</button>
          <button onClick={()=>{navigate('/women')}}>Shop Women</button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
