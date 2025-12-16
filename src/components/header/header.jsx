
import React from 'react';
import { Link } from 'react-router-dom';
import DropdownProfile from './dropdown/profile.jsx';
import logo from '../../assets/Klargo1.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Items from './navItems/items.jsx';
import { AppSettings } from './../../config/app-settings.js';
import { useUser } from "../../context/UserContext.js";
import { Container } from "@mui/material";
function Header() {

  const { userName } = useUser();
  return (
    <AppSettings.Consumer>
      {({
        toggleAppSidebarMobile,
        toggleAppSidebarEndMobile,
        appHeaderMegaMenu,
        appTopMenu,
        appSidebarNone
      }) => (

        <div
          id="header"
          className="app-header"
          style={{
            borderBottom: '1px solid #ddd',
            background: '#fff'
          }}
        >
          <Container maxWidth="lg">
            <div
              className="d-flex justify-content-between align-items-center "
            >

              <div className="d-flex align-items-center">


                <Link
                  to="/user/ChooseAction"
                  className="navbar-brand"
                  style={{
                    color: 'black',
                    fontSize: '18px',
                    fontWeight: 500,
                    textDecoration: 'none'
                  }}
                >
                  <img
                    src={logo}
                    alt="Klargo"
                    style={{
                      width: "120px",
                      height: "auto",
                      maxWidth: "100%",
                    }}

                  />
                </Link>
              </div>


              <div className="d-none d-lg-flex align-items-center gap-3">

                <Items />
              </div>


              <div className="d-lg-none">

                <DropdownProfile />
              </div>
            </div>
          </Container>


        </div>

      )}
    </AppSettings.Consumer>
  );
}

export default Header;
