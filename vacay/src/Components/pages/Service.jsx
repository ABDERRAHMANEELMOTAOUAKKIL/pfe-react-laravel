import React from "react";
import './serivce.css';
import { useNavigate } from "react-router";

export const Service = ()=> {

    const navigate= useNavigate();

    function handleClick()
    {
        navigate("/host-register")
    }
    function Click()
    {
        navigate('/register')
    }
    return(
        <div className="container">
         
            {/* <div className="row"> */}
            
                {/* <div className="col-12"> */}
{/*                    
                    <div className="service-content d-flex align-items-center justtify-content-between">
                        <div className="single-service--area mb-100 wow fadeInUp">
                            <img src="icon-1.png" alt="tran" />
                            <h5>Transportation</h5>

                        </div>
                        <div className="single-service--area  wow fadeInUp">
                            <img src="icon-2.png" alt="tran" />
                            <h5>Reiseservice</h5>

                        </div>
                        <div className="single-service--area  wow fadeInUp">
                            <img src="icon-3.png" alt="tran" />
                            <h5>Spa Relaxtion</h5>

                        </div>
                        <div className="single-service--area  wow fadeInUp">
                            <img src="icon-4.png" alt="tran" />
                            <h5>Restaurant</h5>

                        </div>
                        <div className="single-service--area wow fadeInUp">
                            <img src="icon-4.png" alt="tran" />
                            <h5>Bar & Drink</h5>

                        </div>

                    </div> */}
                    <div className="row pub " style={{marginTop:'40%'}}>
                        <div className="col-md-6 mt-5">
                        <h1 className="ms-4"> Dive Deep with us Find A place to stay in Or join Our Host Team and earn money </h1>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                        <button onClick={Click} className="btn btn-success me-md-2 text-white" type="button">Become a Member</button>
                        <button onClick={handleClick} className="btn btn-info text-white" type="button">Become a Host</button>
                            </div> 
                        </div>
                        <div className="col-md-6">
                        <img className="dive" src="https://images.unsplash.com/photo-1682686581660-3693f0c588d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80" alt="dive" />
                        </div>  
          
                        </div>   
                </div>
        //     </div>
           
        // </div>
    )
} 