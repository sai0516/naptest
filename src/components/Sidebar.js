import React from "react";
import SidebarItem from "./Dropdowns/Sidebaritem";
import items from "./sidebarData/sidebar.json";
import UserProfile from "./images/avatar.png";
// import MenuSharpIcon from "@mui/icons-material/MenuSharp";
// import HomeIcon from "@mui/icons-material/Home";
// import { Person } from "@mui/icons-material";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config";
import { callMsGraph } from "../graph";
import NTAPLogoTrans from "./images/NTAPLogoTrans.png";

export const Sidebar = (props) => {
  const [graphData, setGraphData] = useState(null);
  const { instance, accounts } = useMsal();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  function RequestProfileData() {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      });
  }
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <section
        id="sidebar"
        style={{ backgroundColor: "white" }}
        className={isSidebarOpen ? "open" : "closed"}
      >
        <div>
          <h4 className="brand">
            <img
              src={NTAPLogoTrans}
              style={{
                height: "50px",
                width: "50px",
                marginLeft: "90px",
                marginTop: "25px",
              }}
            />
            <b style={{ color: "black", marginLeft: "50px" }}>NTAP</b>
          </h4>
        </div>
        <h5
          className="card-title"
          style={{ color: "black", marginTop: "-20px", fontSize: "16px" }}
        >
          Admin Portal
        </h5>
        <div className="FingerUser-details">
          <div style={{ marginTop: "50px" }}>
            <img src={UserProfile} alt="" className="Userprofile" />
            <div>
            <h5 className="card-title" style={{ color: "black",fontSize:"16px",fontWeight:"bold" }}>
                Welcome {accounts[0].name}<br />
                <p className="UserId-card"  style={{fontSize: "10px", color: "gray"}}>{accounts[0].username}</p>
              </h5>
            </div>
            <div>
            </div>
          </div>
        </div>
      
                 <div className="option-menu" style={{marginLeft: "82px", paddingTop: "28px", fontWeight: "800"}}>
        {items.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
        </div>
      </section>
     
    </>
  );
};