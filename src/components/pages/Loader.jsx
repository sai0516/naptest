import React, { useEffect } from 'react'
import { Spinner } from 'office-ui-fabric-react/lib/Spinner'; 


const Loader = () => {
    useEffect(() => {
        const spinnerElements = document.querySelectorAll(".ms-Spinner");
    
        for (let i = 0; i < spinnerElements.length; i++) {
          new Spinner(spinnerElements[i]);
        }
      }, []); // Empty dependency array ensures that the effect runs only once, similar to componentDidMount
    
  return (
    <div>
        <div className="ms-Spinner ms-Spinner--large">
      <div className="ms-Spinner-label">
        Loading...
      </div>
    </div>
    </div>
  )
}

export default Loader
