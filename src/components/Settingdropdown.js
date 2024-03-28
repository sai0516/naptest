import React from 'react'
// import image from './images/user.svg'
// import { Link } from 'react-router-dom'
import logoutimage from './images/logout.svg'
// import settingsvg from './images/settings.svg'
import { useMsal } from "@azure/msal-react";
// import { SignOutButton } from './SignOutButton';
import { Link } from 'react-router-dom';
export const Settingdropdown = () => {
const { instance,accounts } = useMsal();
const handleLogout = (logoutType) => {
 if (logoutType === "redirect") {
        instance.logoutRedirect({
        postLogoutRedirectUri: "",
        // mainWindowRedirectUri: "/",
        account:accounts[0].name,
        
           });
    }
  };
  return (
    <>
    <div className='flex flex-col Pro-dropdown' >
        <ul className='flex flex-col gap-4px bullet' >
           {/* <li>
               <img src={image} alt='' className='dropdownimg' /><Link to='profile' >Profile</Link>
            </li>
            <br />
            <li>
            <img src={settingsvg} alt='' className='dropdownset' /> <Link to='setting'>Settings</Link>
            </li>
            <br /> */}
            <li  className='loglist'>
                <img src={logoutimage} alt='' className='dropdownlogout' style={{ filter: 'invert(100%)' }}/>
                <Link  onClick={() => handleLogout("redirect")} style={{color: "white"}}>Logout</Link>
                
            </li>
        </ul>
    </div>
    </>
 
  )
}
