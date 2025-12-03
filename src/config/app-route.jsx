import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import App from './../app.jsx';
import ProtectedRoute from './ProtectedRoute.js'

 
import DashboardV3 from './../pages/dashboard/dashboard-v3.js';

import LoginV3 from './../pages/user/login-v3.jsx';
 

import Testing from '../pages/Testing/Testing.jsx';

import ManageStocks from '../pages/Stocks/ManageStocks.jsx';

import Layout from '../pages/Layout/Layout.jsx';
import Testing2 from '../pages/Testing/Testing2.jsx';
import Testing3 from '../pages/Testing/Testing3.jsx';
import Users from '../pages/users/users.jsx';
import Profile from '../pages/Profile/Profile.jsx';
import Callback from '../context/Callback.js';
import SellerProfile from '../pages/SellerProfile/SellerProfile.jsx';
import RegisterV3 from '../pages/user/register-v3.js';
import RegisterV2 from '../pages/user/register-v2.jsx';
import BuyerRegisterV3 from '../pages/user/Buyer/buyer-register-v3.js';
// import BuyerRegisterV2 from '../pages/user/Buyer/buyyer-register-v2.jsx';
import ChooseAction from '../pages/user/ChooseAction.jsx';
import Seller from '../pages/SellerProfile/Seller.jsx';
import Buyer from '../pages/Buyer/Buyer.jsx';
import BuyerSuccess from '../pages/Buyer/BuyerSuccess.jsx';
import Home from '../pages/Landing/Home.jsx';

const AppRoute = [
  {
    path: '*',
    element: <App />,
    children: [
      {
        path: '',
        element: <Navigate to='/dashboard/v3' />
      },

      
      {
        path: 'dashboard/*',
        // element: <ProtectedRoute />,   
		// element: <Outlet />,
        children: [
       
          { path: 'v3', element: <DashboardV3 /> },
        ]
      },
 
      {
        path: 'Testing',
        // element: <ProtectedRoute />, 
		element: <Outlet />,   
        children: [
          { path: 'Testing', element: <Testing /> },
          { path: 'Testing2', element: <Testing2 /> },
           { path: 'Testing3', element: <Testing3/> },
          { path: 'Layout', element: <Layout /> },
        ]
      },

    
{
  path: 'ManageStocks',
      element: <ProtectedRoute />, 
  children: [
    { path: '', element: <ManageStocks /> }
  ]
},


{
  path: 'users',
  element: <ProtectedRoute />, 
  children: [
    { path: '', element: <Users /> }
  ]
},

{
  path: 'Profile',
      // element: <ProtectedRoute />, 
  children: [
    { path: '', element: <Profile /> }
  ]
},
{
  path: 'SellerProfile',
      // element: <ProtectedRoute />, 
  children: [
    { path: '', element: <SellerProfile /> }
  ]
},

{
  path: 'Seller',
      // element: <ProtectedRoute />, 
  children: [
    { path: '', element: <Seller /> }
  ]
},

{
  path: 'Buyer',
      // element: <ProtectedRoute />, 
  children: [
    { path: '', element: <Buyer/> }
  ]
},
{
  path: 'BuyerSuccess',
      // element: <ProtectedRoute />, 
  children: [
    { path: '', element: <BuyerSuccess/> }
  ]
},
 

      	{
				path: 'user/*', 
				element: <Outlet />,
				children: [
					{ path: 'login-v3', element:<LoginV3 /> },
					{ path: 'register-v3', element:<RegisterV3 /> },
          { path: 'register-v2', element:<RegisterV2 /> },
          //  { path: 'buyerRegister-v2', element:<BuyerRegisterV2/> },
            { path: 'buyerRegister-v3', element:<BuyerRegisterV3 /> },
          { path: 'ChooseAction', element:<ChooseAction/> },
 
				]
			}, 
       
       {
        path: 'callback',
        element: <Callback/>,
      },
        {
        path: 'Home',
        element: <Home/>,
      },
    ]
  }
];


  


export default AppRoute;

