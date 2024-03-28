import React, { useState } from 'react';
import { useTable, useGlobalFilter } from 'react-table';

const Customer1 = ({ columns, data,  onAddUser }) => {
  const [showForm, setShowForm] = useState(false);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter);
  const { globalFilter } = state;

  return (
    <div>
    <div>
      <input
        type="text"
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              
              </tr>
            );
          })}
          
        </tbody>
      </table>
    </div>
    <div>
        <button onClick={() => setShowForm(true)}>Add User</button>
        {showForm && (
          <div>
            <h2>Add User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newUser = {
                  id: parseInt(formData.get('id')),
                  name: formData.get('name'),
                  age: parseInt(formData.get('age')),
                };
                onAddUser(newUser);
                setShowForm(false);
              }}
            >
              <label>
                ID:
                <input type="number" name="id" required />
              </label>
              <label>
                Name:
                <input type="text" name="name" required />
              </label>
              <label>
                Age:
                <input type="number" name="age" required />
              </label>
              <button type="submit">Add User</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        )}
      </div>
      
    </div>
  )
}

export default Customer1
