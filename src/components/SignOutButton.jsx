

import React from "react";
import { useMsal } from "@azure/msal-react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
/**
 * Renders a sign out button 
 */
export const SignOutButton = () => {
  // const { instance,accounts } = useMsal();
  // const handleLogout = (logoutType) => {
  //   if (logoutType === "popup") {
  //     instance.logoutPopup({
  //       postLogoutRedirectUri: "/",
  //       mainWindowRedirectUri: "/",
  //     });
  //   } else if (logoutType === "redirect") {
  //     instance.logoutRedirect({
  //       postLogoutRedirectUri: "/",
  //       account:accounts[0].name
  //     });
  //   }
  // };
  // return (
  //   <>
     {/* <DropdownButton
     variant="secondary"
     className="ml-auto"
    drop="start"
  title="Sign Out"
    onClick={() => handleLogout("redirect")}> */}
    {/* //   <Dropdown.Item as="button" onClick={() => handleLogout("popup")}>
    //     Sign out using Popup
    //   </Dropdown.Item>
    //   <Dropdown.Item as="button" onClick={() => handleLogout("redirect")}>
    //     Sign out using Redirect
    //   </Dropdown.Item>
    </DropdownButton> */}
  //     </DropdownButton> 
  //   </>
  // );
};
