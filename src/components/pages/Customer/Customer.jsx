import * as React from "react";
import { useState, useEffect } from "react";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import Image from "../../images/avatar.png";
import SearchIcon from "@mui/icons-material/Search";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Person2, Fingerprint } from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Settingdropdown } from "../../Settingdropdown";
import { useMsal } from "@azure/msal-react";

import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";
import CodeIcon from "@rsuite/icons/Code";
import PageIcon from "@rsuite/icons/Page";
import DetailIcon from "@rsuite/icons/Detail";
import FolderFillIcon from "@rsuite/icons/FolderFill";
import FileDownloadIcon from "@rsuite/icons/FileDownload";
import FileUploadIcon from "@rsuite/icons/FileUpload";
import Notifications from "../Notification/Notification1";
import axios from "axios";
import { getAccessToken } from "../../../App";
import { API_BASE_URL, API_ENDPOINTS } from "../../../config";
import Button from "@mui/material/Button";
import { useTable, useFilters } from "react-table";
import DummyData from "./DummyData.json";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Dialog as DialogDilog } from "@fluentui/react";
import {
  DialogType,
  DialogFooter,
  DefaultButton,
  PrimaryButton,
} from "@fluentui/react";
import Slide from "@mui/material/Slide";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { BsPencil, BsTrash, BsEye } from "react-icons/bs";
import { HiUserAdd } from "react-icons/hi";
import "./CustomerStyle.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import { Spinner, ITheme, createTheme, ThemeProvider } from "@fluentui/react";
import Checkbox from "@mui/material/Checkbox";

const Customer = (props) => {


  const [openpro, setopenpro] = useState(false);
  const [selected, setselected] = useState("");
  const [userList, setUserList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [EditForm, setEditForm] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState([null]);
  const [ViewForm, setViewForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showaddModal, setShowaddModal] = useState(false);
  const [showeditModal, setShoweditModal] = useState(false);
  const [showlicenceModal, setShowlicenceModal] = useState(false);
  const [showdelModal, setShowdelModal] = useState(false);
  const [showdelconModal, setShowdelconModal] = useState(false);
  const { instance, accounts } = useMsal();

  const [AddLicense, setAddLicense] = useState({
    id: "",
    customername: "",
    no_of_licences: "",
    status: "",
  });

  const [AddLicenseForm, setAddLicenseForm] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const [notifyclose, setnotifyclose] = useState(
    JSON.parse(sessionStorage.getItem("notificationData"))
      ? JSON.parse(sessionStorage.getItem("notificationData"))
      : []
  );
  const [showNotification, setShowNotification] = useState(true);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [notificationCount, setNotificationCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const filteredUsers = userList.filter((user) =>
    user.customername.toLowerCase().includes(searchValue.toLowerCase())
  );
  const [userData, setUserData] = useState([]);

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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    
    fetchData1();
  }, []);

  const myTheme = createTheme({
    palette: {
      themePrimary: 'orange'
    }
  });


  const handleAddLicenseChange = (e) => {
    const { name, value } = e.target;
    setAddLicense({ ...AddLicense, [name]: value });
  };

  const handleEditClick = (user1) => {
    setSelectedCustomer(user1);
    setEditCustomer({ ...user1 });
    setEditForm(true);
  };

  const handleAddLicense = (user1) => {
    setSelectedCustomer(user1);
    setAddLicense({ ...user1 });
    setAddLicenseForm(true);
  };

  const [Editcustomer, setEditCustomer] = useState({
    id: "",
    customername: "",
    no_of_licences: "",
    status: "",
    // Add other customer properties here
  });

  const showToastMessageForAddCustomer = () => {
    toast.success("User Added Successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const showToastMessageForAddCustomerError = () => {
    toast.error("try with Different tenant id!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const showToastMessageForEditCustomer = () => {
    toast.success("Successfully edited his details!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const showToastMessageForEditCustomerError = () => {
    toast.error("Error in Fetching please try again Some time!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const showToastMessageForAddLicense = () => {
    toast.success("Successfully Added License!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const showToastMessageForAddLicenseError = () => {
    toast.error("Error in Fetching please try again Some time!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const handleInputChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditCustomer({ ...Editcustomer, [name]: value });
  };

  const [formData, setFormData] = useState({
    id: "",
    customername: "",
    no_of_licences: "",
    status: "",
    // Add other fields as needed
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setValidationMessages({
      ...validationMessages,
      [e.target.name]: "",
    });
    if (name === 'id') {
      if (!value || guidRegex.test(value)) {
        // Clear the validation message when the input is valid or empty
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          [name]: '',
        }));
      } else {
        // Show an error message for invalid GUID format
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          [name]: 'Please enter a valid GUID format.',
        }));
      }
    }
  };
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

        // Process the response data
        const users = data.map((user) => ({
          id: user.id,
          customername: user.customername,
          no_of_licences: user.no_of_licences,
          status: user.status,
        }));
        setTimeout(() => {
          setIsLoading(false); // Set loading to false when the data is fetched
        }, 2000);
        setUserList(users);
        console.log(users);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  const TableFetchDAta = async () => {
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

      // Process the response data
      const users = data.map((user) => ({
        id: user.id,
        customername: user.customername,
        no_of_licences: user.no_of_licences,
        status: user.status,
      }));
      setTimeout(() => {
        setIsLoading(false); // Set loading to false when the data is fetched
      }, 2000);
      setUserList(users);
      // console.log(users);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [validationMessages, setValidationMessages] = useState({
    id: "",
    customername: "",
    no_of_licences: "",
    status: "",
  });
  const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  
  const validateForm = () => {
    let isValid = true;
    const newValidationMessages = {};

    // Validate username
    if (!formData.id.trim()) {
      newValidationMessages.id = "Customer tenant id is required";
      isValid = false;
    }
    if (!formData.customername.trim()) {
      newValidationMessages.customername = "Customername is required";
      isValid = false;
    }

    // Validate password
    if (!formData.no_of_licences.trim()) {
      newValidationMessages.no_of_licences = "no_of_licences is required";
      isValid = false;
    }

    if (!formData.status.trim()) {
      newValidationMessages.status = "please activate status";
      isValid = false;
    }

    setValidationMessages(newValidationMessages);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Form is not valid, do not proceed with the API request
      return;
    }

    try {
      const accessToken = await getAccessToken();
      const response = await fetch(
        "https://ntapadminapidev.azurewebsites.net/CustomerAdminNTAP/AddCustomer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers if required
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        // Handle error responses
        throw new Error("Network response was not ok");
      } else {
        const result = await response.json();
        console.log("Success:", result);
        setIsActive(!isActive);
        TableFetchDAta();
        openaddModal();
       // showToastMessageForAddCustomer();
        setFormData("");
      }

      handleModalClose();
    } catch (error) {
      console.error("Error:", error);
      setFormData("");
      handleModalClose();
      showToastMessageForAddCustomerError();
    }
  };

  const [isActive, setIsActive] = useState(false);

  const handleSwitchToggle = (user, ind) =>  {
    const update = userList.map((obj, index) => {
      if (index === ind) {
        
        return {
          ...obj,
          status: obj.status === "Active" ? "Inactive" : "Active",
          
        };
        // window.location.reload()
        
        
      } 
       
       else {
        return obj;
      }
      window.location.reload()
     
    }); 
     var index = update.findIndex(obj => obj.id === user.id);
    var user1=update[index];
    handlechangeLicenseSave(user1);
    setUserList(update);
    setIsActive(!isActive);
    // You may want to send a request to update the server with the new state here
    // For example, using fetch or axios to make an API call
    // You can add the necessary logic based on your application's requirements
    // handleSubmit(!isActive);
  };

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
      width: 12,
      height: 12,
      margin: 4,
    },
  }));
  const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    // Add typography styles for the label
    "& .MuiFormControlLabel-label": {
      fontFamily: "'Quicksand', sans-serif", 
      fontSize: "11px", 
      fontWeight: "", 
    },
  }));

  const handleModalClose = () => {
    setShowForm(false);
  };

  const editformclose = () => {
    setEditForm(false);
  };
  const AddLicenseFormclose = () => {
    setAddLicenseForm(false);
  };
  const ViewFormclose = () => {
    setViewForm(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const closePopup = () => {
    setShowPopup(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [idtodel, setidtodel] = useState(null);


  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  const deleteItemok = (id) => {
    openDialog(id);
  };
  const deleteItemokpopup = (id) => {
    handleDelete(id);
    // After successful deletion, close the dialog
    handleConfirmDelete(id);
    // After successful deletion, close the dialog
    closeDialog();
  };

  const handleDelete =async() => {
   
    try {
      const accessToken = await getAccessToken();
      const response =  await fetch(
        `https://ntapadminapidev.azurewebsites.net/CustomerAdminNTAP/DeleteCustomer/${idtodel}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete record");
      }
      setUserList((userList) => userList.filter((user) => user.id !== idtodel));
      setidtodel(null);
      TableFetchDAta();
      closedelconModal();
    } catch (error) {
      console.error("Error deleting record:", error.message);
    }
  }
  const openlicenceModal = () => {
    setShowlicenceModal(true);
  };

  const closelicenceModal = () => {
    setShowlicenceModal(false);
  };

  const handlelicenceConfirm = () => {
    // Your logic when the user confirms
    console.log('Confirmed');
    closelicenceModal();
  }; 
 const openaddModal = () => {
    setShowaddModal(true);
  };

  const closeaddModal = () => {
    setShowaddModal(false);
  };

  const handleaddConfirm = () => {
    // Your logic when the user confirms
    console.log('Confirmed');
    closeaddModal();
  }; 
  const opendelModal = () => {
    setShowdelModal(true);
  };

  const closedelModal = () => {
    setShowdelModal(false);
  };

  const handledelConfirm = () => {
    // Your logic when the user confirms
    console.log('Confirmed');
    closedelModal();
  }; 
  const openeditModal = () => {
    setShoweditModal(true);
  };

  const closeeditModal = () => {
    setShoweditModal(false);
  };

  const handleeditConfirm = () => {
    // Your logic when the user confirms
    console.log('Confirmed');
    closeeditModal();
  };


  const opendelconModal = (itemId) => {
    setidtodel(itemId);
    setShowdelconModal(true);
  };

  const closedelconModal = () => {
    setShowdelconModal(false);
    setidtodel(null);
  };;

  const handleSaveEdit = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await fetch(
        "https://ntapadminapidev.azurewebsites.net/CustomerAdminNTAP/EditCustomer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(Editcustomer),
        }
      );
      const currentDate = new Date().toLocaleString();
      if (response.status === 200) {
        console.log(response, "success");
        console.log("User edited his data Successfully", response.data);
        openeditModal();
        fetchData1();
        setUpdateCount(updateCount + 1);
        showNotificationMessage();
        let getNotifydata = JSON.parse(
          sessionStorage.getItem("notificationData")
        );
        if (!Array.isArray(getNotifydata)) {
          getNotifydata = [];
        }
        let found = false;
        for (let i = 0; i < getNotifydata.length; i++) {
          if (
            getNotifydata[i].UserId === Editcustomer.id &&
            getNotifydata[i].currentpage === "Customer"
          ) {
            getNotifydata[i].isUpdate = true;
            getNotifydata[i].UserName = Editcustomer.customername;
            getNotifydata[
              i
            ].message = `Successfully ${Editcustomer.customername} upadated his details`;
            getNotifydata[i].details.date = currentDate;
            getNotifydata[i].details.count = getNotifydata[i].details.count + 1;
            found = true;
            break;
          }
        }
        if (!found) {
          getNotifydata.push({
            UserId: Editcustomer.id,
            currentpage: "Customer",
            message: `Successfully ${Editcustomer.customername} upadated his details`,
            isUpdate: true,
            UserName: Editcustomer.customername,
            details: { date: currentDate, count: 1 },
          });
        }
        console.log(getNotifydata, "sdd");
        console.log(sessionStorage.getItem("notificationData"));
        getNotifydata.sort(
          (a, b) =>
            new Date(b.details.date).getTime() -
            new Date(a.details.date).getTime()
        );
        sessionStorage.setItem(
          "notificationData",
          JSON.stringify(getNotifydata)
        );
        setnotifyclose(getNotifydata);
        TableFetchDAta();
      } else {
        console.error("Error updating user data:", response.statusText);
      }
    } catch (error) {
      showToastMessageForEditCustomerError();
      console.error("Error updating user data:", error);
    }
  };
  const notifyClear = (id, ind) => {
    let getNotifydata = JSON.parse(sessionStorage.getItem("notificationData"));
    const remove = getNotifydata.map((obj, index) => {
      if (obj.UserId === id && index === ind) {
        return {
          ...obj,
          isUpdate: false,
          details: { date: "", count: 0 },
        };
      } else {
        return obj;
      }
    });
    setnotifyclose(remove);
    sessionStorage.setItem("notificationData", JSON.stringify(remove));
  };
  const handlechangeLicenseSave = async (user) => {
    try {
      const accessToken = await getAccessToken();
      const response = await fetch(
        "https://ntapadminapidev.azurewebsites.net/CustomerAdminNTAP/EditCustomer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(user),
        }
      );
      if (response.status === 200) {
        console.log(response, "success");
        console.log("User edited his data Successfully", response.data);
        openeditModal();
        TableFetchDAta();
      } else {
        console.error("Error updating user data:", response.statusText);
      }
    } catch (error) {
      showToastMessageForAddLicenseError();
      console.error("Error updating user data:", error);
    }
  };
  const handleAddLicenseSave = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await fetch(
        "https://ntapadminapidev.azurewebsites.net/CustomerAdminNTAP/EditCustomer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(AddLicense),
        }
      );
      if (response.status === 200) {
        console.log(response, "success");
        console.log("User edited his data Successfully", response.data);
        openlicenceModal();
        TableFetchDAta();
      } else {
        console.error("Error updating user data:", response.statusText);
      }
    } catch (error) {
      showToastMessageForAddLicenseError();
      console.error("Error updating user data:", error);
    }
  };

  const showNotificationMessage = () => {
    setNotificationCount((prevCount) => prevCount + 1);
  };
  const handleBellIconClick = () => {
    // Reset the notification count to zero when the bell icon is clicked
    setNotificationCount(0);
    // Toggle the popup or perform other actions as needed
    togglePopup();
  };

  return (
    <div>
      <section id="content">
        {/* <!-- NAVBAR --> */}
        <nav>
          <div className="navBrand">
            {props.toggle ? (
              <span className="bx bx-menu">
                <MenuSharpIcon sx={{ fontSize: 30 }} onClick={props.onClick} />
              </span>
            ) : null}
            <h6 style={{marginLeft: "5px" , marginBottom: "10px"}}>Analytics</h6>
          </div>
          <div className="navcontent">
            <div className="settingicons" style={{ marginLeft: "500px" }}>
              <div className="notification">
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
                        right: "2px",
                        bottom: "18px",
                        width: "75%",
                        fontSize: "14px",
                        background: "red",
                        borderRadius: "100%",
                      }}
                    >
                      {notificationCount}
                    </span>
                  )}
                </div>
              </div>
              {showPopup && showNotification && (
                <div
                  className="notification-popup"
                  style={{ border: "solid black 1px", borderRadius: "5px" }}
                >
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
                        fontFamily: "Quicksand,sans-serif",
                        paddingLeft: "10px",
                      }}
                    >
                      Notifications
                    </div>
                    <div>
                      <Button
                        onClick={closePopup}
                        style={{
                          textAlign: "right",
                          color: "orange",
                          fontFamily: "Quicksand,sans-serif",
                        }}
                      >
                        close
                      </Button>
                    </div>
                  </div>
                  {notifyclose?.map((obj, ind) => {
                    if (obj.isUpdate) {
                      return (
                        <div key={obj.id} className="notification-item">
                          <span
                            className="notification-message"
                            style={{ fontFamily: "Quicksand,sans-serif" }}
                          >
                            <Checkbox
                              {...label}
                              defaultChecked
                              color="success"
                            />
                            {obj.message}
                          </span>
                          <Button
                            style={{
                              float: "right",
                              fontFamily: "Quicksand,sans-serif",
                            }}
                            className="btn-add"
                            onClick={() => notifyClear(obj.UserId, ind)}
                          >
                            X
                          </Button>
                          <span
                            className="notification-timestamp"
                            style={{
                              float: "right",
                              fontFamily: "Quicksand,sans-serif",
                            }}
                            key={obj}
                          >
                            {`${obj.details.date}: Updated ${obj.details.count} times`}
                          </span>
                        </div>
                      );
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
          </div>
        </nav>
        <main>
        {userData ? (
          <ul className="box-info" style={{ marginTop: "10px" }}>
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
          </ul>):(
            <p>Loading Data....</p>
          )}
          <div
            className="searchbar"
            style={{
              width: "500px",
              marginTop: "20px",
              marginBottom: "15px",
              marginLeft: "5px",
            }}
          >
            <SearchIcon className="SearchIcon" style={{ color: "gray", marginLeft: "10px" }} />
            <input
              className="searchInput"
              placeholder="Search by name"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <Button
            variant="contained"
            style={{
              marginTop: "-80px",
              marginLeft: "995px",
              marginBottom: "10px",
              fontSize: "12px",
              width: "150px",
              backgroundColor: "orange",
            }}
            onClick={() => setShowForm(true)}
          >
            Add Customer
          </Button>
          {showForm && (
            <Dialog
              open={showForm}
              onClose={handleModalClose}
              style={{ padding: "5px" }}
            >
              <DialogTitle style={{ backgroundColor: "orange" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                    width: "450px",
                  }}
                >
                  Add Customer Details
                  <Button
                    onClick={handleModalClose}
                    className="white-button"
                    style={{
                      cursor: "pointer",
                      background: "white",
                      color: "gray",
                      left: "15px",
                      minWidth: 20,
                    }}
                  >
                    <CloseRoundedIcon />
                  </Button>
                </div>
              </DialogTitle>
              <DialogContent style={{ padding: "3px 3px" }}>
                <form
                  onSubmit={handleSubmit}
                  className="popup-form"
                  style={{ padding: "10px" }}
                >
                  {/* Add your form fields here */}
                  <label>Customer Tenant Id:</label>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  />
                  <span style={{ color: "red" }}>{validationMessages.id}</span>

                  <label>Customer Name:</label>
                  <input
                    type="text"
                    name="customername"
                    value={formData.customername}
                    onChange={handleInputChange}
                  />
                  <span style={{ color: "red" }}>
                    {validationMessages.customername}
                  </span>
                  <label>License:</label>
                  <input
                    type="number"
                    name="no_of_licences"
                    placeholder="please type 50"
                    value={formData.no_of_licences}
                    onChange={handleInputChange}
                  />
                  <span style={{ color: "red" }}>
                    {validationMessages.no_of_licences}
                  </span>
                  <label>Status:</label>
                  <select
                    type="text"
                    id="customerDropdown"
                    style={{ height: "40px" }}
                    value={formData.status}
                    name="status"
                    onChange={handleInputChange}
                  >
                    <option>Select a Status</option>

                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <span style={{ color: "red" }}>
                    {validationMessages.status}
                  </span>
                  <button
                    type="submit"
                    className="submit-popup"
                    style={{ backgroundColor: "orange" }}
                  >
                    Submit
                  </button>
                </form>
              </DialogContent>
            </Dialog>
          )}
          <ToastContainer />

          {EditForm && (
            <Dialog
              open={EditForm}
              onClose={editformclose}
              style={{ padding: "5px" }}
            >
              <DialogTitle style={{ backgroundColor: "orange" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                    width: "450px",
                  }}
                >
                  {selectedCustomer && (
                    <p> {selectedCustomer.customername}'s details</p>
                  )}
                  <Button
                    onClick={editformclose}
                    className="white-button"
                    style={{
                      cursor: "pointer",
                      background: "white",
                      color: "gray",
                      left: "15px",
                      minWidth: 20,
                    }}
                  >
                    <CloseRoundedIcon />
                  </Button>
                </div>
              </DialogTitle>
              <DialogContent style={{ padding: "3px 3px" }}>
                <div
                  className="popup-form"
                  style={{ padding: "10px" }}
                >
                  {/* Add your form fields here */}
                  <label>Customer Tenant Id:</label>
                  <input
                    type="text"
                    name="id"
                    value={Editcustomer.id}
                    onChange={handleInputChangeEdit}
                    placeholder="Enter Your Tenant Id"
                    disabled
                  />

                  <label>Customer Name:</label>
                  <input
                    type="text"
                    name="customername"
                    value={Editcustomer.customername}
                    onChange={handleInputChangeEdit}
                  />

                  <label>License:</label>
                  <input
                    type="number"
                    name="no_of_licences"
                    placeholder="please type 50"
                    value={Editcustomer.no_of_licences}
                    onChange={handleInputChangeEdit}
                  />

                  <label>Status:</label>
                  <select
                    type="text"
                    id="customerDropdown"
                    style={{ height: "40px" }}
                    value={Editcustomer.status}
                    name="status"
                    onChange={handleInputChangeEdit}
                  >
                    <option>Select a Status</option>

                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <button
                    type="submit"
                    className="submit-popup"
                    style={{ backgroundColor: "orange", width: "110px" }}
                    onClick={() => {
                      handleSaveEdit(Editcustomer.id);
                      setEditForm(false);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          <ToastContainer />

          {AddLicenseForm && (
            <Dialog
              open={AddLicenseForm}
              onClose={AddLicenseFormclose}
              style={{ padding: "5px" }}
            >
              <DialogTitle style={{ backgroundColor: "orange" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                    width: "450px",
                  }}
                >
                  {selectedCustomer && (
                    <p> {selectedCustomer.customername}'s details</p>
                  )}
                  <Button
                    onClick={AddLicenseFormclose}
                    className="white-button"
                    style={{
                      cursor: "pointer",
                      background: "white",
                      color: "gray",
                      left: "15px",
                      minWidth: 20,
                    }}
                  >
                    <CloseRoundedIcon />
                  </Button>
                </div>
              </DialogTitle>
              <DialogContent style={{ padding: "3px 3px" }}>
                <div
                  className="popup-form"
                  style={{ padding: "10px" }}
                >
                  {/* Add your form fields here */}
                  <label>Customer Tenant Id:</label>
                  <input
                    type="text"
                    name="id"
                    value={AddLicense.id}
                    onChange={handleAddLicenseChange}
                    placeholder="Enter Your Tenant Id"
                    disabled
                  />

                  <label>Customer Name:</label>
                  <input
                    type="text"
                    name="customername"
                    value={AddLicense.customername}
                    onChange={handleAddLicenseChange}
                    disabled
                  />

                  <label>License:</label>
                  <input
                    type="number"
                    // pattern="[0-9]*"
                    name="no_of_licences"
                    placeholder="please type 50"
                    value={AddLicense.no_of_licences}
                    onChange={handleAddLicenseChange}
                  />

                  <label>Status:</label>
                  <select
                    type="text"
                    id="customerDropdown"
                    style={{ height: "40px" }}
                    value={AddLicense.status}
                    name="status"
                    onChange={handleAddLicenseChange}
                    disabled
                  >
                    <option>Select a Status</option>

                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <button
                    type="submit"
                    className="submit-popup"
                    style={{ backgroundColor: "orange", width: "110px" }}
                    onClick={() => {
                      handleAddLicenseSave(AddLicense.id);
                      setAddLicenseForm(false);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          <ToastContainer />

          {ViewForm && (
            <Dialog open={ViewForm} onClose={ViewFormclose}>
              <DialogTitle style={{ backgroundColor: "orange" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {selectedCustomer && (
                    <p>View {selectedCustomer.customername}'s details</p>
                  )}
                  <Button
                    onClick={ViewFormclose}
                    className="white-button"
                    style={{
                      cursor: "pointer",
                      background: "white",
                      color: "gray",
                      left: "15px",
                      minWidth: 20,
                    }}
                  >
                    <CloseRoundedIcon />
                  </Button>
                </div>
              </DialogTitle>
              <DialogContent style={{ width: "450px" }}>
                {selectedCustomer && (
                  <div
                    className="ViewPage"
                    style={{ marginLeft: "-20px", marginRight: "-5px" }}
                  >
                    <div className="TableView">
                      <table className="user-table">
                        <tbody>
                          <tr className="user-table">
                            <td className="table-label">Customer Tenant Id:</td>
                            <td className="table-label">
                              {selectedCustomer.id}
                            </td>
                          </tr>
                          <tr className="user-table">
                            <td className="table-label">CustomerName:</td>
                            <td className="table-label">
                              {selectedCustomer.customername}
                            </td>
                          </tr>
                          <tr className="user-table">
                            <td className="table-label">Customer License:</td>
                            <td className="table-label">
                              {selectedCustomer.no_of_licences}
                            </td>
                          </tr>
                          <tr className="user-table">
                            <td className="table-label">Customer Status:</td>
                            <td className="table-label">
                              {selectedCustomer.status}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          )}

          <div
            className="table-data"
          >
            <div className="order">
              <table>
                <thead>
                  <tr>
                    <th>Customer Tenant Id</th>
                    <th>Customer Name</th>
                    <th>License</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {isLoading ? (
                  <ThemeProvider theme={myTheme}>
                  <Spinner
                  label="Loading..."
                  styles={{
                    root: {
                      marginLeft: "350px",
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
                    {filteredUsers
                      .filter((user) => user.customername !== "customername")
                      .map((user, index) => (
                        <tr key={index}>
                          <td>{user.id}</td>
                          <td>{user.customername}</td>
                          <td>{user.no_of_licences}</td>

                          <td>
                            {" "}
                            <FormGroup>
                             <StyledFormControlLabel
                                className="label"
                                control={
                                  <ActiveINactive
                                    checked={
                                      user.status === "Active" ? true : false
                                    }
                                    onChange={() => {
                                      handleSwitchToggle(user, index);
                                      fetchData1();
                                  }}
                                  
                                    
                                  />
                                }
                                label={
                                  user.status === "Active"
                                    ? "Active"
                                    : "Inactive"
                                }
                              />
                            </FormGroup>
                          </td>
                          <td className="fit">
                            <span className="RC-actions">
                              <div className="tooltip">
                                <BsEye
                                  className="view-btn"
                                  style={{ color: "orange" }}
                                  onClick={() => {
                                    setSelectedCustomer(user);
                                    setViewForm(true);
                                  }}
                                />
                                <span className="tooltiptext">view</span>
                              </div>
                              <div className="tooltip">
                                <HiUserAdd
                                  style={{ color: "orange" }}
                                  onClick={() => handleAddLicense(user)}
                                />
                                <span className="tooltiptext">Add License</span>
                              </div>
                              <div className="tooltip">
                                <BsPencil
                                  className="edt"
                                  onClick={() => handleEditClick(user)}
                                  style={{ color: "orange" }}
                                />
                                <span className="tooltiptext">edit</span>
                              </div>
                              <div className="tooltip">
                                <BsTrash
                                  className="delete-btn"
                                  onClick={() => opendelconModal(user.id)}  
                                  style={{ color: "orange" }}
                                />
                                <span className="tooltiptext">Delete</span>
                              </div>
                              <div>
                                <DialogDilog
                                  hidden={!isDialogOpen}
                                  onDismiss={openDialog}
                                  dialogContentProps={{
                                    type: DialogType.normal,
                                    title: "Delete Customer",
                                    subText:
                                      "Are you sure you want to delete this Customer?",
                                  }}
                                >
                                  <DialogFooter>
                                    <Button
                                      variant="contained"
                                      style={{
                                        fontSize: "12px",
                                        backgroundColor: "orange",
                                        color: "white",
                                      }}
                                      onClick={() => deleteItemokpopup(user.id)}
                                    >
                                      Delete
                                    </Button>
                                    <Button
                                      variant="contained"
                                      style={{
                                        fontSize: "12px",
                                        backgroundColor: "gray",
                                        color: "white",
                                      }}
                                      onClick={closeDialog}
                                    >
                                      cancel
                                    </Button>
                                  </DialogFooter>
                                </DialogDilog>
                              </div>
                            </span>
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
    
        <div>
      {showaddModal && (
        <div className="modal">
          <div className="modal-content">
            <div    style={{
              height:"25px",
                        border: "1px solid",
                        fontSize: "16px",
                        borderTopLeftRadius:"5px",
                        borderTopRightRadius:"5px",
                        background: "orange",
                        color: "white",
                     
                      }}> Customer Added  
            <span className="modal-close" onClick={closeaddModal}>&times;</span>
            </div>
<div style={{padding:"20px"}}>
            <p  >Customer added Successfully</p>
            <button className="modal-button" onClick={handleaddConfirm}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
     <div>
      {showeditModal && (
        <div className="modal">
          <div className="modal-content">
            <div    style={{
              height:"25px",
                        border: "1px solid",
                        fontSize: "16px",
                        borderTopLeftRadius:"5px",
                        borderTopRightRadius:"5px",
                        background: "orange",
                        color: "white",
                     
                      }}> Customer Updated  
            <span className="modal-close" onClick={closeeditModal}>&times;</span>
            </div>
<div style={{padding:"20px"}}>
            <p  className="Update-popup">Customer Data Updated Successfully</p>
            <button className="modal-button" onClick={handleeditConfirm}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
    <div>
      {showlicenceModal && (
        <div className="modal">
          <div className="modal-content">
            <div    style={{
              height:"25px",
                        border: "1px solid",
                        fontSize: "16px",
                        borderTopLeftRadius:"5px",
                        borderTopRightRadius:"5px",
                        background: "orange",
                        color: "white",
                     
                      }}> Customer Licence Updated  
            <span className="modal-close" onClick={closelicenceModal}>&times;</span>
            </div>
<div style={{padding:"20px"}}>
            <p  className="Update-popup">Customer Licence Details Updated Successfully</p>
            <button className="modal-button" onClick={handlelicenceConfirm}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
    <div>
      {showdelModal && (
        <div className="modal">
          <div className="modal-content">
            <div    style={{
              height:"25px",
                        border: "1px solid",
                        fontSize: "16px",
                        borderTopLeftRadius:"5px",
                        borderTopRightRadius:"5px",
                        background: "orange",
                        color: "white",
                     
                      }}> Customer Deleted  
            <span className="modal-close" onClick={closedelModal}>&times;</span>
            </div>
<div style={{padding:"20px"}}>
            <p  >Customer deleted Successfully</p>
            <button className="modal-button" onClick={handledelConfirm}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div> 

      <div>
      {showdelconModal && (
        <div className="modal">
          <div className="modal-content">
            <div    style={{
              height:"25px",
                        border: "1px solid",
                        fontSize: "16px",
                        borderTopLeftRadius:"5px",
                        borderTopRightRadius:"5px",
                        background: "orange",
                        color: "white",
                     
                      }}> Customer Delete  
            <span className="modal-close" onClick={closedelconModal}>&times;</span>
            </div>
<div style={{padding:"20px"}}>
            <p  >Are you sure you want to delete this Customer?</p>
            <button className="modal-button-confirm" onClick={handleDelete}>Confirm</button>
            
            <button style={{marginLeft:"10px",}}className="modal-button-cancel" onClick={closedelconModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Customer;
