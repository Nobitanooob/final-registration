import React, { useState, useEffect } from "react";
import PageRoutes from "./PageRoutes";
import Login from "./components/login";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [userId, setUserId] = useState("");
  const [darkTheme,setDarktheme]=useState("dark");
  const theme = createMuiTheme({
    palette:{
      type:darkTheme,
    }
  });
  useEffect(() => {
   
    if (localStorage.getItem('userId'))
    {
      setUserId(localStorage.getItem('userId'));
      setIsLoggedIn(true);
      (localStorage.getItem('userType')==='student')?setIsStudent(true):setIsStudent(false);
    }
    //console.log('use effect called!!');
    //console.log('userId', userId);
  }, [userId]);


  const handleIsLogin = (e) => {
    setIsLoggedIn(e);
    //console.log("is login",isLoggedIn);
  };
  const handleIsStudent = (e) => {
    setIsStudent(e);
    //console.log("isStudent is",isStudent);
  };
  const handleUser =  (id) => {
      setUserId(id);
    //console.log("id is",userId);
  };

  if (!isLoggedIn) {
    return (
      <ThemeProvider theme={theme}>
      
        <Login
        handleUser={handleUser}
        handleIsLogin={handleIsLogin}
        handleIsStudent={handleIsStudent}
        isStudentState={isStudent}
        />  
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Paper >
        <PageRoutes isStudent={isStudent} setTheme={setDarktheme} userId={userId}  />
        </Paper>
      </ThemeProvider>
      );
  } 

}

export default App;