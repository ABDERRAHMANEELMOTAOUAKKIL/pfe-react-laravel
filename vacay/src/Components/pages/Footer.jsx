import React from "react";
import './footer.css';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
function Footer(){
    return(
        <div className="container-fluid bg-dark text-light footer wow fadeIn" data-wow-delay="0.1s" >
            <div className="row g-5">
                <div className="col-md-6 col-lg-4">
                    <div className="bg-primary rounded  p-4">
                        <h1 className="text-white mb-3 text-uppercase">Vacay</h1>
                        <p className="text-white mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate enim nobis autem ullam qui et ut quo, corrupti excepturi voluptatem laudantium consequuntur eligendi quae, distinctio quisquam! Officia corrupti recusandae dignissimos perferendis sed sint, assumenda excepturi voluptate at quam. Assumenda itaque autem dicta excepturi dolorum magnam accusantium corporis totam similique consequuntur!</p>

                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <h6 className="section-title text-start text-primary mb-4">CONTACT</h6>
                    <p className="mb-2">
                        <FmdGoodIcon/>
                        123 Street Casablanca, Morocco
                    </p>
                    <p className="mb-2">
                        <LocalPhoneIcon/>
                       +123986545
                    </p>
                    <p className="mb-2 me-3">
                        <EmailIcon/>
                       mail@mail.com
                    </p>

                </div>
                <div className="col-lg-5 col-md-12">
                    <div className="row gy-5 g-4">
                        <div className="col-md-6">
                            <h6 className="section-title text-start text-primary  mb-4">COMPANY</h6>
                            <a className=" btn-link"  href="#">About Us</a>
                            <a className=" btn-link" href="#">Contact Us</a>
                            <a className=" btn-link" href="#">Privacy Policy</a>
                            <a className=" btn-link" href="#">Terms & Condition</a>
                            <a className=" btn-link" href="#"> Suppoert</a>

                        </div>
                        <div className="col-md-6">
                            <h6 className="section-title text-start text-primary  mb-4">SERVICES</h6>
                            <a className=" btn-link"  href="#">Food & Restaurent</a>
                            <a className=" btn-link" href="#">spa & Fitness</a>
                            <a className=" btn-link" href="#">Sport & Gaming</a>
                            <a className=" btn-link" href="#">Event & Party</a>
                            <a className=" btn-link" href="#"> GYM & Yoga</a>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
    
}


export default Footer;