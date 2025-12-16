import React, { useEffect, useState } from "react";
import { Link,useNavigate  } from "react-router-dom";
import "bootstrap-daterangepicker/daterangepicker.css";
import "font-awesome/css/font-awesome.min.css"; // Import Font Awesome CSS
import ApiCall from "../../Apicall/ApiCall";
import InfoCard from "./boxes/InfoCard";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Box, Paper, Typography, Grid, Container } from "@mui/material";
function DashboardV3() {
  const targetValues = [307144, 151123, 894121, 452338];
  const [counts, setCounts] = useState(targetValues.map(() => 0)); // Initialize each count at 0
const navigate = useNavigate();

  useEffect(() => {
    const intervals = targetValues.map((target, index) => {
      const incrementSpeed = Math.max(10, target / 100); // Adjust speed based on target value

      return setInterval(() => {
        setCounts((prevCounts) => {
          const nextCount = prevCounts[index] + incrementSpeed;
          if (nextCount >= target) {
            clearInterval(intervals[index]);
            return prevCounts.map((count, i) => (i === index ? target : count));
          }
          return prevCounts.map((count, i) => (i === index ? nextCount : count));
        });
      }, 10);
    });
 
    return () => intervals.forEach(clearInterval); 
  }, [targetValues]);
    
  const products = [
    { name: 'RunMen', category: 'Shoes', brand: 'Nike', price: '$500', image: 'https://speedsports.pk/cdn/shop/products/aurora_fd2291-403_phslh000-2000.jpg?v=1710212570' },
    { name: 'Sofa', category: 'Furniture', brand: 'Ikea', price: '$300', image: 'https://poshish.pk/cdn/shop/files/w-POS00447-1_1800x1800.webp?v=1722932843' },
    { name: 'T-Shirt', category: 'Clothing', brand: 'Zara', price: '$50', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhoMkC2n3HiIU4zIxda5HE4aTCenO43y7myA&s' },
    { name: 'Apple', category: 'Groceries', brand: 'Whole Foods', price: '$20', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTqBOfkJOBqR4ISvqOQBR8zG1NBlJfSKIWuw&s' },
    { name: 'Dining Table', category: 'Furniture', brand: 'Ikea', price: '$300', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_XNEyjBf18m0w1SeKykp2MpkSAUB1swvk0Q&s' },
    { name: 'Jacket', category: 'Clothing', brand: 'Zara', price: '$50', image: 'https://cdni.llbean.net/is/image/wim/520163_699_82?hei=1095&wid=950&resMode=sharp2&defaultImage=llbprod/520163_699_41' },
   
  ];

 

  return (
    <Container  maxWidth="xl">
    <div className="row mt-3">
      {targetValues.map((target, index) => (
        <div className="col-xl-3" key={index}>
          <div
            className="card border-1 mb-3 overflow-hidden text-black"
            style={{
              paddingLeft: 10,
              paddingTop: 5,
              paddingBottom: 5,
              borderRadius: 10,
            }}
          >
            <div className="d-flex">
              <div
                style={{
                  backgroundColor: index === 0 ? "#17a2b8" : index === 1 ? "#092c4c" : index === 2 ? "#ff6347" : "#ff9f43",
                  padding: 30,
                  borderRadius: 10,
                }}
              >
                <i
                  className={index === 0 ? "fa fa-user-tie fa-3x text-white" : index === 1 ? "fa fa-building fa-3x text-white" : "fa fa-id-badge fa-3x text-white"}
                  aria-hidden="true"
                ></i>
              </div>

              <div className="d-flex flex-column justify-content-center ms-3">
                <h4>${Math.round(counts[index]).toLocaleString()}</h4> {/* Format number with commas */}
                <h5 style={{ color: "grey" }}>Total Purchase Due</h5>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

{/* -----------------------------------------Info Card---------------------------------------- */}
      <div className="row mt-3">
      <div className="col-xl-3">
        <InfoCard
          backgroundColor="#ff9f43"
          amount="$452,338"
          label="Customer"
          iconClass="fa fa-user-o"  
        />
      </div>
      <div className="col-xl-3">
        <InfoCard
          backgroundColor="#28a745"
          amount="$125,000"
          label="Suppliers"
          iconClass="fa fa-shopping-cart" // Another icon passed as a prop
        />
      </div>
      <div className="col-xl-3">
        <InfoCard
          backgroundColor="#092c4c"
          amount="$45,221"
          label="Purchase Invoice"
          iconClass="fa fa-file-o" // Another icon passed as a prop
        />
      </div>
      <div className="col-xl-3">
        <InfoCard
          backgroundColor="#17a2b8"
          amount="$565,040"
          label="Sales Invoice"
          iconClass="fa fa-book" // Another icon passed as a prop
        />
      </div>
    </div>

    <div className="p-4 mt-4" style={{backgroundColor:'white',borderRadius:5,border:'1px solid #d9d9d9'}} >
<><h4 style={{paddingTop:4,paddingBottom:4}}>Expired Products</h4>
<hr/></>

<div className="table-responsive p-1">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col" style={{ fontSize: 16 }}>Product</th>
                <th scope="col" style={{ fontSize: 16 }}>Category</th>
                <th scope="col" style={{ fontSize: 16 }}>Brand</th>
                <th scope="col" style={{ fontSize: 16 }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td style={{ fontSize: 16 }}>
                    <div className="d-flex align-items-center">
                      <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                      {product.name}
                    </div>
                  </td>
                  <td style={{ fontSize: 16 }}>{product.category}</td>
                  <td style={{ fontSize: 16 }}>{product.brand}</td>
                  <td style={{ fontSize: 16 }}>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </Container>
  );
}

export default DashboardV3;
