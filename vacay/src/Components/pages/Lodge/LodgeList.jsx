
import React, { useEffect } from "react";
import { useState } from "react";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import './lodge.css'
import { useNavigate, useParams } from "react-router";
import ReservationForm from "../../Reservation/ReservationForm";

export default function LodgeList() {
const { id } = useParams();
const [Property, setProperty] = useState(null);
const [selectedImage, setSelectedImage] = useState(null);

const navigate = useNavigate();
function handleClick() {
  navigate('/user-reservation');
}


useEffect(() => {
  fetch(`http://127.0.0.1:8000/api/lodge/${id}`)
    .then(response => response.json())
    .then(Property => {
      setProperty(Property);
    });
   }, [id]);
   const openOverlay = (image) => {
      setSelectedImage(image);
    };
  
    const closeOverlay = () => {
      setSelectedImage(null);
    };
  

if (!Property) {
  return <div>Loading Property details...</div>;
}

   return (
      <div className="container">
        <div className="row">
            <div className="col-md-6 mb-5">
            <img className="img" src={Property.image_url} height="350" alt="lodge" />
             <h4>{Property.name}</h4>
             <h5>{Property.location}</h5>
             <p>{Property.description}</p>
             <strong id="price">Price : {Property.price}MAD</strong> <br />

             <button type="submit" className="btn btn-info btn-lg " style={{color:'white', alignContent:'end'}} onClick={handleClick}>Reserve</button>
              <div
            className="gallery"
            style={{ margin: "20px", display: "flex", justifyContent: "space-around" }}
          >
            {Property.gallery.map((image, index) => (
              <img
                style={{ padding: "17px", cursor: "pointer" }}
                key={index}
                src={image}
                height="300"
                alt={`gallery-${index}`}
                onClick={() => openOverlay(image)}
              />
            ))}
          </div>
           
        </div>
      
          
            </div>
        </div>
          
   
   );
}


// import React, { useEffect } from "react";
// import { useState } from "react";
// import './lodge.css'
// import { useNavigate, useParams } from "react-router";

// export default function LodgeList() {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(`http://127.0.0.1:8000/api/lodge/${id}`)
//       .then(response => response.json())
//       .then(property => {
//         setProperty(property);
//       });
//   }, [id]);

//   const openOverlay = (image) => {
//     setSelectedImage(image);
//   };

//   const closeOverlay = () => {
//     setSelectedImage(null);
//   };

//   const handleClick = () => {
//     navigate('/user-reservation', { state: { property } });
//   };

//   if (!property) {
//     return <div>Loading Property details...</div>;
//   }

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6 mb-5">
//           <img className="img" src={property.image_url} height="350" alt="lodge" />
//           <h4>{property.name}</h4>
//           <h5>{property.location}</h5>
//           <p>{property.description}</p>
//           <strong id="price">Price : {property.price}MAD</strong> <br />

//           <button
//             type="submit"
//             className="btn btn-info btn-lg"
//             style={{ color: 'white', alignContent: 'end' }}
//             onClick={handleClick}
//           >
//             Reserve
//           </button>

//           <div
//             className="gallery"
//             style={{ margin: "20px", display: "flex", justifyContent: "space-around" }}
//           >
//             {property.gallery.map((image, index) => (
//               <img
//                 style={{ padding: "17px", cursor: "pointer" }}
//                 key={index}
//                 src={image}
//                 height="300"
//                 alt={`gallery-${index}`}
//                 onClick={() => openOverlay(image)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
