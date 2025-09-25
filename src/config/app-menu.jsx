const Menu = [

  { path: '/dashboard/v3', icon: 'fa fa-boxes', title: 'Dashboard',
 
  },

 


  { path: '/Testing', icon: 'fa fa-key', title: 'Testing',
    children: [
      { path: '/Testing/Testing', title: 'Testing' },
      { path: '/Testing/Testing2/:id', title: 'Testing2' },
      { path: '/Testing/Layout', title: 'Layout' },
    ]
  },
   
]

export default Menu;