import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './auth.css';
import { useParams } from 'react-router';

const User = () => {
  const { name } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || null); // Retrieve the image URL from localStorage

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
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/${name}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          withCredentials: true
        });

        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [name]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center" style={{ margin: '20%' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="container-fluid bg-color  mb-5">
      <div className="row">
        <div className="card col-md-10" style={{marginTop:'5%',borderRadius: '40px 40PX 0 0'}}>
        <div className='text-center'>

     

      {profileImage && (
        <div>
          <img src={profileImage} alt="Profile" style={{ width: '200px', height: '200px', borderRadius:'50%' }} />
        </div>
      )}
      <label htmlFor="image"> <strong>Add Profile picture</strong> </label><br />
    <input id="fileInput" type="file" accept="image/*" onChange={handleImageUpload}/>
    </div>
    <hr />
          <h5>{user.name}!</h5>
          <h5 style={{ fontWeight: 'bolder', textTransform: 'uppercase' }}>{user.user_type}</h5>
          <p>Email: {user.email}</p>
          <h5>Joined VacaY on: {user.created_at}</h5>
          <div className=" m-2" style={{textDecoration:'2px solid underline'}}>
          <h3>Reservation History</h3>
        </div>
        <div className=" m-2" style={{textDecoration:'2px solid underline'}}>
          <h3>Reviews</h3>
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
      <div className="ms-3">
      <strong>Marc</strong>
      <p>Great Host, nice place</p>

      </div>
      </div>
  </div>
    <li style={{textAlign:'end'}} href="">see more</li>  
  </div>


</div>
        </div>
        </div>
        
     
  );
};

export default User;








// import React, { useEffect, useState } from "react";

// const User= ()=>{
//   const [name, setName]= useState('');
  
//   useEffect(()=> {
//     (
//     async() => {
//       const response = await fetch('http://127.0.0.1:8000/api/user', {
//         headers:{
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//         credentials:'include',
//       });
//       const content = await response.json();

//       setName(content.name);
//       console.log(content.name)
//     }
//   )();
//   });

//   return(
//     <div style={{margin:'70px'}}>
//       <h1>Hello {name}</h1>
//     </div>
//   )
// }
// export default User;
// import React, { useEffect, useState } from "react";

// const User = () => {
//   const [name, setName] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     (
//       async () => {
//         const response = await fetch('http://127.0.0.1:8000/api/user', {
//           headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             'Authorization': 'Bearer ' + localStorage.getItem('token')
//           },
//           credentials: 'include',
//         });

//         if (response.status === 200) {
//           const content = await response.json();
//           setName(content.name);
//         } else if (response.status === 204) {
//           setError('No user data to display');
//         } else {
//           setError('Failed to load user data');
//         }
//       }
//     )();
//   }, []);

//   return (
//     <div style={{ margin: '70px' }}>
//       {error ? (
//         <h1>{error}</h1>
//       ) : (
//         <h1>Hello {name}</h1>
//       )}
//     </div>
//   )
// }

// export default User;

// import React, { useEffect, useState } from "react";
// import axios from 'axios';

// const User = () => {
//   const [name, setName] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     (
//       async () => {
//         try {
//           const response = await axios.get('http://localhost:8000/api/user', {
//             headers: {
//               'Content-Type': 'application/json',
//               'Accept': 'application/json',
//               'Authorization': 'Bearer ' + localStorage.getItem('token')
//             },
//             withCredentials: true
//           });

//           if (response.status === 200) {
//             setName(response.data.name);
//           } else if (response.status === 204) {
//             setError('No user data to display');
//           } else {
//             setError('Failed to load user data');
//           }
//         } catch (error) {
//           setError('Failed to load user data');
//         }
//       }
//     )();
//   }, []);

//   return (
//     <div style={{ margin: '70px' }}>
//       {error ? (
//         <h1>{error}</h1>
//       ) : (
//         <h1>Hello {name}</h1>
//       )}
//     </div>
//   )
// }

// export default User;
// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const User = () => {
//   const [user, setUser] = useState({});
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/user', {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           },
//           withCredentials: true
//         });
//         setUser(response.data);
//       } catch (error) {
//         setError('Failed to retrieve user profile information');
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   return (
//     <div>
//       {error ? (
//         <p>{error}</p>
//       ) : (
//         <div>
//           <p>Name: {user.name}</p>
//           <p>Email: {user.email}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default User;
// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const User = () => {
//   const [user, setUser] = useState({});
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/user', {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           },
//           withCredentials: true
//         });
//         setUser(response.data);
//       } catch (error) {
//         setError('Failed to retrieve user profile information');
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   return (
//     <div>
//       {error ? (
//         <p>{error}</p>
//       ) : (
//         <div>
//           <p>Name: {user.name}</p>
//           <p>Email: {user.email}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default User;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const User = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/user', {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           },
//           withCredentials: true
//         });

//         setUser(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Welcome {user.name}!</h1>
//       <p>Email: {user.email}</p>
//       <p>Role: </p>
//       {/* You could add more user information here */}
//     </div>
//   );
// };

// export default User;