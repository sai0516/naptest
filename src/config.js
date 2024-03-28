import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */

export const msalConfig = {
    auth: {
        // clientId: "73c2abaa-f13a-415c-aa1a-7cce420f85b0",
        clientId: "5c48be4f-a149-4f9f-99c9-c6a7f424adef",
        authority: "https://login.microsoftonline.com/683a5d14-ffcf-434b-a4eb-6d04bc83d7a8",
        redirectUri: "http://localhost:3000",
        // redirectUri: "https://172.206.43.214",
        
        
      
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level, message, containsPii) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }	
            }	
        }	
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: ['api://5c48be4f-a149-4f9f-99c9-c6a7f424adef/Files.Read'],
    // scopes: ["User.Read"],
    loginHint: "admin@M365x70282966.onmicrosoft.com" // or your login hint if needed
    // loginHint: localStorage.getItem('username') ,
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
const API_BASE_URL = "https://ntapadminapidev.azurewebsites.net//Home";
// const API_CALL_URL = "https://ntapadminapi.azurewebsites.net/CustomerAdminNTAP";
const API_ENDPOINTS = {
  // Define your API endpoints here
  GET_USERS: "/getuserlist",
  ADD_ADUSER: "/AddADUser",
  UPDATE_ADUSER:"/UpdateADUser",
  EDIT_USER: "/EditUser",
  GET_ROLE: "/getrolelist",
  EDIT_ROLE:"/EditRole",
  EDIT_CUSTOMER: "/EditCustomer",
};

export { API_BASE_URL, API_ENDPOINTS };