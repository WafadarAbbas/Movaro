import React, { useEffect, useState } from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import userimg from '../../../assets/wafa.png';
import { FaUserEdit, FaSignOutAlt } from 'react-icons/fa';
import ApiCall from '../../../Apicall/ApiCall';
import axios from 'axios';
  import CryptoJS from "crypto-js";
  import PersonIcon from '@mui/icons-material/Person';

function DropdownProfile() {
  const navigate = useNavigate();

   const [profileImage, setProfileImage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/user/login-v3');
  };

  	  const getImageUrl = (path) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `https://localhost:44311/${path}`;
  };

  useEffect(() => {
      const fetchUserInfo = async () => {
  try {
      const encryptedToken = localStorage.getItem("authToken");
  
      if (!encryptedToken) return;
  
   
      const bytes = CryptoJS.AES.decrypt(encryptedToken, "my-super-secret-key");
      const token = bytes.toString(CryptoJS.enc.Utf8);
  
      const sessionResponse = await axios.get(
        "https://localhost:44311/api/services/app/Session/GetCurrentLoginInformations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "text/plain",
            "Content-Type": "application/json",
          },
        }
      );
  
           
  
      
       const userId = sessionResponse.data?.result?.user?.id;
  
     
         
  
  
            if (userId) {
          const userResponse = await ApiCall({
            url: `https://localhost:44311/api/services/app/User/Get?Id=${userId}`,
            method: "GET",
          });
  
          const userData = userResponse.data?.result;
          console.log("Full User Data:", userData);  
  
  
      setProfileImage(getImageUrl(userData?.profileImage));
        }
  
        } catch (error) {
          console.error("Error fetching login info:", error);
        }
      };
  
      fetchUserInfo();
    }, []);


  return (
    <Dropdown className="navbar-item navbar-user " style={{ marginRight: "10px", }}>
      <Dropdown.Toggle className="navbar-link d-flex align-items-center  " style={{
    fontSize: '20px', 
  color:"rgb(255, 159, 67)"
  }} as="a">
     
     {profileImage ? (
          <img
            src={getImageUrl(profileImage)}
            alt="Profile"
            className="rounded"
            style={{ width: '50px', height: '50px', borderRadius: "50%" }}
          />
        ) : (
          <PersonIcon style={{ fontSize: 50, color: "gray" }} />
        )}
  
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        <Dropdown.Item href="/Profile" style={{ fontSize: '16px', fontWeight: 'bold' }}>
          <FaUserEdit /> Update Profile
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout} style={{ fontSize: '16px', fontWeight: 'bold' }}>
          <FaSignOutAlt /> Log Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownProfile;

