import React, { useState,useEffect } from 'react'

import { useTable, useFilters } from 'react-table';

const FinalCust = () => {
    // Sample JSON data
  const data = [
    { id: 1, name: 'John Doe', age: 25, email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', age: 30, email: 'jane@example.com' },
    // Add more data as needed
  ];

  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Age', accessor: 'age' },
    { Header: 'Email', accessor: 'email' },
  ];
   // State for table data and search query
   const [tableData, setTableData] = useState(data);
   const [searchQuery, setSearchQuery] = useState('');
 
   // React-table hooks
   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setFilter } = useTable(
     {
       columns,
       data: tableData,
     },
     useFilters
   );
 
   // Function to add a user to the table
   const addUser = () => {
     const newUser = {
       id: tableData.length + 1,
       name: 'New User',
       age: 0,
       email: 'newuser@example.com',
     };
 
     setTableData([...tableData, newUser]);
   };
 
   // Function to handle search
   const handleSearch = (e) => {
     const value = e.target.value || '';
     setSearchQuery(value);
     setFilter('name', value);
   };

   useEffect(() => {
    setFilter('name', searchQuery);
  }, [searchQuery, setFilter]);
    
  return (
    <div>
     <div>
      <div>
        <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search by name" />
      </div>
      <table {...getTableProps()} style={{ border: '1px solid black', width: '100%' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{ borderBottom: 'solid 3px red', background: 'aliceblue' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} style={{ padding: '10px', border: 'solid 1px gray' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={addUser}>Add User</button>
    </div>
      
    </div>
  )
}

export default FinalCust
