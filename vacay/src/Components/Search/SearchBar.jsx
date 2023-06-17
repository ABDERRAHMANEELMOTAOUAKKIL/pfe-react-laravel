import React, { useState } from "react";
import "./searchBar.css";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from "react-router";

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey  ] = useState('');
  const navigate = useNavigate();


const toggleSearchBar = () => {
    setIsOpen(!isOpen);
  };
  const handleSearch = () => {
    navigate(`/search/${key}`);
    setIsOpen(false); // Close the overlay when search button is clicked

  };

  return (
    <>
      <button className="search-icon" onClick={() => setIsOpen(true)}><SearchOutlinedIcon style={{fontSize:'50', color:'white'}}/></button>
    
      {isOpen && (
        <div className="overlay">
          <input className="overlay-input" type="text" 
          placeholder="Search"
          value={key}
          onChange={(e) => setKey(e.target.value)} />
          <button className="cncl-btn" onClick={handleSearch}>Search</button>
          <button className="cncl-btn color-red" onClick={toggleSearchBar}>  close</button>
        </div>
      )}
    </>
  );
}

export default SearchBar;