import React,{useState,useEffect} from 'react';
import {SidebarStudentData} from './SidebarStudentData';
import {SidebarTeacherData} from './SidebarTeacherData';
import { Link } from 'react-router-dom';
//new link
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import {Drawer,Hidden,IconButton,List,ListItem,ListItemText,ListItemIcon,Toolbar,Avatar} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {  Route } from 'react-router-dom';
import Brightness4TwoToneIcon from '@material-ui/icons/Brightness4TwoTone';
import FlareTwoToneIcon from '@material-ui/icons/FlareTwoTone';

// for student 
import Profile from '../Pages/profile';
import RegistrationForm from '../Pages/student/registrationForm';
import Status from '../Pages/student/status';
import ChangePassword from '../Pages/changePassword';
 // for teacher
import AddNewUser from '../Pages/teacher/addNewUser';
import PendingRegistration from '../Pages/teacher/pendingRegistration';
import SearchUser from '../Pages/teacher/searchUser';
import axios from 'axios';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
toast.configure();




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title:{
   flexGrow: 1,
    
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height:"0px",
  },
}));

const Navbar=(props)=> {
  const [userData,setUserData]=useState({});
  const [appbarDark,setAppbar]=useState('secondary');
  const [profileColor,setColor]=useState('#3f51b5');
    const { windows } = props;
    const classes = useStyles();
    const theme = useTheme();
    const {setTheme}=props;
    const [darkTheme,setDarktheme]=useState("dark");
    setTheme(darkTheme);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
    const theming=()=>{
          if(darkTheme==='dark'){
            setDarktheme('light');
            setAppbar('primary');
            setColor('#3f51b5')
          }else{
            setColor('#3f51b5')
            setDarktheme('dark');
            setAppbar('secondary');
          }
    };
    
    useEffect(() => {
      // getting user details by api call
      axios.get(`/api/user/${localStorage.getItem('userId')}`)
        .then((data) => {
          // console.log(data.data.user);
          setUserData(data.data.user);
        });
    },[]);
	
	const handleSignout = () => {
    
		localStorage.removeItem('userId');
		localStorage.removeItem('userType');
		// reload the window after logout to return to app begin
		window.location.reload();
		return (toast.error("Logout Successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }));
	};
	if (props.isStudent)
	{
        const drawer = (
            
          <div>
          <div style={{
            display: "flex",
            flexDirection: 'row', alignItems: 'center', height: 100, justifyContent: 'space-around'
          }}>
            <Avatar
            alt="profile"
            src={userData.profile}
              style={{
                width: theme.spacing(7),
                height: theme.spacing(7),
                textTransform: "uppercase",
                background:profileColor
              }}>
              </Avatar>
            <div>
              <h1 style={{
                margin: 0, padding: 0, textTransform: "uppercase", fontFamily: 'emoji'
                  }}>{userData && userData.name}</h1>
                    <small style={{color:"darkgray"}}>{userData && userData.email}</small>
            </div>
            </div>
                
              
                
              <div className={classes.toolbar} style={{position:"absolute"}}/>
              
              <Divider/>
              
              <List>
                {SidebarStudentData.map((item, index) => (
                  <ListItem button component={Link}
                    key={index}
                    to={item.path} style={{marginTop : 10}}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                 </ListItem>
                ))}
              </List>
              <Divider />
            </div>
          );
        
          const container = windows!== undefined ? () => windows().document.body : undefined;
          return (
            <>
            <div className={classes.root}>
              <CssBaseline />
              <AppBar position="fixed" className={classes.appBar} color={appbarDark}>
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap className={classes.title} >
                    <Route path='/profile' exact  >Profile</Route>
                    <Route path='/' exact  >Registration</Route>
                    <Route path='/status'exact  >Status</Route>
                    <Route path='/changePassword' exact >Change Password</Route></Typography>
                  <IconButton component="span" onClick={theming}>
                      { darkTheme==="dark"  ?<Brightness4TwoToneIcon style={{color:"white"}} />:<FlareTwoToneIcon style={{color:"white"}} />}
                  </IconButton>
                  <Button  color="inherit" type="submit" onClick={handleSignout}>LogOut</Button>
                  
                </Toolbar>
              </AppBar>
              <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                  <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                      keepMounted: true, // Better open performance on mobile.
                    }}
                  >
                    {drawer}
                  </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                  <Drawer
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                  >
                    {drawer}
                  </Drawer>
                </Hidden>
              </nav>
              <main className={classes.content}>
                  
                <div className={classes.toolbar} />
                         <Route path='/' exact  render={() => <RegistrationForm appBar={appbarDark} />} />
                        <Route path='/changePassword' exact render={() => <ChangePassword appBar={appbarDark} />} />
                        <Route path='/profile' exact render={() => <Profile appBar={appbarDark} profileColor={profileColor} />}   />
                        <Route path='/status'exact render={() => <Status appBar={appbarDark} />}/>
                        
              </main>
            </div>
            </>
          );	
	}
	else
	{

		const drawer = (
      
            <div>
                
        <div style={{
          display: "flex",
          flexDirection: 'row', alignItems: 'center', height: 100, justifyContent: 'space-around'
        }}>
          <Avatar
          alt="profile"
          src={userData.profile}
            style={{
              width: theme.spacing(7),
              height: theme.spacing(7),
              backgroundColor: profileColor,
              textTransform: "uppercase"
            }}>
            </Avatar>
          <div>
            <h1 style={{
              margin: 0, padding: 0, textTransform: "uppercase", fontFamily: 'emoji'
                }}>{userData && userData.name}</h1>
                  <small style={{color:"darkgray"}}>{userData && userData.email}</small>
          </div>
          </div>
              <div className={classes.toolbar} style={{position:"absolute"}} />
              <Divider />
              <List>
                {SidebarTeacherData.map((item, index) => (
                  <ListItem button component={Link}
                    key={index}
                    to={item.path} style={{marginTop : 10}}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                 </ListItem>
                ))}
              </List>
              <Divider />
            </div>
          );
        
          const container = windows !== undefined ? () => windows().document.body : undefined;
          return (
            <>
            <div className={classes.root}>
              
              <CssBaseline />
              <AppBar position="fixed" className={classes.appBar} color={appbarDark}>
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap className={classes.title}>
                    <Route path='/profile' exact >Profile</Route>
                    <Route path='/addNewUser' exact  >Add New User</Route>
                    <Route path='/' exact  >Registration Form</Route>
                    <Route path='/search'exact  >Search</Route>
                    <Route path='/changePassword'exact  >Change Password</Route> 
                  </Typography>
                  <IconButton component="span" onClick={theming}>
                      { darkTheme==="dark"  ?<Brightness4TwoToneIcon style={{color:"white"}} />:<FlareTwoToneIcon style={{color:"white"}} />}
                  </IconButton>
                  <Button  color="inherit" type="submit" onClick={handleSignout}>LogOut</Button>
                </Toolbar>
              </AppBar>
              <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                  <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                      keepMounted: true, // Better open performance on mobile.
                    }}
                  >
                    {drawer}
                  </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                  <Drawer
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                  >
                    {drawer}
                  </Drawer>
                </Hidden>
              </nav>
              <main className={classes.content}>
                  
                <div className={classes.toolbar} />
                  
                <Route path='/' exact render={() => <PendingRegistration appBar={appbarDark} />} />
				<Route path='/profile' render={()=> <Profile appBar={appbarDark} profileColor={profileColor} /> } />
				<Route path='/addNewUser' render={()=> <AddNewUser appBar={appbarDark} /> }  />
				<Route path='/search' render={()=> <SearchUser appBar={appbarDark} />  } />
				<Route path='/changePassword' render={()=> <ChangePassword appBar={appbarDark} /> } />
                        
              </main>
            </div>
            </>
          );	
	}
};
export default Navbar;

