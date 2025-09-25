

import React, { useRef, useState } from 'react';
import { FaFilter, FaEdit, FaEye, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Buton from '../../Compo/Buton';
// import ViewModal from './ViewModal';

function Layout() {
  const createRef = useRef(null);
  const refClose = useRef(null);

  const Layouts = [
    { name: 'Sofa', category: 'Furniture', brand: 'Ikea', price: '$300', image: 'https://poshish.pk/cdn/shop/files/w-POS00447-1_1800x1800.webp?v=1722932843' },
    { name: 'RunMen', category: 'Shoes', brand: 'Nike', price: '$500', image: 'https://speedsports.pk/cdn/shop/Layouts/aurora_fd2291-403_phslh000-2000.jpg?v=1710212570' },
    { name: 'T-Shirt', category: 'Clothing', brand: 'Zara', price: '$50', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhoMkC2n3HiIU4zIxda5HE4aTCenO43y7myA&s' },
    { name: 'Apple', category: 'Groceries', brand: 'Whole Foods', price: '$20', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTqBOfkJOBqR4ISvqOQBR8zG1NBlJfSKIWuw&s' },
    { name: 'Dining Table', category: 'Furniture', brand: 'Ikea', price: '$300', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_XNEyjBf18m0w1SeKykp2MpkSAUB1swvk0Q&s' },
    { name: 'Jacket', category: 'Clothing', brand: 'Zara', price: '$50', image: 'https://cdni.llbean.net/is/image/wim/520163_699_82?hei=1095&wid=950&resMode=sharp2&defaultImage=llbprod/520163_699_41' },
  ];

  const [sortColumn, setSortColumn] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (column) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const sortedLayouts = [...Layouts].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  });

  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row'>
        <div className='d-flex flex-column col-sm-7'>
          <h3 >Layout List</h3>
          <h5 style={{ fontWeight: 400  }}>Layout List</h5>
        </div>
        <div className='col-sm-5' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <i className="fa fa-print text-primary fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Button clicked!')} ></i>
          <i className="fa-solid fa-file-pdf text-danger fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer " onClick={() => alert('Button clicked!')} ></i>
          <i className="fa fa-file-excel-o fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Button clicked!')} style={{ color: 'green' }}></i>
          <Buton onClick={() => alert('Button clicked!')}>Add new Layout</Buton>
          <Buton onClick={() => alert('Button clicked!')}>Import Layout</Buton>
        </div>
      </div>

      <div className="p-4 mt-4" style={{ backgroundColor: 'white', borderRadius: 5, border: '1px solid #d9d9d9' }}>
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="text"
            placeholder="Search..."
            className="form-control"
            style={{ maxWidth: '300px' }}
          />
          <button
            className="btn"
            style={{ backgroundColor: '#ff9f43', color: 'white', padding: '8px 10px', borderRadius: '8px', border: 'none', display: 'flex', alignItems: 'center', }}
          >
            <FaFilter size={16} />
          </button>
        </div>
        <hr />

        <div className="table-responsive">
          <table className="table table-hover">
          <thead className="thead-dark">
              <tr>
                <th scope="col" style={{ fontSize: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  Category
                  <button onClick={() => handleSort('name')} className="btn p-0">
                    {sortOrder === 'asc' && sortColumn === 'name' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                  </button>
                  </div>
                </th>
                <th scope="col"  style={{ fontSize: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Category 
                <button onClick={() => handleSort(' category')} className="btn p-0">
                    {sortOrder === 'asc' && sortColumn === ' category' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                  </button>
                  </div>
                </th>
                <th scope="col" style={{ fontSize: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Brand
                <button onClick={() => handleSort(' brand')} className="btn p-0">
                    {sortOrder === 'asc' && sortColumn === ' brand' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                  </button>
                  </div>
                </th>
                
                <th scope="col"  style={{ fontSize: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        Price
        <button onClick={() => handleSort('price')} className="btn p-0">
            {sortOrder === 'asc' && sortColumn === 'price' ? (
                <FaArrowUp color="green" />
            ) : (
                <FaArrowDown color="red" />
            )}
        </button>
    </div>
                </th>
                <th scope="col" style={{ fontSize: 16 }} className='text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedLayouts.map((Layout, index) => (
                <tr key={index}>
                  <td style={{ fontSize: 16 }}>
                    <div className="d-flex align-items-center">
                      <img src={Layout.image} alt={Layout.name} style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                      {Layout.name}
                    </div>
                  </td>
                  <td style={{ fontSize: 16 }}>{Layout.category}</td>
                  <td style={{ fontSize: 16 }}>{Layout.brand}</td>
                  <td style={{ fontSize: 16 }}>{Layout.price}</td>
                  <td style={{ fontSize: 16, textAlign: 'center' }}>
                    <div className="d-flex gap-2 justify-content-center">
                      <button
                        className="btn"
                        onClick={() => createRef.current.click()}
                        style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}
                      >
                        <FaEye size={16} title="View" color='#36c6d9'/>
                      </button>
                      <button
                        className="btn"
                        onClick={() => alert('Edit clicked')}
                        style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}
                      >
                        <FaEdit size={16} title="Edit" color='#ff9f43' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <ViewModal open={createRef} close={refClose}/> */}
    </div>
  );
}

export default Layout;
