import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.log('Error fetching cart items:', error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const response = await fetch('/api/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart_item_id: cartItemId }),
      });

      if (response.ok) {
        fetchCartItems();
      } else {
        console.log('Failed to remove item from cart');
      }
    } catch (error) {
      console.log('Error removing item from cart:', error);
    }
  };

  return (
    <div className='mb-5'>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.product.name}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
