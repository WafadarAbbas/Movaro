 

import React, { useEffect, useState } from 'react';
import { AppSettings } from './config/app-settings.js';

import Header from './components/header/header.jsx';
import Content from './components/content/content.jsx';

import { UserProvider } from "./context/UserContext.js";
import { CriiptoVerifyProvider } from "@criipto/verify-react";
import { AuthProvider } from './context/AuthContext.js';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {	
	const [appTheme] = useState('');
	const [appDarkMode, setAppDarkMode] = useState(false);
	const [appGradientEnabled] = useState(false);

	 
	const [appHeaderNone, setAppHeaderNone] = useState(false);
	const appHeaderFixed = true;
	const appHeaderInverse = false;
	const appHeaderMegaMenu = false;
	const appHeaderLanguageBar = false;

	 
	const appSidebarNone = true;

 
	const appContentNone = false;
	const appContentClass = '';
	const appContentFullHeight = false;

	const [hasScroll, setHasScroll] = useState(false);

	const handleSetAppDarkMode = (value) => {
		if (value === true) {
			document.querySelector('html').setAttribute('data-bs-theme', 'dark');
		} else {
			document.querySelector('html').removeAttribute('data-bs-theme');
		}
		setAppDarkMode(value);
		if (localStorage) {
			localStorage.appDarkMode = value;
		}
		document.dispatchEvent(new Event('theme-reload'));
	};

	const handleSetAppTheme = (value) => {
		var newTheme = 'theme-' + value;
		for (var x = 0; x < document.body.classList.length; x++) {
			if (
				document.body.classList[x].indexOf('theme-') > -1 &&
				document.body.classList[x] !== newTheme
			) {
				document.body.classList.remove(document.body.classList[x]);
			}
		}
		document.body.classList.add(newTheme);

		if (localStorage && value) {
			localStorage.appTheme = value;
		}
		document.dispatchEvent(new Event('theme-reload'));
	};

	useEffect(() => {
		handleSetAppTheme(appTheme);
		if (appDarkMode) {
			handleSetAppDarkMode(true);
		}

		const handleScroll = () => {
			setHasScroll(window.scrollY > 0);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);

	}, [appTheme, appDarkMode]);

	return (
<CriiptoVerifyProvider
      domain="jinnah-test.criipto.id"
      clientID="urn:my:application:identifier:42807"
      acrValues="urn:grn:authn:se:bankid:another-device"
      redirectUri="http://localhost:3000/callback"
      scope="openid profile"
>
<AuthProvider>
<UserProvider>

<AppSettings.Provider
	value={{
		appTheme,
		appDarkMode,
		appGradientEnabled,
		appHeaderNone,
		appHeaderFixed,
		appHeaderInverse,
		appHeaderMegaMenu,
		appHeaderLanguageBar,
		hasScroll,
		appSidebarNone,  
		appContentNone,
		appContentClass,
		appContentFullHeight,
		handleSetAppDarkMode,
		handleSetAppTheme,
		 setAppHeaderNone,
	}}
>
<div
	className={
		'app ' +
		(appHeaderFixed && !appHeaderNone ? 'app-header-fixed ' : '') +
		(appSidebarNone ? 'app-without-sidebar ' : '') +
		(hasScroll ? 'has-scroll ' : '')
	}
>
	{!appHeaderNone && <Header />}
	{!appContentNone && <Content />}
	<ToastContainer position="top-right" autoClose={false} closeOnClick draggable />
</div>

</AppSettings.Provider>
</UserProvider>
</AuthProvider>
</CriiptoVerifyProvider>
	);
}

export default App;
