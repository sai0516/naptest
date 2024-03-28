import React, { useState, useEffect } from "react";
import { BsPencil, BsTrash, BsEye, BsFingerprint } from "react-icons/bs";
import Box from "@mui/material/Box";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Settingdropdown } from "../Settingdropdown";
import SearchIcon from "@mui/icons-material/Search";
import { Sidenav } from "../SidebarItem/Sidenav";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Notifications from "./Notifications";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAccessToken } from "../../App";
import { API_BASE_URL, API_ENDPOINTS } from "../../config";
import { Form, Modal, Input, Alert, Flex, Spin } from "antd";
export const ShowUsers = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLayout, setFormLayout] = useState("horizontal");
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 8,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 14,
            offset: 10,
          },
        }
      : null;

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [openpro, setopenpro] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openNotificationDialog, setOpenNotificationDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [showDataExistsPopup, setShowDataExistsPopup] = useState(false);
  const [AddUserNotification, setAddUserNotification] = useState("");
  const [loading, setLoading] = useState(true);
  const [AddUser, setAddUser] = useState({
    username: "",
    Email: "",
    Orgid: "",
    Orgname: "",
    Department: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        const response = await axios.get(
          API_BASE_URL + API_ENDPOINTS.GET_USERS,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleShow = () => {
    setIsOpen(true);
  };
  const doesUserExist = (user) => {
    return users.some(
      (existingUser) =>
        existingUser.username === user.username ||
        existingUser.Email === user.Email ||
        existingUser.Orgid === user.Orgid
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userExists = doesUserExist(AddUser);
    if (userExists) {
      setShowDataExistsPopup(true);
    } else {
      handleCancel(false);

      axios
        .post(API_BASE_URL + API_ENDPOINTS.ADD_ADUSER, AddUser)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setAddUserNotification("User added successfully.");
            setShowNotification(true);
          }
        });
    }
  };
  const closeDataExistsPopup = () => {
    setShowDataExistsPopup(false);
  };
  const handleEditClick = (user1) => {
    setSelectedUser(user1);
    setEditedUser({ ...user1 });
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (id) => {
    axios
      .delete(`https://ntapwebapi.azurewebsites.net/home/DeleteADUser/${id}`)
      .then((response) => {
        console.log("Response:", response);
        if (response.status === 200) {
          // If the delete request was successful, update the UI by removing the user
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
          console.log("User deleted successfully");
        } else {
          // Handle the case where the delete request failed (e.g., show an error message)
          console.error("Failed to delete user");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };
  const handleCloseNotificationDialog = () => {
    setOpenNotificationDialog(false);
  };

  const handleSaveEdit = async () => {
    console.log(editedUser);
    try {
      const accessToken = await getAccessToken();
      const response = await axios.post(
        API_BASE_URL + API_ENDPOINTS.UPDATE_ADUSER,
        editedUser,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editedUser.id ? editedUser : user
          )
        );
        setOpenEditDialog(false);
        showNotificationMessage("Changes saved successfully.");
        console.log("User data updated successfully", response.data);
      } else {
        console.error("Error updating user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
    try {
      const accessToken = await getAccessToken();
      const response = await axios.post(
        API_BASE_URL + API_ENDPOINTS.EDIT_USER,
        editedUser,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        // Update the local state with the edited user data
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editedUser.id ? editedUser : user
          )
        );

        // Close the edit dialog
        setOpenEditDialog(false);
        showNotificationMessage(
          "User Details Edited successfully.",
          getCurrentTime()
        );
        setShowNotification(true);
        console.log(`User data updated successfully`, response.data);
      } else {
        console.error("Error updating user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  function formatTimestamp(timestamp) {
    console.log(timestamp);
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const timeDifferenceInSeconds = Math.floor((now - notificationTime) / 1000);
    console.log(timeDifferenceInSeconds);
    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} seconds ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
      // Calculate days, assuming 24 hours in a day
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }
  }
  const showNotificationMessage = (message) => {
    // const timestamp = 1633873200000;
    const timestamp = Date.now();
    const formattedTimestamp = formatTimestamp(timestamp);
    const newNotification = {
      message,
      timestamp: formattedTimestamp,
    };
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);
    setNotificationMessage({ message, timestamp });
    setShowNotification(true);
    setNotificationCount((prevCount) => prevCount + 1);
  };
  const getCurrentTime = () => {
    const now = new Date();
    console.log(now);
    const hours = now.getHours().toString().padStart(2, "0");
    console.log(hours);
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  }; 

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
      
        // Parse the CSV data from the uploaded file
        const csvData = e.target.result;
        // Split the CSV data into lines
        const lines = csvData.match(/[^\r\n]+/g);
        // Assuming the first line contains headers, split it into an array
        const headers = lines[0].split(",");
        // Initialize an array to store the extracted data
        const records = [];
        // Loop through the lines starting from the second line (index 1)
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].split(",");
          const record = {};
          // Loop through the headers and populate the record object
          for (let j = 0; j < headers.length; j++) {
            record[headers[j]] = line[j];
          }
          // Add the record object to the records array
          records.push(record);
        }

        // Loop through each record and send a POST request
        records.forEach((record, index) => {
          const requestData = {
            username: record.username,
            Email: record.Email,
            Orgid: record.Orgid,
            Orgname: record.Orgname,
            Department: record.Department,
          };

          axios
            .post(API_BASE_URL + API_ENDPOINTS.ADD_ADUSER, requestData, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              console.log("Response for record:", response);
              console.log(response);
              if (response.status === 400 && response.data.errors) {
                // Handle validation errors here if needed
                console.log("Validation Errors:", response.data.errors);
              }
            })
            .catch((error) => {
              console.error("Axios POST request error:", error);
              if (error.response) {
                console.log("Response Data:", error.response.data);
              }
            });
        });
      };

      reader.readAsText(file);
    }
  };

  function closeNotification(button) {
    // Find the closest .notification-item element and hide it
    var notificationItem = button.closest(".notification-item");
    if (notificationItem) {
      notificationItem.style.display = "none";
    }
  }
  const handleBellIconClick = () => {
    // Reset the notification count to zero when the bell icon is clicked
    setNotificationCount(0);

    // Toggle the popup or perform other actions as needed
    togglePopup();
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  // Function to handle username click
  // Filter users based on the search query
  useEffect(() => {
    if (!searchQuery) {
      // If the search query is empty, show all users
      setFilteredUsers(users);
    } else {
      // Otherwise, filter users based on criteria (e.g., username, orgname, orgid, email, department, status)
      const filtered = users.filter((user) => {
        const { username, email } = user;
        const query = searchQuery.toLowerCase();
        return (
          username.toLowerCase().includes(query) ||
          email.toLowerCase().includes(query)
        );
      });
      setFilteredUsers(filtered);
      
    }
  }, [searchQuery, users]);
  const handleScanButtonClick = (user) => {
    // Extract the necessary user data
    const { id, username } = user;
    sessionStorage.setItem("userId", id);
    sessionStorage.setItem("username", username);
    // Make an API call to fetch additional data
    axios
      .get(API_BASE_URL + API_ENDPOINTS.GET_ROLE)
      .then((response) => {
        const additionalData = response.data;
        console.log(additionalData);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  };
  const handleScanButtonClick1 = (user) => {
    axios
      .get(API_BASE_URL + API_ENDPOINTS.GET_ROLE)
      .then((response) => {
        const additionalData = response.data;
        const { id, username } = user;
        console.log(user);
        sessionStorage.setItem("userId", id);
        sessionStorage.setItem("username", username);
        console.log(additionalData);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* <Sidenav /> */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <section id="content">
            <nav>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="RC-navBrand">
                  <h1 className="RC-Title">Users</h1>
                </div>
              </div>
              <div className="settingicons">
                <div className="notification" onClick={togglePopup}>
                  <div className="topbariconitems">
                    <NotificationsOutlinedIcon
                      sx={{ fontSize: 28 }}
                      onClick={handleBellIconClick}
                    />
                    {notificationCount > 0 && (
                      <span
                        className="topbarIconBadge"
                        style={{
                          color: "white",
                          position: "absolute",
                          right: "1px",
                          bottom: "18px",
                          width: "45%",
                          fontSize: "14px",
                          background: "red",
                          borderRadius: "50%",
                        }}
                      >
                        {notificationCount}
                      </span>
                    )}
                  </div>
                </div>
                {showPopup && showNotification && (
                  <div className="notification-popup" onClick={closePopup}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "0.5px solid #8080806e",
                      }}
                    >
                      <div
                        style={{
                          textAlign: "left",
                          color: "rgb(55, 81, 255)",
                          fontSize: "18px",
                          fontWeight: "800",
                          paddingLeft: "10px",
                        }}
                      >
                        Notifications
                      </div>
                      <div>
                        <Button
                          onClick={handleCloseNotificationDialog}
                          className="white-button"
                          style={{ textAlign: "right", color: "grey" }}
                        >
                          <CloseRoundedIcon />
                        </Button>
                      </div>
                    </div>
                    {notifications.map((notification, index) => (
                      <div key={index} className="notification-item">
                        <span className="notification-message">
                          <Checkbox {...label} defaultChecked color="success" />
                          {notification.message}
                        </span>
                        <br />
                        <span
                          className="notification-timestamp"
                          style={{ float: "right" }}
                        >
                          {notification.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <SettingsOutlinedIcon
                  sx={{ fontSize: 28 }}
                  onClick={() => setopenpro((prev) => !prev)}
                />
                {openpro && <Settingdropdown />}
              </div>
            </nav>
          </section>
          <nav>
            <div className="RC-Nav">
              <div className="RC-searchbar">
                <SearchIcon className="RC-SearchIcon" />
                <input
                  className="RC-searchInput"
                  placeholder=" Search User"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchQuery && (
                  <div className="searched-username">
                    {" "}
                    {filteredUsers
                      .filter((user) =>
                        user.username
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .map((user) => (
                        <div key={user.id} className="clickable-username">
                          {user.username}
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div style={{ height: 35, display: "inline-flex" }}>
                <select
                  style={{ borderRadius: "4px", fontSize: "12px" }}
                  className="SU-dropdown"
                  onChange={(event) => {
                    if (event.target.value === "Upload CSV Template") {
                      // Trigger file input click when "Import Users" is selected
                      document.getElementById("csvFileInput").click();
                    }
                  }}
                >
                  <option>Import Users</option>
                  <option>Upload CSV Template</option>
                </select>
                <div>
                  <input
                    type="file" //accept=".xlsx"
                    accept=".csv"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                    id="csvFileInput"
                  />
                </div>
                <div style={{ paddingLeft: 32 }}>
                  <Stack spacing={3} direction="row">
                    <Button
                      type="primary"
                      onClick={showModal}
                      style={{ height: 35, fontSize: 12 }}
                      variant="contained"
                      className="btn-add"
                    >
                      Add User
                    </Button>
                    <Modal
                      title="Add User Details"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                    >
                      <Form
                        {...formItemLayout}
                        layout={formLayout}
                        form={form}
                        initialValues={{
                          layout: formLayout,
                        }}
                        onValuesChange={onFormLayoutChange}
                        style={{
                          maxWidth: formLayout === "inline" ? "none" : 600,
                        }}
                      >
                        <Form.Item label="Username:">
                          <Input
                            type="text"
                            placeholder="please enter your userneme"
                            onChange={(e) =>
                              setAddUser({
                                ...AddUser,
                                username: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
                        <Form.Item label="Email:">
                          <Input
                            placeholder="please enter your email"
                            type="email"
                            onChange={(e) =>
                              setAddUser({
                                ...AddUser,
                                Email: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
                        <Form.Item label="Organisation Id:">
                          <Input
                            placeholder="Please Enter Your Organization Id"
                            type="text"
                            onChange={(e) =>
                              setAddUser({
                                ...AddUser,
                                Orgid: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
                        <Form.Item label="Organisation Name:">
                          <Input
                            placeholder="Please Enter Your Organization Name"
                            type="text"
                            onChange={(e) =>
                              setAddUser({
                                ...AddUser,
                                Orgname: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
                        <Form.Item label="Department:">
                          <Input placeholder="Please Enter Your Department" />
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                          <Button type="primary" onClick={handleSubmit}>
                            Submit
                          </Button>
                        </Form.Item>
                      </Form>
                    </Modal>
                    {isOpen && (
                      <></>
                    )}

                    <Button
                      style={{ height: 35, fontSize: 12 }}
                      variant="contained"
                      className="btn-report"
                    >
                      Reports
                    </Button>
                    {showDataExistsPopup && (
                      <div className="data-exists-popup">
                        <div className="data-exists-popup-content">
                          <p>Data already exists for this user.</p>
                          <button onClick={closeDataExistsPopup}>Close</button>
                        </div>
                      </div>
                    )}
                  </Stack>
                </div>
              </div>
            </div>
          </nav>        
            <div className="table-data">
              <div className="order">
                <table className="RC-data">
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Organisation Name</th>
                      <th>Organisation Id</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers
                      .filter((user) => user.username !== "User")
                      .map((user) => (
                        <tr key={user.id}>
                          <td>
                            <strong>{user.username}</strong>
                          </td>
                          <td>{user.orgname}</td>
                          <td>{user.orgid}</td>
                          <td>{user.email}</td>
                          <td>{user.department}</td>
                          <td>
                            <span
                              className="status completed"
                              id="statusElement"
                            >
                              {user.status}
                            </span>
                          </td>

                          <td className="fit">
                            <span className="RC-actions">
                              {user.status === "unscanned" ? (
                                <Link to="/fingerscan">
                                  <BsFingerprint
                                    className="scan-btn"
                                    onClick={() => handleScanButtonClick(user)}
                                  />
                                </Link>
                              ) : null}
                              <BsEye
                                className="view-btn"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setOpenViewDialog(true);
                                }}
                              />
                              <BsPencil
                                className="edit-btn"
                                onClick={() => handleEditClick(user)}
                              />
                              <BsTrash
                                className="delete-btn"
                                onClick={() => handleDeleteClick(user.id)} // Pass the user's ID to the delete function
                              />
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          
        </Box>
      </Box>
      {/* View Dialog */}
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog}>
        <DialogTitle style={{ background: "#004CFF" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "white",
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            {selectedUser && <p>View {selectedUser.username}'s details</p>}
            <Button
              onClick={handleCloseViewDialog}
              className="white-button"
              style={{
                cursor: "pointer",
                background: "white",
                color: "red",
                left: "15px",
                minWidth: 20,
              }}
            >
              <CloseRoundedIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <div className="ViewPage">
              <div className="TableView">
                <table className="user-table">
                  <tbody>
                    <tr className="user-table">
                      <td className="table-label">User Name:</td>
                      <td className="table-label">{selectedUser.username}</td>
                    </tr>
                    <tr className="user-table">
                      <td className="table-label">Organisation Name:</td>
                      <td className="table-label">{selectedUser.orgname}</td>
                    </tr>
                    <tr className="user-table">
                      <td className="table-label">Organisation Id::</td>
                      <td className="table-label">{selectedUser.orgid}</td>
                    </tr>
                    <tr className="user-table">
                      <td className="table-label">Email Id:</td>
                      <td className="table-label">{selectedUser.email}</td>
                    </tr>
                    <tr className="user-table">
                      <td className="table-label">Status:</td>
                      <td className="table-label">{selectedUser.status}</td>
                    </tr>
                  </tbody>
                </table>
                {selectedUser.status === "unscanned" && (
                  <Link to="/fingerscan">
                    <Button
                      style={{
                        border: "1px solid",
                        fontSize: 11,
                        marginLeft: "42%",
                        background: "#004CFF",
                        color: "white",
                      }}
                      className="scan-btn"
                      onClick={() => handleScanButtonClick1(users)}
                    >
                      {" "}
                      Scan{" "}
                    </Button>{" "}
                  </Link>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle style={{ background: "#004CFF" }}>
          <div
            style={{
              fontSize: "12",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "white",
            }}
          >
            {selectedUser && (
              <p style={{ fontSize: 12, fontWeight: "bold" }}>
                Edit {selectedUser.username}'s details
              </p>
            )}
            <Button
              onClick={handleCloseEditDialog}
              className="white-button"
              style={{ background: "white", color: "red", minWidth: 20 }}
            >
              <CloseRoundedIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <nav className="EditPage">
                <div className="tableedit">
                  <div>
                    <label>User Name: </label>
                    <input
                      type="text"
                      name="User_name"
                      value={editedUser.username}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          username: e.target.value,
                        })
                      }
                      // readOnly
                    />
                  </div>
                  <div>
                    <label>Organisation Name: </label>
                    <input
                      type="text"
                      name="Org_name"
                      value={editedUser.orgname}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          orgname: e.target.value,
                        })
                      }
                      // readOnly
                    />
                  </div>
                  <div>
                    <label>Organisation Id: </label>
                    <input
                      type="text"
                      name="Org_name"
                      value={editedUser.orgid}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          orgid: e.target.value,
                        })
                      }
                      // readOnly
                    />
                  </div>
                  <div>
                    <label>Email Id: </label>
                    <input
                      type="text"
                      value={editedUser.email}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label>Department: </label>
                    <input
                      type="text"
                      value={editedUser.department}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          department: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label>Status: </label>
                    <input
                      type="text"
                      value={editedUser.status}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          status: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Button
                    style={{
                      border: "1px solid",
                      fontSize: 11,
                      marginLeft: "28%",
                      background: "#004CFF",
                      color: "white",
                    }}
                    className="Update"
                    onClick={() => {
                      handleSaveEdit(selectedUser.id);
                      setOpenEditDialog(false);
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </nav>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShowUsers;
