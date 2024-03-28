// import * as React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import MenuIcon from '@mui/icons-material/Menu';
// import ListItem from '@mui/material/ListItem';
// // import ListItemButton from '@mui/material/ListItemButton';
// // import ListItemIcon from '@mui/material/ListItemIcon';
// import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
// import ListItemButton from '@mui/material/ListItemButton';
// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import { useNavigate } from 'react-router-dom';
// // import UserProfile from '../Assests/my pic.png';
// import UserProfile from '../images/avatar.png';
// import People from '@mui/icons-material/People';
// import PermMedia from '@mui/icons-material/PermMedia';
// import Dns from '@mui/icons-material/Dns';
// import Public from '@mui/icons-material/Public';

// const data = [
//   { icon: <People />, label: 'Authentication' },
//   { icon: <Dns />, label: 'Database' },
//   { icon: <PermMedia />, label: 'Storage' },
//   { icon: <Public />, label: 'Hosting' },
// ];

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });
// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));


// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );


// export const Sidenav = () => {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(true);
//   const navigate = useNavigate();

//   // const handleDrawerOpen = () => {
//   //   setOpen(true);
//   // };

//   // const handleDrawerClose = () => {
//   //   setOpen(false);
//   // };
//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={() => setOpen(!open)}>
//             {theme.direction === 'rtl' ? <CloseIcon /> : <MenuIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           <div>
//             <h4 className="brand">
//               <h1 className='brandtext'><span className='span'>NTAP</span><i className="bi bi-bar-chart-fill"></i></h1>
//             </h4>
//             <div className='FingerUser-details'>
//               <img src={UserProfile} alt='' className='Userprofile' />
//               <div>
//                 <strong>DevaKalyan</strong>
//               </div>
//               <div>
//                 devakalyan@xencia.com
//               </div>
//             </div>
//           </div>
//           <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/") }}>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? 'initial' : 'center',
//                 px: 2.5,
//               }}
//             >
//               <HomeOutlinedIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : 'auto',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <InboxIcon />
//               </HomeOutlinedIcon>
//               <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/Fingerscan") }}>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? 'initial' : 'center',
//                 px: 2.5,
//               }}
//             >
//               <FingerprintOutlinedIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : 'auto',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <InboxIcon />
//               </FingerprintOutlinedIcon>
//               <ListItemText primary="Fingerscan" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/ShowUsers") }}>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? 'initial' : 'center',
//                 px: 2.5,
//               }}
//             >
//               <PeopleAltIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : 'auto',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <InboxIcon />
//               </PeopleAltIcon>
//               <ListItemText primary="ShowUsers" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/RoleConfig") }}>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? 'initial' : 'center',
//                 px: 2.5,
//               }}
//             >
//               <ManageAccountsIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : 'auto',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <InboxIcon />
//               </ManageAccountsIcon>
//               <ListItemText primary="RoleConfig" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>

//           {/* listitemsecondary */}
//           <ListItemButton
//                 alignItems="flex-start"
//                 onClick={() => setOpen(!open)}
//                 sx={{
//                   px: 3,
//                   pt: 2.5,
//                   pb: open ? 0 : 2.5,
//                   '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
//                 }}
//               >
//           <ListItemText
//                   primary="Build"
//                   primaryTypographyProps={{
//                     fontSize: 15,
//                     fontWeight: 'medium',
//                     lineHeight: '20px',
//                     mb: '2px',
//                   }}
//                   secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
//                   secondaryTypographyProps={{
//                     noWrap: true,
//                     fontSize: 12,
//                     lineHeight: '16px',
//                     color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
//                   }}
//                   sx={{ my: 0 }}
//                 />
//                 <KeyboardArrowDown
//                   sx={{
//                     mr: -1,
//                     opacity: 0,
//                     transform: open ? 'rotate(-180deg)' : 'rotate(0)',
//                     transition: '0.2s',
//                   }}
//                 />
//               </ListItemButton>
//         </List>

//       </Drawer>
//     </Box>
//   )
// }
