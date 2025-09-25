import React from 'react'

function ManageStocks() {
  return (
    <div style={{marginTop:10}}>
   
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
      <div style={{ backgroundColor: '#ffff', padding: '20px',borderRadius: '8px',border: '1px solid #ccc' }}>Product 1</div>
      <div style={{ backgroundColor: '#ffff', padding: '20px',borderRadius: '8px',border: '1px solid #ccc' }}>Product 2</div>
      <div style={{ backgroundColor: '#ffff', padding: '20px',borderRadius: '8px',border: '1px solid #ccc' }}>Product 3</div>
      <div style={{ backgroundColor: '#ffff', padding: '20px',borderRadius: '8px',border: '1px solid #ccc' }}>Product 4</div>
      <div style={{ backgroundColor: '#ffff', padding: '20px',borderRadius: '8px',border: '1px solid #ccc' }}>Product 1</div>
      <div style={{ backgroundColor: '#ffff', padding: '20px',borderRadius: '8px',border: '1px solid #ccc' }}>Product 2</div>
      <div style={{ backgroundColor: '#ffff', padding: '20px',borderRadius: '8px',border: '1px solid #ccc' }}>Product 3</div>
      <div style={{ backgroundColor: '#ffff', padding: '20px',borderRadius: '8px',border: '1px solid #ccc' }}>Product 4</div>
    </div>

    </div>
  )
}
 
export default ManageStocks
