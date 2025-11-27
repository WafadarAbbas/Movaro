
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppSettings } from "./../../config/app-settings.js";
import { slideToggle } from "../panel/composables/slideToggle.js";
import { FaSignOutAlt } from "react-icons/fa";
import PersonIcon from "@mui/icons-material/Person";
import { useUser } from "../../context/UserContext";

function SidebarProfile() {
  const { userName, emailAddress, profileImage, userId } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
     localStorage.removeItem("currentContractID");
    navigate("/home");
  };

  function handleProfileExpand(e) {
    e.preventDefault();

    var targetSidebar = document.querySelector(".app-sidebar:not(.app-sidebar-end)");
    var targetMenu = e.target.closest(".menu-profile");
    var targetProfile = document.querySelector("#appSidebarProfileMenu");
    var expandTime = targetSidebar?.getAttribute("data-disable-slide-animation") ? 0 : 250;

    if (targetProfile) {
      if (targetProfile.style.display === "block") {
        targetMenu.classList.remove("active");
      } else {
        targetMenu.classList.add("active");
      }
      slideToggle(targetProfile, expandTime);
      targetProfile.classList.toggle("expand");
    }
  }

  return (
    <AppSettings.Consumer>
      {() => (
        <div className="menu">
          <div className="menu-profile">
            <Link to="/" onClick={handleProfileExpand} className="menu-profile-link">
              <div className="menu-profile-cover with-shadow"></div>
              <div className="menu-profile-image">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="rounded"
                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  />
                ) : (
                  <PersonIcon style={{ fontSize: 30, color: "white" }} />
                )}
              </div>
              <div className="menu-profile-info">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="flex-grow-1" style={{  fontSize: "12px",  color: "#cfcfcf"  }}  >
                    {userName || "Guest.."}
                   
                  </div>
                  <div className="menu-caret ms-auto"></div>
                </div>
                <small> {userId || "Guest.."} </small>
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
          </div>
        </div>
      )}
    </AppSettings.Consumer>
  );
}

export default SidebarProfile;
