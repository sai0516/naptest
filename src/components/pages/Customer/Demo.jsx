// import React, { useState } from "react";
// import { useTable, useFilters } from "react-table";
// import userData from "./userData.json";

// const Demo = () => {
//   const [data, setData] = useState(userData);
//   const [showForm, setShowForm] = useState(false);
//   const columns = React.useMemo(
//     () => [
//       { Header: "ID", accessor: "id" },
//       { Header: "Name", accessor: "name" },
//       { Header: "Email", accessor: "email" },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     setFilter,
//   } = useTable(
//     {
//       columns,
//       data,
//     },
//     useFilters
//   );

//   const handleSearch = (e) => {
//     const value = e.target.value || "";
//     setFilter("name", value);
//   };
//   const [newUserData, setNewUserData] = useState({ name: "", email: "" });
//   const handleAddUser = () => {
//     // Assuming your new user object has an id, name, and email
//     const newUser = {
//       id: data.length + 1,
//       name: newUserData.name,
//       email: newUserData.email,
//     };

//     setData([...data, newUser]);
//     setNewUserData({ name: "", age: "" });
//   };

//   const handleDeleteUser = (userId) => {
//     setData(data.filter((user) => user.id !== userId));
//   };
//   return (
//     <div>
//       <div>
//         <label>Search: </label>
//         <input type="text" onChange={handleSearch} placeholder="search by name" />
//       </div>
//       <table {...getTableProps()} style={{ width: "100%" }}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => (
//                   <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                 ))}
//                 <button onClick={() => handleDeleteUser(row.original.id)}>
//                   Delete
//                 </button>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       <div>
//         <h2>Add User</h2>
//         <button onClick={() => setShowForm(true)}>Add User</button>
//         {showForm && (
//           <div>
//             <h2>Add User</h2>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleAddUser();
//                 setShowForm(false);
//               }}
//             >
              
//               <label>
//                 Name:
//                 <input
//                   type="text"
//                   name="name"
//                   value={newUserData.name}
//                   onChange={(e) =>
//                     setNewUserData({ ...newUserData, name: e.target.value })
//                   }
//                   required
//                 />
//               </label>
//               <label>
//                 Email:
//                 <input
//                   type="email"
//                   value={newUserData.email}
//                   onChange={(e) =>
//                     setNewUserData({ ...newUserData, email: e.target.value })
//                   }
//                   required
//                 />
//               </label>
//               <button type="submit">Add User</button>
//               <button onClick={() => setShowForm(false)}>Cancel</button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Demo;
