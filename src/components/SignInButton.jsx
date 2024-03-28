import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config.js";
// import { msalConfig } from "../config.js";
// import { UserAgentApplication } from 'msal';
import DropdownButton from "react-bootstrap/DropdownButton";
// import Dropdown from "react-bootstrap/Dropdown";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 * Note the [useMsal] package 
 */

// const msalApp = new UserAgentApplication(msalConfig);
export const SignInButton = () => {
  const { instance,accounts} = useMsal();
  const handleLogin = (loginType) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(accounts[0].name);
      }); 
    }
  };


  return (
    <div className="SignIn"><div style={{fontWeight:'800',fontSize:'18px'}}>Please click on Sign In to continue with application...</div>
    <DropdownButton
      variant="secondary"
      className="ml-auto"
      drop="start"
      title="Sign In"
      onClick={() => handleLogin("redirect")}
    >
    </DropdownButton>
    </div>
  );
};