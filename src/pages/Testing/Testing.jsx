 
import React, { useState } from "react";
 
import { Container, Button, TextField, Typography } from "@mui/material";

function Testing1() {
  

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h3" textAlign={"center"} > mai jini waree taire tasverr waikhe hoaee one waree yara ranjhay nay na heer waikhee hoeee
        
         </Typography>
       
    </Container>
  );
}

export default Testing1;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Typography } from "@mui/material";
// import { getToken } from "../Compo/utilis/getToken";

// function Testing1() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const token = getToken();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           "http://klargo.jinnahtechnologies.com/api/services/app/User/GetAll",
//           {
//             headers: {
//               Authorization: token ? `Bearer ${token}` : "",
//             },
//           }
//         );

//         // ABP response structure
//         setUsers(response?.data?.result?.items || []);
//       } catch (err) {
//         console.error(err);
//         setError("API call failed");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [token]);

//   return (
//     <Container sx={{ mt: 3 }}>
//       <Typography variant="h3" textAlign="center" mb={3}>
//         mai jini waree taire tasverr waikhe hoaee one waree yara ranjhay nay na heer waikhee hoeee
//       </Typography>

//       {loading && (
//         <Typography textAlign="center">Loading...</Typography>
//       )}

//       {error && (
//         <Typography textAlign="center" color="error">
//           {error}
//         </Typography>
//       )}

//       {users.map((user) => (
//         <Typography key={user.id} sx={{ mb: 1 }}>
//           {user.name || user.userName}
//         </Typography>
//       ))}
//     </Container>
//   );
// }

// export default Testing1;
