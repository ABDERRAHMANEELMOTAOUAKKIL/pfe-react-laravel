import { Bed, CalendarMonth, CalendarToday, Person } from '@mui/icons-material';
import { useState } from 'react';
import React from 'react';
import './bottomNav.css';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns";



function BottomNav() {
    const [openDate, setOpenDate] = useState(false)
    const [date, setDate] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult:1,
        enfants:0,
        animaux:0
      });
      const [nights, setNights] = useState(1);


      // const handleOption = (name, operation) => {
      //   setOptions((prev) => {
      //     return {
      //       ...prev,
      //       [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      //     };
      //   });
      // };
      const handleOption = (name, operation) => {
        if (name === "nights") {
          setNights((prevNights) =>
            operation === "i" ? prevNights + 1 : prevNights - 1
          );
        } else {
          setOptions((prevOptions) => ({
            ...prevOptions,
            [name]: operation === "i" ? prevOptions[name] + 1 : prevOptions[name] - 1,
          }));
        }
      };
      const handleSubmit = (event) => {
        event.preventDefault();
      
        const formData = new FormData(event.target);
        formData.append("nights", nights);
      
        // Rest of your form submission logic
      };

    return ( 
    <div className = 'container-fluid bck_img' >
     <div className="title">
      <img src="" alt="" />
      <h1 style={{color:'white', fontSize:70, fontweight:'bold',textTransform: 'uppercase'}}> Stay With Us & Relax </h1>
        <h4 className='mt-5' style={{color:'white'}}>Furnished apartments designed with you in mind. <br />
             All you have to do is unpack your bags and start living. <br /> We're flexible, so you can move-in and move-out on the dates you need.</h4>
      </div>
        
        <div className = "form" >
        <div className = "col-md-6" >
        <div className='input_form'>
        <Bed className = 'icon_form'/>
        <input type = "text"
        placeholder = 'Destination'/>
        </div>
        {/* <div className='input_form'>
        <CalendarMonth className = 'icon_form'/>
        < span onClick = {
            () => setOpenDate(!openDate) } > < input type = "text"
        placeholder = { `${format(date[0].startDate,"MM/dd/yyyy")} - ${format(date[0].endDate,"MM/dd/yyyy")}`}/>
         </span>
        {
            openDate && < DateRange
            editableDateInputs = { true }
            onChange = { item => setDate([item.selection]) }
            moveRangeOnFirstSelection = { false }
            ranges = { date }
            className = "date"/>
        } */}
        <div className="input_form">
  <CalendarMonth className="icon_form" />
  <input
    type="number"
    placeholder="Number of Nights"
    value={nights}
    onChange={(e) => setNights(parseInt(e.target.value))}
  />
</div>

        </div>
          <div className="input_form">
          <Person className = 'icon_form'/>
                <span onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                > <input type="text" placeholder={`${options.adult} adult · ${options.enfants} enfants · ${options.animaux} animaux`}/> </span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">enfants</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.enfants <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("enfants", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.enfants}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("enfants", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">animaux</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.animaux <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("animaux", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.animaux}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("animaux", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
              
                <button className='btn_form ' onClick={handleSubmit}>
                  Rechercher
                </button>
              </div>
            </div>
          </div>
        
      // </div>
    
        

        
    );
}

export default BottomNav;