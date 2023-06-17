import { ZoomIn } from "@mui/icons-material";
import React from "react";
import './about.css';
import LocationCityIcon  from '@mui/icons-material/LocationCity';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import CountUp from "react-countup";
function About() {
    return(
        <div className="container-fluid-listing">
        <div className="row">
        <h2 className='item_listing text-center m-5'>About-us</h2>
        <div className="col-lg-6">
        <h1 className="ms-5">welcome to <span className="vc">VACAY</span> </h1>
        <p className="m-3" style={{fontSize:18}}>Welcome to Vacay, the premier hosting website for accommodations around the world! Whether you're a traveler looking for the perfect place to stay or a host looking to share your home with visitors, we have everything you need to make your trip unforgettable.

At Vacay, we believe that travel is all about exploration, adventure, and relaxation. That's why we offer a wide range of accommodations, from luxury hotels to cozy apartments, to fit every style and budget. With Vacay, you can find the perfect place to stay no matter where you're going, whether it's a romantic getaway, a family vacation, or a solo adventure.

As a host on Vacay, you can share your home with travelers from all over the world and earn money while you're at it. Whether you're renting out a spare room or an entire house, you can list your property on Vacay and start earning extra income right away. Plus, with our easy-to-use platform, you can manage your bookings, communicate with guests, and get paid quickly and securely.

For travelers, Vacay offers a wide range of accommodations to choose from. Whether you're looking for a luxurious hotel with all the amenities, a cozy apartment in the heart of the city, or a unique home stay experience, we have something for everyone. With our user-friendly search tools, you can easily find the perfect place to stay, whether you're looking for a specific location, price range, or type of accommodation.

{/* At Vacay, we're committed to providing our guests with the best possible experience. That's why we carefully vet all of our hosts to ensure that they meet our high standards for cleanliness, safety, and hospitality. We also provide our guests with 24/7 customer support, so you can always get help when you need it. */}

Whether you're a traveler or a host, Vacay is the perfect place to find your next adventure. With thousands of listings around the world, you can explore new places, meet new people, and create unforgettable memories. Plus, with our secure platform and easy-to-use tools, you can book with confidence and manage your bookings with ease.

So what are you waiting for? Sign up for Vacay today and start exploring the world like never before. Whether you're looking for a cozy cabin in the mountains, a beachfront villa, or a chic city apartment, we have everything you need to make your trip unforgettable. With Vacay, the world is your oyster.</p>
          <div className="row g-3 pb-4 ">
            <div className="col-sm-3  wow fadeIn" data-wow-delay="0.1s" style={{ animationDelay:'0.1s', backgroundColor: 'whiteSmoke', textAlign:'center', fontSize:35, text:'white', border:'5px solid lightBlue',fontWeight: 700   }}>
                <div className=" p-1 " style={{borderRadius:"50px"}}>
                    <div className=" text center p-4">
                    <LocationCityIcon style={{fontSize:50, color:'lightBlue'}}/><br />
                    <CountUp className="text-muted" start={100} end={600}  duration={10} prefix="+" >                            
                       </CountUp>
                    <p className="mb-0 text-muted" style={{textDecorationThickness:'50%'}}>Places</p>
                    </div>

                </div>

            </div>
            <div className="col-sm-3 wow fadeIn ms-5" data-wow-delay="0.1s" style={{ animationDelay:'0.1s', backgroundColor: 'whiteSmoke', textAlign:'center', fontSize:35, text:'white', border:'5px solid lightBlue', fontWeight: 700  }}>
                <div className=" p-1 " style={{borderRadius:"50px"}}>
                    <div className=" text center p-4">
                    <ManageAccountsIcon style={{fontSize:50,color:'lightBlue'}}/><br />
                    <CountUp className="text-muted"  start={200} end={700}  duration={10}  prefix="+" >                            
                       </CountUp>
                    <p className="mb-0 text-muted" style={{textDecorationThickness:'50%'}}>Hosts</p>
                    </div>

                </div>

            </div>
            <div className="col-sm-3 wow fadeIn ms-5" data-wow-delay="0.1s" style={{ animationDelay:'0.1s', backgroundColor: 'whiteSmoke', textAlign:'center', fontSize:35, text:'white', border:'5px solid lightBlue',fontWeight: 700   }}>
                <div className=" p-1 " style={{borderRadius:"50px"}}>
                    <div className=" text center p-4">
                    <PeopleAltIcon style={{fontSize:50, color:'lightBlue'}}/><br />
                    <CountUp className="text-muted"  start={100} end={900}  duration={10} prefix="+" >                            
                       </CountUp>
                    <p className="mb-0 text-muted" style={{textDecorationThickness:'50%'}}>Clients</p>
                    </div>

                </div>

            </div>

          </div>
        {/* <button className="btn btn-outline-primary m-5" style={{transition:'.5s'}}>EXPLORE MORE</button> */}
        </div>
        <div className="col-lg-6">
            <div className="row g-3">
                <div className="col-6 text-end">
                    <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.1s" src="https://themewagon.github.io/hotelier/img/about-1.jpg" alt="" style={{marginTop:"25%", animationDelay:"0.1s", animationName: ZoomIn}} />

                </div>
                <div className="col-6 text-start">
                    <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.3s" src="https://themewagon.github.io/hotelier/img/about-2.jpg" alt="" style={{animationDelay:"0.3s", animationName: ZoomIn}} />

                </div>
                <div className="col-6 text-end">
                    <img className="img-fluid rounded w-50 wow zoomIn" data-wow-delay="0.5s" src="https://themewagon.github.io/hotelier/img/about-3.jpg" alt="" style={{animationDelay:"0.5s", animationName: ZoomIn}} />

                </div>
                <div className="col-6 text-start">
                    <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.7s" src="https://themewagon.github.io/hotelier/img/about-4.jpg" alt="" style={{animationDelay:"0.7s", animationName: ZoomIn}} />

                </div>

            </div>
        </div>
        
        </div>
        </div>

    )
    
}

export default About;

