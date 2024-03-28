import React, { useState }  from 'react'




const Notification1 = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [updateCount, setUpdateCount] = useState(0);

  const handleUpdate = () => {
    const currentDate = new Date().toLocaleString();
    const updatedDetails = [...userDetails, { date: currentDate, count: updateCount + 1 }];
    setUserDetails(updatedDetails);
    setUpdateCount(updateCount + 1);
  };



  return (
    <div>
            <h1>User Details Update</h1>
      <button onClick={handleUpdate}>Update Details</button>
      <div>
        <h2>Notification Bar</h2>
        <ul>
          {userDetails.map((update, index) => (
            <li key={index}>{`${update.date}: Updated ${update.count} times`}</li>
          ))}
        </ul>
      </div>

    
    </div>
  )
}

export default Notification1
