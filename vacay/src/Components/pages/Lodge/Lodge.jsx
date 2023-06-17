import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import './lodge.css';

const Lodge = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/categories/${id}/products`)
      .then(response => response.json())
      .then(data => setData(data));
  }, [id]);

  const handleClick = async (id, target) => {
    if (target === 'icon') {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/cart/store', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ product_id: id }),
        });

        if (response.ok) {
          // Item added to the cart successfully
          navigate('/cart'); // Redirect to the cart page
        } else {
          console.log('Failed to add item to cart');
        }
      } catch (error) {
        console.log('Error adding item to cart:', error);
      }
    } else {
      navigate(`/lodge/${id}`);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className=" col-md-3" style={{ display:'flex', justifyContent:'space-between', marginBottom:'20%' }}>
          {data.map(item => (
            <div key={item.id}  >
              <img className="img" src={item.image_url} height="350" alt="lodge" onClick={() => handleClick(item.id, 'card')} />
              <h4 className='ms-3'>{item.name}</h4>
              <h5 className='ms-3'>{item.location}</h5>
              <h6 className='ms-3'>{item.price} MAD</h6>
              <div style={{display:'flex', justifyContent:'end', marginTop:'-10vh'}}>
              <FavoriteSharpIcon  style={{ fontSize: '50', color:'grey', border:'2px solid grey' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lodge;





// // import React, { useState, useEffect } from 'react';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
// // import './lodge.css';

// // const Lodge = () => {
// //   const { slug } = useParams();
// //   const [data, setData] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetch(`http://127.0.0.1:8000/api/categories/${slug}/products`)
// //       .then(response => response.json())
// //       .then(data => setData(data));
// //   }, [slug]);

// //   const handleClick = async (id, target) => {
// //     if (target === 'icon') {
// //       try {
// //         const response = await fetch('http://127.0.0.1:8000/api/cart/store', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify({ product_id: id }),
// //         });

// //         if (response.ok) {
// //           // Item added to the cart successfully
// //           navigate('/cart'); // Redirect to the cart page
// //         } else {
// //           console.log('Failed to add item to cart');
// //         }
// //       } catch (error) {
// //         console.log('Error adding item to cart:', error);
// //       }
// //     } else {
// //       navigate(`/lodge/${id}`);
// //     }
// //   };

// //   return (
// //     <div className="container-fluid">
// //       <div className="row">
// //         <div className="col-md-4 m-5" style={{ display: 'flex', justifyContent: 'space-around' }}>
// //           {data.map(item => (
// //             <div key={item.id} className="card-img" onClick={() => handleClick(item.id, 'card')}>
// //               <img className="img" src={item.image_url} alt="lodge" />
// //               <h4>{item.name}</h4>
// //               <h5>{item.location}</h5>
// //               <h6>{item.price} MAD</h6>
// //               <FavoriteSharpIcon className="icn" style={{ fontSize: '50' }} onClick={(e) => {
// //                 e.stopPropagation();
// //                 handleClick(item.id, 'icon');
// //               }} />
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Lodge;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
// import './lodge.css';

// const Lodge = () => {
//   const { id } = useParams();
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(`http://127.0.0.1:8000/api/categories/${id}/products`)
//       .then(response => response.json())
//       .then(data => setData(data));
//   }, [id]);

//   const handleClick = async (id, target) => {
//     if (target === 'icon') {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/cart/store', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ product_id: id }),
//         });

//         if (response.ok) {
//           // Item added to the cart successfully
//           navigate('/cart'); // Redirect to the cart page
//         } else {
//           console.log('Failed to add item to cart');
//         }
//       } catch (error) {
//         console.log('Error adding item to cart:', error);
//       }
//     } else {
//       navigate(`/lodge/${id}`);
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-md-4 m-5" style={{ display: 'flex', justifyContent: 'space-around' }}>
//           {data.map(item => (
//             <div key={item.id} className="card-img" onClick={() => handleClick(item.id, 'card')}>
//               <img className="img" src={item.image_url} alt="lodge" />
//               <h4>{item.name}</h4>
//               <h5>{item.location}</h5>
//               <h6>{item.price} MAD</h6>
//               {/* <div className="properties">
//                 {item.properties.map(property => (
//                   <p key={property.id}>{property.name}: {property.value}</p>
//                 ))}
//               </div> */}
//               <FavoriteSharpIcon className="icn" style={{ fontSize: '50' }} onClick={(e) => {
//                 e.stopPropagation();
//                 handleClick(item.id, 'icon');
//               }} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Lodge;