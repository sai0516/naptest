import React, { useState, useEffect } from "react";
import { BsPencil, BsTrash, BsEye } from "react-icons/bs";
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
import axios from "axios";
import { getAccessToken } from "../../App";
import { API_BASE_URL, API_ENDPOINTS } from "../../config";
import { Update } from "@mui/icons-material";

export const RoleConfig = () => {
  const [openpro, setopenpro] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [openEditRoleDialog, setOpenEditRoleDialog] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedRolename, setEditedRolename] = useState("");
  const [notify, setNotify] = useState([]);

  const [userDetails, setUserDetails] = useState([]);
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        const response = await axios.get(
          API_BASE_URL + API_ENDPOINTS.GET_ROLE,
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
    setFilteredUsers(users);
  }, []);

  const handleEditClick = (user1) => {
    setSelectedUser(user1);
    setEditedUser({ ...user1 });
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (user1) => {
    alert("delete");
    // Handle delete action here
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleCloseEditRoleDialog = () => {
    setOpenEditRoleDialog(false);
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
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }
  }

  const showNotificationMessage = async () => {

    setShowNotification(true);
    setNotificationCount((prevCount) => prevCount + 1);
  };

  const handleSaveEdit = async (id) => {
    console.log(id)
    console.log(editedUser);

    try {
      const accessToken = await getAccessToken();
      const response = await axios.post(
        API_BASE_URL + API_ENDPOINTS.EDIT_ROLE,
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
      const currentDate = new Date().toLocaleString();
      const updatedDetails = [
        ...userDetails,
        { date: currentDate, count: updateCount + 1 },
      ];
      if (response.status === 200) {
        // Update the local state with the edited user data
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editedUser.id ? editedUser : user
          )
        );

        // Close the edit dialog
        setOpenEditDialog(false);

        showNotificationMessage("Changes saved successfully.");
        console.log("User data updated successfully", response.data);

        setUpdateCount(updateCount + 1);
        setFilteredUsers(users);
        setEditedEmail(editedUser.email)
        setUserDetails(updatedDetails);
      
      } else {
        console.error("Error updating user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  
  };

  const handleBellIconClick = () => {
    // Reset the notification count to zero when the bell icon is clicked
    setNotificationCount(0);

    // Toggle the popup or perform other actions as needed
    togglePopup();
  };
  const notifications = [
    { message: "Notification 1", timestamp: "2 minutes ago" },
    { message: "Notification 2", timestamp: "5 minutes ago" },
    // Add more notifications as needed
  ];

  const handleSaveEditRole = async () => {
    try {
      const requestData = {
        id: selectedUserForEdit.id, // Verify that this is correct
        rolename: editedRolename, // Ensure this variable has a valid role
      };
      console.log("Request Data:", requestData);
      const accessToken = await getAccessToken();
      const response = await axios.post(
        API_BASE_URL + API_ENDPOINTS.EDIT_ROLE,
        requestData,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Add this if not included
          },
        }
      );
      console.log("Response Data:", response.data);
      if (response.status === 200) {
      } else {
        console.error("Error updating user role:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const closePopup = () => {
    setShowPopup(true);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    if (!searchQuery) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => {
        const { username, email, rolename } = user;
        const query = searchQuery.toLowerCase();
        return (
          username.toLowerCase().includes(query) ||
          email.toLowerCase().includes(query) ||
          rolename.toLowerCase().includes(query)
        );
      });
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);
  const handleEditRoleClick = (user) => {
    setSelectedUserForEdit(user);
    setEditedUsername(user.username);
    setEditedEmail(user.email);
    setEditedRolename(user.rolename);
    setOpenEditRoleDialog(true);
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
                  <h1 className="RC-Title">Role Config</h1>
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
                {showPopup && (
                  <div className="notification-popup" onClick={closePopup}>
                      {filteredUsers 
                       .map((user) =>{
                        if(user.email === editedEmail){
                          return(
                            <p key={user.id}>
                            {`USER ${user.username}:`}{" "}
                            {userDetails.map((update, index) => (
                              <p
                                key={index}
                              >{`${update.date}: Updated ${update.count} times`}</p>
                            ))}
                          </p>

                          )
                        }
                       })}
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
                  placeholder="Search User"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchQuery && (
                  <div className="searched-username">
                    {filteredUsers
                      .filter((user) =>
                        user.username
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .map((user) => (
                        <div
                          key={user.id}
                          onClick={() => handleEditRoleClick(user)}
                          className="clickable-username"
                        >
                          {user.username}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* ... (rest of your code) */}
          <div className="table-data">
            <div className="order">
              <table className="RC-data">
                <thead>
                  <tr>
                    <th>User Name </th>
                    <th>Email Id</th>
                    <th>Role Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers
                    .filter((user) => user.rolename !== "User")
                    .map((user) => (
                      <tr key={user.id}>
                        <td>
                          <strong>{user.username}</strong>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.rolename}</td>
                        <td className="fit">
                          <span className="RC-actions">
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
                              onClick={() => handleDeleteClick(user)}
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
            }}
          >
            {selectedUser && <p>View {selectedUser.username}'s details</p>}
            <Button
              onClick={handleCloseViewDialog}
              className="white-button"
              style={{ background: "white", color: "red", left: "15px" }}
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
                      <td className="table-label">Email Id:</td>
                      <td className="table-label">{selectedUser.email}</td>
                    </tr>
                    <tr className="user-table">
                      <td className="table-label">Role Name:</td>
                      <td className="table-label">{selectedUser.rolename}</td>
                    </tr>

                    {/* Add more details here */}
                  </tbody>
                </table>
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "white",
              fontSize: 12,
            }}
          >
            {selectedUser && <p>Edit {selectedUser.username}'s details</p>}
            <Button
              onClick={handleCloseEditDialog}
              className="white-button"
              style={{
                background: "white",
                color: "red",
                minWidth: 45,
                height: 28,
              }}
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
                    <br />
                    <input
                      style={{
                        fontSize: "11px",
                        height: "32px",
                        width: "286px",
                      }}
                      type="text"
                      name="User_name"
                      value={editedUser.username}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          username: e.target.value,
                        })
                      }
                      disabled
                      // readOnly
                    />
                  </div>
                  <div>
                    <label>Email Id: </label>
                    <br />
                    <input
                      style={{
                        fontSize: "11px",
                        height: "32px",
                        width: "286px",
                      }}
                      type="text"
                      value={editedUser.email}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          email: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>
                  <div>
                    <label>Role Name: </label>
                    <br />

                    <select
                      name="Role"
                      value={editedUser.rolename}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          rolename: e.target.value,
                        })
                      }
                      className="roledropdown"
                      style={{
                        fontSize: "11px",
                        height: "32px",
                        width: "286px",
                      }}
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="FingerPrint Admin">
                        FingerPrint Admin
                      </option>
                      <option value="User">User</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                  <Button
                    style={{
                      border: "1px solid",
                      fontSize: 11,
                      marginLeft: "25%",
                      marginTop: 20,
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
      {/* New Edit Role Dialog */}
      <Dialog open={openEditRoleDialog} onClose={handleCloseEditRoleDialog}>
        <DialogTitle style={{ background: "#004CFF" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "white",
            }}
          >
            {selectedUserForEdit && (
              <p>Edit {selectedUserForEdit.username}'s Role</p>
            )}
            <Button
              onClick={handleCloseEditRoleDialog}
              className="white-button"
              style={{ cursor: "pointer", background: "white", color: "red" }}
            >
              <CloseRoundedIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          {selectedUserForEdit && (
            <>
              <nav className="EditPage">
                <div className="tableedit">
                  <div>
                    <label>User Name: </label>
                    <br />
                    <input
                      style={{
                        fontSize: "16px",
                        height: "42px",
                        width: "286px",
                      }}
                      type="text"
                      name="User_name"
                      value={editedUsername}
                      onChange={(e) => setEditedUsername(e.target.value)}
                      readOnly
                    />
                  </div>
                  <div>
                    <label>Email Id: </label>
                    <br />
                    <input
                      style={{
                        fontSize: "16px",
                        height: "42px",
                        width: "286px",
                      }}
                      type="text"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      readOnly
                    />
                  </div>
                  <div>
                    <label>Role Name: </label>
                    <br />
                    <select
                      name="Role"
                      value={editedRolename}
                      onChange={(e) => setEditedRolename(e.target.value)}
                      className="roledropdown"
                      style={{
                        fontSize: "16px",
                        height: "42px",
                        width: "286px",
                      }}
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="FingerPrint Admin">
                        FingerPrint Admin
                      </option>
                      <option value="User">User</option>
                    </select>
                  </div>
                  <Button
                    style={{
                      border: "1px solid",
                      fontSize: 11,
                      marginLeft: "25%",
                    }}
                    className="Update"
                    onClick={() => {
                      handleSaveEditRole(selectedUserForEdit.id);
                      handleCloseEditRoleDialog();
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

export default RoleConfig;
