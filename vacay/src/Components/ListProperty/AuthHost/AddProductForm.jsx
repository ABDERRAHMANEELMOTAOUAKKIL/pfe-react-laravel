import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './host.css'

const AddProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [host, setHost] = useState(null);

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
  const [successMessage, setSuccessMessage] = useState('');

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
    .post('http://127.0.0.1:8000/api/properties', data,{
      headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'multipart/form-data', // Set the Content-Type header to multipart/form-data
              // 'Accept': 'application/json',    
               },
    })
    .then((response) => {
      console.log(response.data);
      setSuccessMessage('Accommodation added successfully');

      // Handle success, e.g., show a success message or redirect
    })
    .catch((error) => {
      console.error(error);
      // Handle error, e.g., show an error message
    });
};

 

  return (
    <div className='body'>
    <div className='containers'>
      <h2>Add New Property</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit} className='mb-5'>
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
        <button type="submit">Share now</button>
      </form>
    </div>
    </div>
  );

};




export default AddProductForm;
