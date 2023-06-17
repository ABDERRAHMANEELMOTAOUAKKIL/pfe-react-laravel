import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import './searchBar.css'
const SearchList = () => {
  const { key } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/search/${key}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [key]);
return (
    <div className="container-fluid ">
      <div className="row">       
          <div className='col-md-4' style={{ display: 'flex', justifyContent:'space-between' }}>
            {products.map(product => (
            
             <div key={product.id} className="card-img m-2">
  
             <img className="img" src={product.image} alt="lodge" />
               <h4>{product.name}</h4>
               <h5>{product.location}</h5>
               <h5>{product.description}</h5>
               <h6>{product.price} MAD</h6>
               <FavoriteSharpIcon className="icn" style={{fontSize:'50'}}/>
  
            </div>
  
  
            ))}
          </div>      
        </div>
      </div>
     
    );
};

export default SearchList;