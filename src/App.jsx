import React, { useState } from 'react';
import { PageLayout } from './components/PageLayout';
import { msalConfig,loginRequest } from './config.js';
// import { callMsGraph } from './graph';
// import { ProfileData } from './components/ProfileData';
import { Sidebar } from './components/Sidebar';
import { Home } from "./components/Home";
// import { Fingerscan } from './components/Fingerscan';
import { Footer } from "./components/Footer";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ShowUsers from './components/pages/ShowUsers';
// import RoleConfig from './components/pages/RoleConfig';
import './App.css';

/**
* Renders information about the signed-in user or a button to retrieve data about the user
*/ 
import * as Msal from 'msal';
// import Notification1 from './components/pages/Notification/Notification1.jsx';
import Customer from './components/pages/Customer/Customer.jsx';
// import Customer1 from './components/pages/Customer/Customer1.jsx';
// import FinalCust from './components/pages/Customer/FinalCust.jsx';
// import Demo from './components/pages/Customer/Demo.jsx';
 
// Initialize MSAL application object
const userAgentApplication = new Msal.UserAgentApplication(msalConfig);
 
// Function to get access token
 export const getAccessToken = async () => {
    try {
            const response = await userAgentApplication.acquireTokenSilent(loginRequest);
            console.log('Access Token:', response.accessToken);
            return response.accessToken;
        }
     catch (error) {
        console.error('Failed to get access token:', error);
        throw new Error('Failed to get access token');
    }
};

const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    // const [graphData, setGraphData] = useState(null);
    const [showProfile, setShowProfile] = useState(true); // Initially show profile
    const [showContent, setShowContent] = useState(false);
    const [showProceedButton, setShowProceedButton] = useState(true);
      const toggleContent = () => {
        setShowProfile(false); // Hide profile
        setShowContent(!showContent); // Toggle content
        setShowProceedButton(false); // Hide the Proceed button
      };

    return (
        <div id="main">
        <>
     <BrowserRouter> 
       <Routes>
       <Route path="/"  element={<><Home /><Sidebar /><Footer /></>} />
       <Route path="/home" element={<><Home /><Sidebar /> <Footer /></>}/>
       {/* <Route path="/fingerscan" element={<><Fingerscan/><Sidebar /> <Footer /></>}/> */}
       {/* <Route path="/showuser" element={<><ShowUsers /><Sidebar /><Footer /></>}/> */}
       {/* <Route path="/roleconfig" element={<><RoleConfig /><Sidebar /><Footer /></>}/>  */}
       {/* <Route path="/Notification" exact element={<><Notification1/></>}/>  */}
       <Route path="/Customer" exact element={<><Sidebar /><Customer/></>}/> 
       {/* <Route path="/Demo" exact element={<><Sidebar /><Demo/></>}/>  */}
       </Routes>
     </BrowserRouter>
        </>
       
    </div>
    );
};

/**
* If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
*/
const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
                
            </AuthenticatedTemplate>
    
            <UnauthenticatedTemplate>
                <h5>
                    {/* <center>
                        Please sign-in to see your profile information.
                    </center> */}
                </h5>
            </UnauthenticatedTemplate>
        </div>
    );
};
    
export default function App() {

    return (
        <PageLayout>
            <center>
                <MainContent />
             </center>
        </PageLayout>
    );
}