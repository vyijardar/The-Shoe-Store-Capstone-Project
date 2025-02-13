
import React from 'react';

import HeroSection from '../components/HeroSection';
import MaterialSection from '../components/MaterialSection';
import ShoeShowcase from '../components/ShoeShowcase';
import ProductListing from '../components/ProductListing';

export default function Home(){
    return(
        <div>
        <HeroSection />
        <MaterialSection />
        <ShoeShowcase />
        <ProductListing />
      </div>
    );
}