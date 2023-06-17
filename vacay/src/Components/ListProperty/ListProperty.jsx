import React from "react";
import './ListProperty.css';
import { useTypewriter, Cursor } from "react-simple-typewriter";
import CheckIcon from '@mui/icons-material/Check';
import AnchorIcon from '@mui/icons-material/Anchor';
import HighlightIcon from '@mui/icons-material/Highlight';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { useNavigate } from "react-router";
export  const ListProperty = () =>{
    const [text] = useTypewriter({
        words : ['Anything', 'Appartement', 'Guest house'],
        loop :0,
         typeSpeed:120,
         deleteSpeed: 80,
    });
    const navigate = useNavigate();

    function handleClick() {
        navigate('/host-register');
      }

    return(
        <div className="container-fluid lst">
            <div className="row">
                
                <div className="col-md-6">
                    <h1 className="lst-tile">List {''} <br /> 
                    <span style={{color:'lightblue'}}>{text}</span> 
                    <span style={{color:'blue'}}><Cursor/></span>
                     <br />
                     on VacaY.com </h1>
                     <p className="p-lst">Registration is free and can take as little as 15 minutes to complete – get started today </p>

                </div>
                <div className="col-md-6 join">
                    <h3 style={{textAlign:'center', fontWeight:'700', marginTop:'5%' }}>Create new listing</h3>
                    <div className="p">
                   
                        <p>  <CheckIcon/> More than 6.4 million vacation rentals already listed.
                        </p>
                        <p><CheckIcon/> Over 1 billion vacation rental guest arrivals.
                        </p>
                        <p><CheckIcon/> More than 40% of new vacation rental listings get their first booking within a <span className="ms-3 span">week.</span> </p>
                        </div>
                    <hr />  
                    <h3 style={{textAlign:'center', fontWeight:'700', marginTop:'5%' }}>Create a partner account to get started:</h3>
                    <p className="p">By continuing, you agree to let Booking.com email you regarding your property registration.</p>
                    <button onClick={handleClick} className="btn btn-primary btn-lg" style={{width:"100%"}}>Get started </button>


                </div>

            </div>
            <div className="row">
                <div className="col-lg-12 bg">
                    <img className="host-img" src="superhost.webp" alt="host" />
                </div>
                <div className="col-lg-12 bg">    
            <div className="col-md-4 crd">
                <h6 className="h6 "><AnchorIcon className="me-2" style={{fontSize:'20', color:'black' }}/> One-to-one guidance from a Superhost</h6>
                <p className="host_desc text-muted ">We’ll match you with a Superhost in your area, who’ll guide you from  your first  question <br /> to your first guest—by <br /> phone, video call, or chat.</p>
            </div>
            <div className="col-md-4 crd ">
                <h6 className="h6"><HighlightIcon className="me-2"  style={{fontSize:'20', color:'black'}}/>An experienced guest for your first booking</h6>
                <p className="host_desc text-muted ">For your first booking, you can choose to welcome an experienced guest <br /> who has at least three stays and a good track record on Airbnb.</p>
            </div>
            <div className="col-md-4 crd ">
                <h6 className="h6" > <LightbulbIcon className="me-2"  style={{fontSize:'20', color:'black'}}/>Specialized support from Airbnb
               </h6>
                <p className="host_desc text-muted  ">New Hosts get one-tap access to specially trained Community Support agents <br /> who can help with everything from account issues to billing support.</p>
            </div>
            </div>
            </div>
           
            
        </div>
    )
}