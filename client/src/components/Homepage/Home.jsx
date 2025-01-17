
import React from 'react';

import HeroSection from './HeroSection';
import MaterialSection from './MaterialSection';
import ShoeShowcase from './ShoeShowcase';
import ProductListing from './ProductListing';

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