import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppSettings } from './../../config/app-settings.js';
import { slideToggle } from '../panel/composables/slideToggle.js';
import { FaSignOutAlt } from 'react-icons/fa';
 import userr from "../../assets/wafa.png";
 import ApiCall from "../../Apicall/ApiCall.js";
import axios from 'axios';
 import CryptoJS from "crypto-js";
 import PersonIcon from '@mui/icons-material/Person';
function SidebarProfile() {

	const [userName, setUserName] = useState("");
	const [emailAddress, setemailAddress] = useState("");
	 const [profileImage, setProfileImage] = useState("");

	function handleProfileExpand(e) {
		e.preventDefault();
		
		var targetSidebar = document.querySelector('.app-sidebar:not(.app-sidebar-end)');
		var targetMenu = e.target.closest('.menu-profile');
		var targetProfile = document.querySelector('#appSidebarProfileMenu');
		var expandTime = (targetSidebar && targetSidebar.getAttribute('data-disable-slide-animation')) ? 0 : 250;
	
		if (targetProfile) {
			if (targetProfile.style.display === 'block') {
				targetMenu.classList.remove('active');
			} else {
				targetMenu.classList.add('active');
			}
			slideToggle(targetProfile, expandTime);
			targetProfile.classList.toggle('expand');
		}
	}
     const navigate = useNavigate();
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

         

        const fetchedUserName = sessionResponse.data?.result?.user?.userName;
		 const emailAddress = sessionResponse.data?.result?.user?.emailAddress;
		 const userId = sessionResponse.data?.result?.user?.id;

	 
        if (fetchedUserName) {
          setUserName(fetchedUserName); 
         setemailAddress(emailAddress);
        }


		      if (userId) {
        const userResponse = await ApiCall({
          url: `https://localhost:44311/api/services/app/User/Get?Id=${userId}`,
          method: "GET",
        });

        const userData = userResponse.data?.result;
        console.log("Full User Data:", userData); // ✅ Result console me


		setProfileImage(getImageUrl(userData?.profileImage));
      }

      } catch (error) {
        console.error("Error fetching login info:", error);
      }
    };

    fetchUserInfo();
  }, []);

	return (
		<AppSettings.Consumer>
			{({appSidebarMinify}) => (
				<div className="menu">
					<div className="menu-profile">
						<Link to="/" onClick={handleProfileExpand} className="menu-profile-link">
							<div className="menu-profile-cover with-shadow"></div>
							<div className="menu-profile-image">
							<img
  src={profileImage || ""}
  alt="Profile"
//   style={{ display: profileImage ? "block" : "none", width: 50, height: 50, borderRadius: "50%" }}
/>
{!profileImage && <PersonIcon style={{ fontSize: 50, color: "gray" }} />}
							</div>
							<div className="menu-profile-info">
								<div className="d-flex align-items-center">
									   <div className="flex-grow-1">
                    {userName || "Guest.."}  
                  </div>
									<div className="menu-caret ms-auto"></div>
								</div>
								<small>{emailAddress || "...@gmai.com"} </small> 
							</div>
						</Link>
					</div>
					<div id="appSidebarProfileMenu" className="collapse">
						<div className="menu-item pt-5px">
						   <style>
								{`
								  .logout-block {
									margin-left: 25px;
									cursor: pointer;
									font-size: 14px;
									 margin-top: 2px;
									transition: color 0.3s ease;
									display: inline-flex;
									align-items: center;
									gap: 5px;
									 color: #646464ff;
								  }
								  .logout-block:hover {
									color: red;
								  }
								`}
							  </style>
								<div className="logout-block" onClick={handleLogout}>
								  <FaSignOutAlt /> Log Out
							   </div>
						</div>
						<div className="menu-item">
							<Link to="/" className="menu-link">
								<div className="menu-icon"><i className="fa fa-pencil-alt"></i></div>
								<div className="menu-text"> Send Feedback</div>
							</Link>
						</div>
						 
						<div className="menu-divider m-0"></div>
					</div>
				</div>
			)}
		</AppSettings.Consumer>
	)
}

export default SidebarProfile; 