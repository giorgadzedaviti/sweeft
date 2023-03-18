// import React from "react";

// export default function Handler({ userData, friendsData }) {
//   return (
//     <div>
//       <div className="container">
//         <img src={userData.imageUrl} alt={userData.name} />

//         <div className="info">
//           <div className="user">
//             <p className="info1">info</p>
//             <h3 className="nm">
//               ${userData.prefix} ${userData.name} ${userData.lastName}
//             </h3>
//             <p className="title">${userData.title}</p>
//             <p>Email: ${userData.email}</p>
//             <p>Ip Address: ${userData.ip}</p>
//             <p>Job Area: ${userData.jobArea}</p>
//             <p>Job Type: ${userData.jobType}</p>
//             <p>Job Description: ${userData.jobDescriptor}</p>
//           </div>
//           <div className="address">
//             <p className="address1">address</p>
//             <h3 className="company">${userData.company.name}</h3>
//             <p>City: ${userData.address.city}</p>
//             <p>Country: ${userData.address.country}</p>
//             <p>State: ${userData.address.state}</p>
//             <p>Street Address: ${userData.address.streetAddress}</p>
//             <p>ZIP: ${userData.address.zipCode}</p>
//           </div>
//         </div>
//         <p>Friends:</p>
//         <div className="friends">
//           <ul className="" friends1>
//             <div className="friends">
//               {friendsData.list
//                 .map((friend) => {
//                   return (
//                     <div className="friend-container">
//                       <img src={friend.imageUrl} alt={friend.name} />
//                       <h4>
//                         ${friend.prefix} {friend.name} {friend.lastName}
//                       </h4>
//                       <p>${friend.title}</p>
//                     </div>
//                   );
//                 })
//                 .join("")}
//             </div>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
