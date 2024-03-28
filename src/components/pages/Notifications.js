import {React,useState}from 'react'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Settingdropdown } from '../Settingdropdown';
const Notifications = () => {
    const [openpro, setopenpro] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    function formatTimestamp(timestamp) {
      console.log(timestamp)
      const now = new Date();
      const notificationTime = new Date(timestamp);
      const timeDifferenceInSeconds = Math.floor((now - notificationTime) / 1000);
      console.log(timeDifferenceInSeconds)
      if (timeDifferenceInSeconds < 60) {
        return `${timeDifferenceInSeconds} seconds ago`;
      } else if (timeDifferenceInSeconds < 3600) {
        const minutes = Math.floor(timeDifferenceInSeconds / 60);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
      } else if (timeDifferenceInSeconds < 86400) {
        const hours = Math.floor(timeDifferenceInSeconds / 3600);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
      } else {
        const days = Math.floor(timeDifferenceInSeconds / 86400);
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
      }
    }
    const showNotificationMessage = (message) => {
    const timestamp = Date.now();
    const formattedTimestamp = formatTimestamp(timestamp);
    const newNotification = {
      message,
      timestamp: formattedTimestamp,
    };
    setNotificationMessage({ message, timestamp });
    setShowNotification(true);
    setNotificationCount((prevCount) => prevCount + 1);
  };
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
    const togglePopup = () => {
        setShowPopup(!showPopup);
      };
    
      const closePopup = () => {
        setShowPopup(false);
      };
  return (
    <div className='settingicons'>
         <div  className="notification" onClick={togglePopup}>
               <div className='topbariconitems'>
                  <NotificationsOutlinedIcon sx={{ fontSize: 28 }} />
                     {notificationCount > 0 && (
                        <span className='topbarIconBadge' style={{color:'white',position:'absolute',right:'1px',bottom:'18px',width:'45%',fontSize:'14px',background:'red'}}>{notificationCount}</span>
                     )}
                </div>
         </div>
      {showPopup && showNotification && (
      <div className="notification-popup" onClick={closePopup}>
      <div className="notification-item">
      <span className="notification-message"> {notificationMessage}</span>
      </div>

   </div>
  )}
        <SettingsOutlinedIcon sx={{ fontSize: 28 }} onClick={() => setopenpro((prev) => !prev)}/>
            {
             openpro && <Settingdropdown />
            }
     </div>
  )
}
export default Notifications