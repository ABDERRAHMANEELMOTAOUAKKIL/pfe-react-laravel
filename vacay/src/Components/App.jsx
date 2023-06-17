import React from 'react';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { Register } from './Auth/Register';
import { Login } from './Auth/Login';
import User from './Auth/User';
import Nav from './pages/Nav';
import Footer from './pages/Footer';
import {ListProperty} from './ListProperty/ListProperty';
import { RegisterHost } from './ListProperty/AuthHost/RegisterHost';
import { LoginHost } from './ListProperty/AuthHost/LoginHost';
import LodgeList from './pages/Lodge/LodgeList';
import Lodge from './pages/Lodge/Lodge';
import ImgMediaCard from './pages/CarouselCard';
import SearchList from './Search/SearchList';
import { HostProfile } from './ListProperty/AuthHost/HostProfile';
import AddProductForm from './ListProperty/AuthHost/AddProductForm';
import Cart from './pages/Lodge/Cart';
import ReservationForm from './Reservation/ReservationForm';
import { PropertyEditForm } from './ListProperty/AuthHost/Properties/PropertyEditForm';
function App() {

 
    return (
      <div>

      
      <Nav/>
  
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/login" element={<Login/>} />    
      <Route exact path="/register" element={<Register />} />    
      <Route exact path="/user/:name" element={<User />} />
      <Route exact path="/list-property" element={<ListProperty />} />    
      <Route exact path="/host-register" element={<RegisterHost />} />    
      <Route exact path="/host-login" element={<LoginHost />} />    
      <Route exact path="/host-profile/:name" element={<HostProfile />} />    
      <Route exact path="/listing/category" element={<ImgMediaCard />} />  
      <Route exact path={'/categories/:id/products'} element={<Lodge />} />
      <Route exact path="/lodge/:id" element= {<LodgeList/>} />
      <Route exact path="/search/:key" element= {<SearchList/>} />
      <Route exact path="/add-products" element= {<AddProductForm/>} />
      <Route exact path="/user-reservation" element= {<ReservationForm/>} />
      <Route exact path="/cart" element= {<Cart/>} />
      <Route path="/properties/edit/:property_id" element={<PropertyEditForm />} />


  
          {/* <Route exact path="/categories/:slug/products" render={(props) => <Lodge slug={props.match.params.slug} />} /> */}

      {/* <Route exact path="/Lodge-List" element={<LodgeList />} />     */}
      {/* <Route path="/product/category/:slug" element={ViewLodge } /> */}

      
    </Routes> 

    <Footer/>
    </div>
  )
}


export default App;