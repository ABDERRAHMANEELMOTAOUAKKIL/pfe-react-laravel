import React from 'react';
import BottomNav from './BottomNav';
import About from './About';
import Residence from './Residence';

import { Service } from './Service';


function Home() {
  return (
    <div>

        <BottomNav />
        <About/>
        <Residence/>
        <Service/>
    
        
    </div>
  )
}

export default Home;
