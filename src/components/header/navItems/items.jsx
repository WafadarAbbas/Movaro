import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Form, FormControl, Button } from 'react-bootstrap'; // Import Form components
import { FaHome, FaInfoCircle } from 'react-icons/fa';
import './IconStyles.css';
import DropdownProfile from '../dropdown/profile';
function Items() {
  return (
    <div className="d-flex justify-content-between" >
 
       
        <DropdownProfile/>
    
    </div>
  );
}

export default Items;



