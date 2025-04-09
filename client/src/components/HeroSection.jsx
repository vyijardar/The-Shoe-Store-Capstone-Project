import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/HeroSection.css";

const images = [
  "https://res.cloudinary.com/dmubfrefi/image/private/s--L4IjIBr2--/c_crop,h_1688,w_2532,x_234,y_0/c_scale,w_3840/f_auto/q_auto/v1/dee-about-cms-prod-medias/d436e535-3c11-4c54-a798-249accc1f071/rg11hh-p01-fa24-rtp-nike-electric-nouveau-sport-product-superiority-ta-oly-hero-pack-v1-r2.jpg?_a=BAAAV6Bs",
  "https://i0.wp.com/mossandfog.com/wp-content/uploads/2019/07/grit-training-shoes-aarish-netarwala-design_dezeen_2364_hero-1.jpg",
  "https://geekculture.co/wp-content/uploads/2017/07/newbalance-spiderman-shoes.jpg",
];

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-background" style={{ backgroundImage: `url(${images[currentSlide]})` }} >
        <div className="overlay"></div>
        <div className="container h-100 d-flex align-items-center justify-content-center">
          <div className="row w-100">
            <div className="col-12 col-md-8 offset-md-2 hero-content">
              <h1>Love the Planet We Walk On</h1>
              <div className="col-12 col-md-8 offset-md-2 ">
                <p>Where Classic Meets Contemporary</p></div>
              <div className="col-12 col-md-8 offset-md-2 ">
                <div className="hero-buttons d-flex flex-wrap justify-content-center">
                  <button onClick={() => navigate("/men")}>Shop Men</button>
                  <button onClick={() => navigate("/women")}>Shop Women</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
