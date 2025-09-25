import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import App from './../app.jsx';
import ProtectedRoute from './ProtectedRoute.js'

import DashboardV1 from './../pages/dashboard/dashboard-v1.js';
import DashboardV2 from './../pages/dashboard/dashboard-v2.js';
import DashboardV3 from './../pages/dashboard/dashboard-v3.js';

import LoginV3 from './../pages/user/login-v3.jsx';

import Testing from '../pages/Testing/Testing.jsx';

import ManageStocks from '../pages/Stocks/ManageStocks.jsx';

import Layout from '../pages/Layout/Layout.jsx';
import Testing2 from '../pages/Testing/Testing2.jsx';
import Users from '../pages/users/users.jsx';
import Profile from '../pages/Profile/Profile.jsx';
import SellerProfile from '../pages/SellerProfile/SellerProfile.jsx';

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
        element: <ProtectedRoute />,   
		// element: <Outlet />,
        children: [
          { path: 'v1', element: <DashboardV1 /> },
          { path: 'v2', element: <DashboardV2 /> },
          { path: 'v3', element: <DashboardV3 /> },
        ]
      },
 
      {
        path: 'Testing',
        element: <ProtectedRoute />, 
		// element: <Outlet />,   
        children: [
          { path: 'Testing', element: <Testing /> },
          { path: 'Testing2/:id', element: <Testing2 /> },
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
      element: <ProtectedRoute />, 
  children: [
    { path: '', element: <Profile /> }
  ]
},
{
  path: 'SellerProfile',
      element: <ProtectedRoute />, 
  children: [
    { path: '', element: <SellerProfile /> }
  ]
},
      {
        path: 'user/login-v3',
        element: <LoginV3 />,
      },
    ]
  }
];


 


export default AppRoute;

