import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Form, FormControl, Button } from 'react-bootstrap'; // Import Form components
import { FaHome, FaInfoCircle } from 'react-icons/fa';
import './IconStyles.css';
import DropdownProfile from '../dropdown/profile';
function Items() {
  return (
    <div className="d-flex justify-content-between mt-3" >
<div>
      <Form className="d-flex align-items-center">
        <FormControl
          type="search"
          placeholder="Search "
          className="me-2"
          aria-label="Search"
          style={{ width: '500px',height:40, backgroundColor: '#fafafa', borderRadius: '10px', marginLeft:'60px'}}
        />

      </Form>
      </div>
      <div className="d-flex justify-content-end align-items-center" 
      >

        {/* <div
          className="d-flex align-items-center justify-content-center me-3"
          style={{
            backgroundColor: '#f0f0f0',
            borderRadius: '30%',
            width: '40px',
            height: '40px',
          }}
        >
         <i className="fa fa-envelope-o icon-hover" aria-hidden="true" style={{fontSize:18}}></i>

        </div>



        <div className="d-flex align-items-center justify-content-center me-3"
          style={{
            backgroundColor: '#f0f0f0',
            borderRadius: '30%',
            width: '40px',
            height: '40px',
          }}>
          <i class="fa fa-bell-o  icon-hover" aria-hidden="true"  style={{fontSize:18}}></i>
        </div>

        <div className="d-flex align-items-center justify-content-center me-3"
          style={{
            backgroundColor: '#f0f0f0',
            borderRadius: '30%',
            width: '40px',
            height: '40px',
          }}>
         <i class="fa fa-cog  icon-hover" aria-hidden="true" style={{fontSize:18}}></i>
        </div> */}
        <DropdownProfile/>
      </div>
    </div>
  );
}

export default Items;



