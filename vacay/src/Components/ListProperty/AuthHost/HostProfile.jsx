  import React, { useState, useEffect } from "react";
  import { Link, useNavigate, useParams } from "react-router-dom";
  import './host.css'
  import axios from "axios";

  export const HostProfile = () => {
    const { name } = useParams();
    const [host, setHost] = useState(null);
    const [host_id] = useState(null);
    const [loading, setLoading] = useState(true);


    const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || null); // Retrieve the image URL from localStorage
    const [properties, setProperties] = useState([]);
    
    const navigate= useNavigate()
    const handleImageUpload = async (event) => {
      event.preventDefault();
  
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('profile_image', file);
  
      try {
        const response = await axios.post('http://localhost:8000/api/upload-profile-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          withCredentials: true
        });
  
        console.log(response.data.message);
  
        // Update the profile image URL in the state and localStorage
        const imageUrl = response.data.imageUrl;
        setProfileImage(imageUrl);
        localStorage.setItem('profileImage', imageUrl);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };
  

    useEffect(() => {
      const fetchHostProfile = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/host-profile/${name}`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setHost(data);
          } else {
            throw new Error("Failed to fetch host profile.");
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      

      fetchHostProfile();
    }, [name]);

      useEffect(() => {
      fetchProperties();
    }, []);
  
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/properties-index',{
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
  
   
  

    if (loading) {
      return  <div className="d-flex justify-content-center" style={{margin:'20%'}}>
      <div className="spinner-border text-primary " role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    </div>
    }
  
    if (!host) {
      return <div>Host profile not found.</div>;
    }

    function handleClick() {
      navigate('/add-products');
    }

    function handleClick(property_id) {
      navigate(`/properties/edit/${property_id}`);
    }

    return (
      <div className="container-fluid bg-color">
        <div className="row">
        <h2 className="text-white">Welcome to your Profile</h2>
        <div className="card col-md-10" style={{marginTop:'5%',marginBottom:'3%',borderRadius: '40px 40px 0 0'}}> 
        <div className='text-center'>

     

{profileImage && (
  <div>
    <img src={profileImage} alt="Profile" style={{ width: '200px', height: '190px', borderRadius:'50%', border:'3px solid lightgrey', marginTop:'10px' }} />
  </div>
)}
<label htmlFor="image"> <strong>Add Profile picture</strong> </label><br />
<input id="fileInput" type="file" accept="image/*" onChange={handleImageUpload}/>
</div>
<hr /> 
        <div className="m-5">
        <h5>Name: {host.name}</h5>
        <h5>Email: {host.email}</h5>
        <h5>Phone: {host.phone}</h5>
        <h5> {host.user_type}</h5>
        </div>
        <div className=" m-2" >
            <h3 style={{textDecoration:'2px solid underline'}}>Your Properties on VacaY</h3>
            <button className="btn btn-primary" onClick={handleClick} type="submit">Add New Property</button>
           <hr />
           <div className="row" style={{display:'flex', justifyContent:'space-evenly'}}>
           {properties.map((property) => (
     <div className=" col-md-4" key={property.id}>
    <h2>{property.name}</h2>
    {/* <p>{property.description}</p> */}
    <img className="img" src={property.image_url} alt="lodge" height="300" />
    <strong>{property.price} MAD</strong><br />
    <strong>{property.location}</strong>
    <div  style={{textAlign:'end'}}>
    <button className="btn btn-success" onClick={() => handleClick(property.id)}>Edit</button>
    <button className="btn btn-danger ms-2" >Delete </button>
    </div>
                               
  </div>
))}
           </div>
         
          </div>

          <h3>Reviews :</h3>
          <div className=" m-3 " style={{ display: 'flex',justifyContent:'space-evenly'}}  >
    
            <div className="cards col-md-2">
            <img className="round" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="user" /><br />
            <div className="ms-3">
              <strong>Kholoe </strong>
              <p>Great Host, nice place</p>
            </div>
            </div>

            <div className="cards col-md-2">
            <img className="round" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="user" /><br />
            <div className="ms-3">
            <strong>Jhoe</strong>
              <p>Great Host, nice place</p>
            </div>
            
              </div>

              <div className="cards col-md-2">
              <img className="round" src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80" alt="user" /><br />
              <div className="ms-3 " style={{textDecoration:"none"}}>
              <strong>Marc</strong>
              <p>Great Host, nice place</p>

              </div>
              </div>
          </div>
         <li  style={{textAlign:'end', listStyleType:'none'}}> <a href="#">see more</a>  </li>   
          </div>
        

        </div>
    
      </div>
    );
  };
