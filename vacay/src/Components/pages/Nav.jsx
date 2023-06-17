import React, { useState } from 'react';
import './nav.css'; 
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Search/SearchBar';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import { useTranslation } from 'react-i18next';

function Nav() {
  // const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false); // initial state is false
  const [id]= useState('');

  function handleRegisterClick() {
    navigate('/login');
  }

  function handleLink2Click() {
    navigate('/register');
  }

  function handleLink3Click() {
    navigate('/');
  }

  function handleLink4Click() {
    navigate('/list-property');
  }
  function Click() {
    navigate(`/user/${id}`);
  }
  function ClickCart() {
    navigate('/cart');
  }
  
  function handleLogout() {
    localStorage.removeItem('token'); // remove token from local storage
    localStorage.removeItem('user'); // remove token from local storage
    setLoggedIn(false); // set login state to false
    navigate('/');
  }

  // check if user is logged in
  if (localStorage.getItem('token') && !loggedIn) {
    setLoggedIn(true);
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <nav className="navbar">
          <div className='col-md-3'>
            <li className='nav_link'>  
              <img className='logo' onClick={handleLink3Click} src="Untitled.png" alt='hello' />
            </li>
          </div>
          {/* <div className="col-md-2">
            <span>MAD</span>
            <button className='ctn_logo_btn'>
              <img className='cnt_logo' src="#" alt='#'/>
            </button>
          </div> */}
          <div className="col-md-3">
            <li className='nav_link' onClick={handleLink4Click} >
              <h4>List your property on VacaY</h4>
            </li>
          </div>
          <div className="col-sm-2">
            <SearchBar />
          </div>
          <div className='col-md-3 d-flex'>
            {loggedIn ? (
              <> 
              <div className='button' onClick={ClickCart}>
              <FavoriteIcon className='icns' />
              </div>
              <li className="button" onClick={Click}>
                Profile
                </li>
             
              <li className="button" onClick={handleLogout}>
                Logout
              </li>
              </>
            ) : (
              <>
                <li className="button" onClick={handleRegisterClick}>
                  Login
                </li>          
                <li className="button" onClick={handleLink2Click}>
                  Sign-In
                </li>     
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Nav;
