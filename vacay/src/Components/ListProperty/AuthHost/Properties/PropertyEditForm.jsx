import React, { useEffect, useState } from "react";
import axios from "axios";

export const PropertyEditForm = ({property }) => {
  const [categories, setCategories] = useState([]);
  const [user, setUser]= useState(null);
  const [successMessage, setSuccessMessage] = useState('');


  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category_id: '',
    host_id: '',
    location: '',
    image: null,
    gallery: [],
    description: '',
  });

 //Categories from backend
 useEffect(() => {
  // Fetch categories from backend
  axios.get('http://localhost:8000/api/category')
    .then(response => {
      setCategories(response.data);
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });
}, []);
   // Assuming the host is already authenticated and the host_id is stored in localStorage or state
   const host_id = localStorage.getItem('host_id');

   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
   };
 

   const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, image: file }));
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevFormData) => ({ ...prevFormData, gallery: files }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const hostResponse = await axios.get(`http://localhost:8000/api/getHostId?name=${formData.host_name}`);
    const hostId = hostResponse.data.host_id;

    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('category_id', formData.category_id);
    data.append('host_id', formData.host_id);
    data.append('location', formData.location);
    data.append('image', formData.image);
    formData.gallery.forEach((file) => data.append('gallery[]', file));
    data.append('description', formData.description);
       
      axios
      .put(`http://127.0.0.1:8000/properties-update/${property}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
         'Content-Type': 'multipart/form-data', 
          
        },
      })

      .then((response) => {
        console.log(response.data);
        setSuccessMessage('Accommodation updated successfully');
  
        // Handle success, e.g., show a success message or redirect
      })
      .catch((error) => {
        console.error(error);
        // Handle error, e.g., show an error message
      });
  };
  

  return (
    <div>
      <h2>Edit Property</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
       
        <label htmlFor="name">Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />

      <label htmlFor="price">Price:</label>
      <input type="text" name="price" value={formData.price} onChange={handleChange} />
      <label>
        Category:
        <select name="category_id" value={formData.category_id} onChange={handleChange}>
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </label>
 
          <div>
            <label htmlFor="host_name">Host full-Name:</label>
           <input type="text" name="host_name" value={formData.host_name} onChange={handleChange} />
    
          </div>
        
  
        <div>
          <label>Location:</label>
          <input type="text" name='location' value={formData.location} onChange={handleChange} />
        </div>
        <label htmlFor="image">Image:</label>
      <input type="file" name="image" onChange={handleImageChange} />

      <label htmlFor="gallery">Gallery:</label>
      <input type="file" name="gallery" multiple onChange={handleGalleryChange} />

      <label htmlFor="description">Description:</label>
      <textarea name="description" cols={50} rows={10}  value={formData.description} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    </div>
 
  );
};








// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export const PropertyEditForm = ({property, onUpdate}) => {
//     const [loading, setLoading] = useState(true);

//     const [formData, setFormData] = useState({
//         name: property.name,
//         description: property.description,
//         price: property.price,
//         location: property.location,
//         image: null,
//         gallery: [],
//       });
    
//       const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//       };
//       const handleImageUpload = (e) => {
//         setFormData({ ...formData, image: e.target.files[0] });
//       };
    
//       const handleGalleryUpload = (e) => {
//         setFormData({ ...formData, gallery: e.target.files });
//       };
    
//       const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         try {
//           const response = await axios.put(`http://localhost:8000/api/properties/${property.id}`, formData, {
//             headers: {
//               Accept: "application/json",
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           });
    
//           if (response.status === 200) {
//             console.log("Property updated successfully");
//             // Call the onUpdate function to update the property data in the parent component
//             onUpdate(response.data);
//           } else {
//             throw new Error("Failed to update property.");
//           }
//         } catch (error) {
//           console.error(error);
//         }
//       };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!property) {
//     return <div style={{margin:'10%'}} >Property not found.</div>;
//   }

//   return (
//     <div style={{margin:'20%'}}>
//       <h2>Edit Property</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
//         </div>
//         <div>
//           <label htmlFor="description">Description:</label>
//           <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
//         </div>
//         <div>
//           <label htmlFor="price">Price:</label>
//           <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
//         </div>
//         <div>
//           <label htmlFor="location">Location:</label>
//           <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
//         </div>
//         <div>
//           <label htmlFor="image">Image:</label>
//           <input type="file" id="image" name="image" onChange={handleImageUpload} accept="image/*" />
//         </div>
//         <div>
//           <label htmlFor="gallery">Gallery:</label>
//           <input type="file" id="gallery" name="gallery" onChange={handleGalleryUpload} multiple accept="image/*" />
//         </div>
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// };


// import React, { useState } from "react";
// import axios from "axios";

// export const PropertyEditForm = ({propertyId, property, onUpdate }) => {
//   const [formData, setFormData] = useState({
//     name: property?.name || "",
//     description: property?.description || "",
//     price: property?.price || "",
//     location: property?.location || "",
//     image: property?.image || null,
//     gallery: property?.gallery || [],
//   });
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.put(`http://localhost:8000/api/properties-update/${propertyId}`, formData, {
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (response.status === 200) {
//         console.log("Property updated successfully");
//         // Call the onUpdate function to update the property data in the parent component
//         onUpdate(response.data);
//       } else {
//         throw new Error("Failed to update property.");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Edit Property</h2>
//       {/* <PropertyEditForm propertyId={property.id} property={property} onUpdate={handleUpdate} /> */}

//       <form onSubmit={handleSubmit} method="put">
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
//         </div>
//         <div>
//           <label htmlFor="description">Description:</label>
//           <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
//         </div>
//         <div>
//           <label htmlFor="price">Price:</label>
//           <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
//         </div>
//         <div>
//           <label htmlFor="location">Location:</label>
//           <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
//         </div>
//         <div>
//           <label htmlFor="image">Image:</label>
//           <input type="file" id="image" name="image" onChange={handleChange} accept="image/*" />
//           {formData.image && <img src={formData.image} alt="Property" />}
//         </div>
//         <div>
//           <label htmlFor="gallery">Gallery:</label>
//           <input type="file" id="gallery" name="gallery" onChange={handleChange} multiple accept="image/*" />
//           {formData.gallery.map((image, index) => (
//             <img key={index} src={image} alt={`Image ${index + 1}`} />
//           ))}
//         </div>
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// };