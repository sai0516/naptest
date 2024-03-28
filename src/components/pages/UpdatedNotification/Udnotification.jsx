import React from 'react'

const Udnotification = () => {
    const [notificationCount, setNotificationCount] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [showNotification, setShowNotification] = useState(true);
    const label = { inputProps: { "aria-label": "Checkbox demo" } };
    const [notifyclose, setnotifyclose] = useState(
        JSON.parse(sessionStorage.getItem("notificationData"))
          ? JSON.parse(sessionStorage.getItem("notificationData"))
          : []
      );
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
    const showNotificationMessage = () => {
        setNotificationCount((prevCount) => prevCount + 1);
        }
    const handleBellIconClick = () => {
        setNotificationCount(0);
        showNotificationMessage()
        togglePopup();
      };
      const togglePopup = () => {
        setShowPopup(!showPopup);
      };
      const closePopup = () => {
        setShowPopup(false);
      };

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
          currentpage: "ShowUsers",
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
  return (
    <div>
      <div className="notification" >
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
    </div>
  )
}

export default Udnotification
