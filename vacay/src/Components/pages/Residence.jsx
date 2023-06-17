import React from 'react';
import './residence.css';
// import ImageSlider from './CarouselCard';
// import { CarouselCard } from './CarouselCard';
import ImgMediaCard from './CarouselCard';


  

function Residence() {
    return(
          <div className="container-fluid-listing ">
            <div className="row">
            <h2 className='item_listing' style={{textAlign:'center', marginTop:'20%'}}>Our Listing</h2>
            <h1 className="ms-5" style={{textAlign:"center"}}>Browse by<span className="vc ms-2">Prototype</span> </h1> 
                <ImgMediaCard/>
            </div>
        </div>
      

    )
    
}

export default Residence;