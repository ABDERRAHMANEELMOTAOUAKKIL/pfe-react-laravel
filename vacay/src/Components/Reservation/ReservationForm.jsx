
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './reservation.css';

// const ReservationForm = () => {
// const [propertyId, setPropertyId] = useState('');
// const [checkInDate, setCheckInDate] = useState('');
// const [checkOutDate, setCheckOutDate] = useState('');
// const [guests, setGuests] = useState('');
// const [cardNumber, setCardNumber] = useState('');
// const [expiryDate, setExpiryDate] = useState('');
// const [cvv, setCvv] = useState('');
// const [isLoading, setIsLoading] = useState(false);
// const [isError, setIsError] = useState(false);
// const [propertyName, setPropertyName] = useState('');
// const [propertyImage, setPropertyImage] = useState('');
// const [property, setProperty] = useState(null);
// const [id, setId] = useState(null);

// useEffect(() => {
//   const fetchProperty = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/properties/${id}`);
//       setProperty(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (id) {
//     fetchProperty();
//   }
// }, [id]);

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsLoading(true);
//   setIsError(false);

//   try {
//     // Make an API call to create the reservation
//     const reservationResponse = await axios.get('http://localhost:8000/api/reservations', {
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       property_id: propertyId,
//       check_in_date: checkInDate,
//       check_out_date: checkOutDate,
//       guests: guests
//     });

//     // Retrieve the reservation ID from the successful response
//     const reservationId = reservationResponse.data.id;

//     // Make an API call to process the payment
//     const paymentResponse = await axios.post(`http://localhost:8000/api/reservations/${reservationId}/payments`, {
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       card_number: cardNumber,
//       expiry_date: expiryDate,
//       cvv: cvv
//     });

//     // Handle success response, display confirmation, or navigate to success page
//   } catch (error) {
//     setIsError(true);
//   }

//   setIsLoading(false);
// };

// return (
//   <section>
    
 
//   <div className="booking-form" style={{marginBottom:'2%'}}>
//   <h2>Booking Form</h2>
//     <form onSubmit={handleSubmit}>
//     {property && (
//             <div>
//               <h2>Property Details</h2>
//               <p>Property ID: {property.id}</p>
//               <p>Property Name: {property.name}</p>
//               {/* Add any other property details you want to display */}
//             </div>
//           )}
//        <input
//             type="text"
//             value={id}
//             onChange={(e) => setId(e.target.value)}
//             placeholder="Property ID"
//           />
//       <input
//         type="date"
//         value={checkInDate}
//         onChange={(e) => setCheckInDate(e.target.value)}
//         placeholder="Check-in Date"
//       />
//       <input
//         type="date"
//         value={checkOutDate}
//         onChange={(e) => setCheckOutDate(e.target.value)}
//         placeholder="Check-out Date"
//       />
//       <input
//         type="number"
//         value={guests}
//         onChange={(e) => setGuests(e.target.value)}
//         placeholder="Guests"
//       />

//       <h2>Payment Details</h2>
//       <input
//         type="text"
//         value={cardNumber}
//         onChange={(e) => setCardNumber(e.target.value)}
//         placeholder="Card Number"
//       />
//       <input
//         type="text"
//         value={expiryDate}
//         onChange={(e) => setExpiryDate(e.target.value)}
//         placeholder="Expiry Date"
//       />
//       <input
//         type="text"
//         value={cvv}
//         onChange={(e) => setCvv(e.target.value)}
//         placeholder="CVV"
//       />

//       {/* {isError && <p>Error occurred while processing reservation and payment.</p>} */}
//       <button type="submit" disabled={isLoading}>
//         {isLoading ? 'Processing...' : 'Make Reservation and Payment'}
//       </button>
//     </form>
//   </div>
//   </section>
// );
// };

// export default ReservationForm;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './reservation.css';

const ReservationForm = () => {
  const [id, setId] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);

    try {
      // Make an API call to create the reservation
      const reservationResponse = await axios.get('http://localhost:8000/api/reservations', {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        property_id: id,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        guests: guests
      });

      // Retrieve the reservation ID from the successful response
      const reservationId = reservationResponse.data.id;

      // Make an API call to process the payment
      const paymentResponse = await axios.post(`http://localhost:8000/api/reservations/${reservationId}/payments`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        card_number: cardNumber,
        expiry_date: expiryDate,
        cvv: cvv
      });

      // Handle success response, display confirmation, or navigate to success page
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  return (
    <section>
      <div className="booking-form" style={{ marginBottom: '2%' }}>
        <h2>Booking Form</h2>
        <form onSubmit={handleSubmit}>
          {property && (
            <div>
              <h2>Property Details</h2>
              <p>Property ID: {property.id}</p>
              <p>Property Name: {property.name}</p>
              <img src={property.image} alt="Property" /> {/* Assuming 'image' is the property image URL */}
              {/* Add any other property details you want to display */}
            </div>
          )}
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Property ID"
          />
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            placeholder="Check-in Date"
          />
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            placeholder="Check-out Date"
          />
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            placeholder="Guests"
          />

          <h2>Payment Details</h2>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Card Number"
          />
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="Expiry Date"
          />
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="CVV"
          />

          {/* {isError && <p>Error occurred while processing reservation and payment.</p>} */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Make Reservation and Payment'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ReservationForm;
