import * as React from "react";
import { useState, useEffect } from "react";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import Image from "./images/avatar.png";
import SearchIcon from "@mui/icons-material/Search";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Person2, Fingerprint } from "@mui/icons-material";
import { Settingdropdown } from "./Settingdropdown";
import Dropdown from "./Dropdowns/Dropdown";
import Notifications from "./pages/Notifications";
import axios from "axios";
import { getAccessToken } from "../App";
import { API_BASE_URL, API_ENDPOINTS } from "../config";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { Spinner, ITheme, createTheme, ThemeProvider } from "@fluentui/react";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";

export const Home = (props) => {
  const [openpro, setopenpro] = useState(false);
  const [selected, setselected] = useState("");
  const [userList, setUserList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const filteredUsers = userList.filter((user) =>
    user.customername.toLowerCase().includes(searchValue.toLowerCase())
  );

  const myTheme = createTheme({
    palette: {
      themePrimary: 'orange'
    }
  });

  const [userData, setUserData] = useState([]);
  const fetchData2 = async () => {
    try {
      const accessToken = await getAccessToken(); // Replace with your actual Bearer token
      const response = await fetch(
        "https://ntapadminapidev.azurewebsites.net/CustomerAdminNTAP/GetCustomercount",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      setUserData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const accessToken = await getAccessToken(); // Replace with your actual Bearer token
        const response = await fetch(
          "https://ntapadminapidev.azurewebsites.net/CustomerAdminNTAP/GetCustomercount",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
       
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setUserData(result);
        fetchData2();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData1();
  }, []);

  const ActiveINactive = styled(Switch)(({ theme }) => ({
    padding: 10,
  
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&:before, &:after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: "16px",
        height: "16px",
        
      },
      "&:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&:after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 14,
      height: 14,
      margin: 3,
    },
  }));

  const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    "& .MuiFormControlLabel-label": {
      fontFamily: "'Quicksand', sans-serif", 
      fontSize: "11px", 
      fontWeight: "",
    },
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken(); // Replace with your actual Bearer token
        const response = await fetch(
          "https://ntapadminapidev.azurewebsites.net/CustomerAdminNTAP/GetCustomerList",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const users = data.map((user) => ({
          id: user.id,
          customername: user.customername,
          no_of_licences: user.no_of_licences,
          status: user.status,
        }));
        setTimeout(() => {
          setIsLoading(false); 
        }, 2000);

        setUserList(users);
        console.log(users);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const closePopup = () => {
    setShowPopup(false);
  };

  const [isActive, setIsActive] = useState(false);

  const handleSwitchToggle = (user, ind) => {
    const update = userList.map((obj, index) => {
      if (index === ind) {
        return {
          ...obj,
          status: obj.status === "Active" ? "Inactive" : "Active",
        };
      } else {
        return obj;
      }
    });
    setUserList(update);
    setIsActive(!isActive);
  };
  const [notificationCount, setNotificationCount] = useState(0);
  const handleBellIconClick = () => {
    setNotificationCount(0);
    togglePopup();
  };

  return (
    <>
      <section id="content">
        {/* <!-- NAVBAR --> */}
        <nav>
          <div className="navBrand" style={{fontSize:"16px"}}>
            {props.toggle ? (
              <span className="bx bx-menu">
                <MenuSharpIcon sx={{ fontSize: 30 }} onClick={props.onClick} />
              </span>
            ) : null}
            <h6 style={{ marginLeft: "6px"}}>Analytics</h6>
          </div>
          <div className="navcontent">
            <div className="searchbar" style={{ marginLeft: "60px" }}>
              <SearchIcon className="SearchIcon" style={{ color: "gray" ,    marginLeft: "10px" }} />
              <input
                className="searchInput"
                placeholder="Search by name"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <div className="settingicons"  >
              <div style={{marginLeft:"-38px"}}>
              <SettingsOutlinedIcon
                sx={{ fontSize: 28 }}
                onClick={() => setopenpro((prev) => !prev)}
                
              />
              </div>
              {openpro && <Settingdropdown />}
            </div>
          </div>
        </nav>
        {/* <!-- NAVBAR --> */}

        {/* MAIN */}
        <main>
          {userData ? (
            <ul className="box-info" style={{ marginTop: "15px" }}>
              <li>
                <i
                  className="bx bxs-calendar-check"
                  style={{
                    backgroundColor: "orange",
                    color: "white",
                  }}
                >
                  <GroupIcon sx={{ fontSize: 40 }} className="box-Icon" />
                </i>
                <span className="text">
                  <h3>{userData.totalCount}</h3>
                  <p>Total Customers</p>
                </span>
              </li>
              <li>
                <i
                  className="bx bxs-/group"
                  style={{
                    backgroundColor: "orange",
                    color: "white",
                  }}
                >
                  <PersonIcon sx={{ fontSize: 40 }} className="box-Icon" />
                </i>
                <span className="text">
                  <h3>{userData.activeCount}</h3>
                  <p>Active Customers</p>
                </span>
              </li>
              <li>
                <i
                  className="bx bxs-dollar-circle"
                  style={{
                    backgroundColor: "orange",
                    color: "white",
                  }}
                >
                  <PersonOffIcon sx={{ fontSize: 40 }} className="box-Icon" />
                </i>
                <span className="text">
                  <h3>{userData.inactiveCount}</h3>
                  <p>Inactive Customers</p>
                </span>
              </li>
            </ul>
          ) : (
            <p>loading Data.....</p>
          )}
          <div style={{ marginLeft: "-1000px", marginTop: "25px",marginBottom:"10px" }}>
            <h6 style={{marginLeft: "-22px"}}>Recent Customers</h6>
          </div>
          <div
            className="table-data"
            style={{
              marginTop: "0px",
              border: "solid gray 0px",
              marginBottom: "25px",
            }}
          >
            <div className="order">
              <table>
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>No of License</th>
                    {/* <th>Organization</th> */}
                    <th>Status</th>
                  </tr>
                </thead>
                {isLoading ? (
                  <ThemeProvider theme={myTheme}>
                  <Spinner
                  label="Loading..."
                  styles={{
                    root: {
                      marginLeft: "300px",
                      marginTop: "10px",
                     
                    },
                    label: {
                      color: "orange"
                    }
                  }}
                />
                </ThemeProvider>
                ) : (
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr key={index}>
                        <td style={{marginTop: "-1px"}}>
                          {" "}
                          <img src={Image} alt="" className="userimage" />
                          {user.customername}
                        </td>
                        <td>{user.no_of_licences}</td>
                        <td>
                          <FormGroup>
                            <StyledFormControlLabel                    
                              className="label labels"
                              control={
                                <ActiveINactive
                                // id="labels"
                                 checked={
                                    user.status === "Active" ? true : false
                                  }
                                  // onChange={() =>
                                  //   handleSwitchToggle(user, index)
                                  // }
                                />
                              }
                              label={
                                user.status === "Active" ? "Active" : "Inactive"
                              }
                              // disabled
                            />                                                                       
                          </FormGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
