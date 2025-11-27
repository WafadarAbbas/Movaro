import React, { useContext } from 'react';
import { useResolvedPath, useMatch, NavLink, useLocation, matchPath, useNavigate } from 'react-router-dom';
import { AppSettings } from './../../config/app-settings.js';
import menus from './../../config/app-menu.jsx';
 import img from '../../assets/wafa.png';


 import StockMenu from "../../config/app-stockmenu.jsx";
import { FaSignOutAlt } from 'react-icons/fa';

function NavItem({ menu, ...props }: LinkProps) {
 
  let resolved = useResolvedPath(menu.path);
  let match = useMatch({ path: resolved.pathname });
  
  let location = useLocation();
  let match2 = matchPath({path: menu.path, end: false, },location.pathname);
  
  let iconStyle = { fontSize: '14px' };   
 
  let titleStyle = { fontSize: '16px' };   
  let itemStyle = { marginBottom: '3px',marginTop:'5px' };

	let icon = menu.icon && <div className="menu-icon" style={iconStyle} ><i className={menu.icon}></i></div>;
	let img = menu.img && <div className="menu-icon-img"><img src={menu.img} alt="" /></div>;
	let caret = (menu.children && !menu.badge) && (
		<div className="menu-caret" style={{
		  fontSize: 10, 
		  border: '1px  ',   // Adds a light bor
		  borderRadius: '50%',        // Makes it fully rounded
		  width: '17px',              // Sets fixed width to ensure circle shape
		  height: '17px',             // Sets fixed height to match width
		  display: 'flex',            // Center-align caret within circle
		  alignItems: 'center',
		  justifyContent: 'center',
		  backgr: 'rgba(255, 159, 67, 0.2)',
		}}>
 
		</div>
	  );
	  
	let label = menu.label && <span className="menu-label ms-5px">{menu.label}</span>;
	let badge = menu.badge && <div className="menu-badge">{menu.badge}</div>;
	let highlight = menu.highlight && <i className="fa fa-paper-plane text-theme"></i>;
	let title = menu.title && <div className="menu-text" style={titleStyle}>{menu.title} {label} {highlight}</div>;
	
	return (
    <div className={'menu-item' + ((match || match2) ? ' active' : '') + (menu.children ? ' has-sub' : '')}  style={itemStyle}>
    	<NavLink className="menu-link" to={menu.path} {...props} >
				{ img } { icon } { title }{ caret } { badge }
			</NavLink>
			
      {menu.children && (
				<div className="menu-submenu">
					{menu.children.map((submenu, i) => (
						<NavItem key={i} menu={submenu} />
					))}
				</div>
			)}
    </div>
  );
}

function SidebarNav() {
  const context = useContext(AppSettings);
	
	function handleSidebarSearch(e) {
		let targetValue = e.target.value;
				targetValue = targetValue.toLowerCase();
		
		if (targetValue) {
			var elms = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search), .app-sidebar:not(.app-sidebar-end) .menu-submenu > .menu-item'));
			if (elms) {
				elms.map(function(elm) {
					elm.classList.add('d-none');
					return true;
				});
			}
			var elms2 = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .has-text'));
			if (elms2) {
				elms2.map(function(elm) {
					elm.classList.remove('has-text');
					return true;
				});
			}
			var elms3 = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .expand'));
			if (elms3) {
				elms3.map(function(elm) {
					elm.classList.remove('expand');
					return true;
				});
			}
			var elms4 = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search) > .menu-link, .app-sidebar .menu-submenu > .menu-item > .menu-link'));
			if (elms4) {
				elms4.map(function(elm) {
					var targetText = elm.textContent;
							targetText = targetText.toLowerCase();
					if (targetText.search(targetValue) > -1) {
						var targetElm = elm.closest('.menu-item');
						if (targetElm) {
							targetElm.classList.remove('d-none');
							targetElm.classList.add('has-text');
						}
			
						var targetElm2 = elm.closest('.menu-item.has-sub');
						if (targetElm2) {
							var targetElm3 = targetElm.querySelector('.menu-submenu .menu-item.d-none');
							if (targetElm3) {
								targetElm3.classList.remove('d-none');
							}
						}
			
						var targetElm4 = elm.closest('.menu-submenu');
						if (targetElm4) {
							targetElm4.style.display = 'block';
				
							var targetElm5 = targetElm.querySelector('.menu-item:not(.has-text)');
							if (targetElm5) {
								targetElm5.classList.add('d-none');
							}
				
							var targetElm6 = elm.closest('.has-sub:not(.has-text)');
							if (targetElm6) {
								targetElm6.classList.remove('d-none');
								targetElm6.classList.add('expand');
					
								var targetElm7 = targetElm.closest('.has-sub:not(.has-text)');
								if (targetElm7) {
									targetElm7.classList.remove('d-none');
									targetElm7.classList.add('expand');
								}
							}
						}
					}
					return true;
				});
			}
		} else {
			var elms5 = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search).has-sub .menu-submenu'));
			if (elms5) {
				elms5.map(function(elm) {
					elm.removeAttribute('style');
					return true;
				});
			}

			var elms6 = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search)'));
			if (elms6) {
				elms6.map(function(elm) {
					elm.classList.remove('d-none');
					return true;
				});
			}

			var elms7 = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .menu-submenu > .menu-item'));
			if (elms7) {
				elms7.map(function(elm) {
					elm.classList.remove('d-none');
					return true;
				});
			}

			var elms8 = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .expand'));
			if (elms8) {
				elms8.map(function(elm) {
					elm.classList.remove('expand');
					return true;
				});
			}
		}
	}
 
	return (
		
<div className="menu" style={{ padding: 15, marginTop: 10 }}>
      <h6  style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 500, fontSize: '1.0rem' }}>Main</h6>
      {menus.map((menu, i) => (
        <NavItem key={i} menu={menu} />
      ))}
	   
      {/* <hr style={{ bo: '#ddd', borderWidth: '1px', borderStyle: 'solid' }} /> */}

	  {/* <h6 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 500,  fontSize: '1.1rem' }}>Inventory</h6>
      {Invetory.map((invetory, i) => (
        <NavItem key={i} menu={invetory} />
      ))}
	    <hr style={{ bo: '#ddd', borderWidth: '1px', borderStyle: 'solid' }} />
      
      <h6 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 500, fontSize: '1.1rem' }}>Product Details</h6>
      {detailsmenu.map((detailsmenu, i) => (
        <NavItem key={i} menu={detailsmenu} />
      ))}
	  <hr style={{ bo: '#ddd', borderWidth: '1px', borderStyle: 'solid' }} />

	  <h6 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 500, fontSize: '1.1rem' }}>Purchase Order</h6>
      {purchaseMenu.map((purchasemenu, i) => (
        <NavItem key={i} menu={purchasemenu} />
      ))}
	  <hr style={{ bo: '#ddd', borderWidth: '1px', borderStyle: 'solid' }} />

<h6 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 500,  fontSize: '1.1rem'}}>Stocks</h6>
      {StockMenu.map((stockMenu, i) => (
        <NavItem key={i} menu={stockMenu} />
      ))}*/}

<hr style={{ borderColor: '#aaaaaaff', borderWidth: '1px', borderStyle: 'solid' }} />

<h6 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 500,  fontSize: '1.0rem' }}>StockMenu </h6>
      {StockMenu.map((stockMenu, i) => (
        <NavItem key={i} menu={stockMenu} />
      ))} 

	 
    </div>
	);
}

export default SidebarNav;