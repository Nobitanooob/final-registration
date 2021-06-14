import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Button, Grid,Paper, TextField} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import "../../App.css";
import Spinner from './helper/spinner';
import {Storage} from '../../index';
import { Form, Formik } from 'formik';
const About = (props) => {
  let [user, setUser] = useState('');

  const [uploadedProfile,setUploadedProfile]=useState('Upload');
  const [uploadedFile, setFile] = useState();
  const [fileUrl, setUrl] = useState();
  const [disablebutton,setButton]=useState(false);
  useEffect(() => {
    // getting user details by api call
    axios.get(`/api/user/${localStorage.getItem('userId')}`)
      .then((data) => {
        //console.log(data.data.user);
        setUser(data.data.user);
      });
  },[]);

  const handleFile = async (uploaded) => {
    // const reader =   new FileReader();
    
    let file = uploaded[0]; 
    // if (file) {
    //   reader.onload = () => {
    //     if (reader.readyState === 2) {
          setFile(file);
    //       console.log(uploadedFile);
    //     }
    //   };
    //   reader.readAsDataURL(uploaded[0]);
    // } else {
    //   setFile(null);
    // };
    setButton(true);
  };


  


  const uploadToFirebase =  async() => {
    setUploadedProfile('uploading...');
      const fileRef = Storage.ref(`${user.email}/profile/${uploadedFile[0].name}`);
      await fileRef.put(uploadedFile);
       const url=await fileRef.getDownloadURL();
        setUrl(url);
        console.log(url);
        const users={
          id:`${localStorage.userId}`,
          profile:url
         };
         console.log(users);
    await axios.post(`/api/userdata`, users);

    
    
     
    
    window.location.reload();

};


  if (!user)
  {
    return <Spinner />
  }
  return (
    <Grid container item  >
        <Grid item xs={0} sm={1}/>
       <Grid xs={12} sm={10} style={{height:"83vh",width:"60vw"}}  item container direction="column">
         <Paper spacing={0} elevation={10} style={{height:"85vh"}}>
           {/* {console.log(user.profile)} */}

           <Grid container item xs={12} >
             <Grid xs={6} item container direction="column" style={{height:"60vh",display:"flex",justifyContent:"center",alignItems:"center",boxSizing:"bordrBox"}}>
                  {/* {console.log(user.profile)} */}
                  <Avatar
                  src={user && user.profile}
                  alt="profile photo"
                  style={{
                    height:'50%',
                    width:'50%',
                      marginBottom:"20px",
                      background:props.profileColor
                    }} >
                    </Avatar>
                     
                    <Formik >
            {(p) => (
              
              <Form>
                <input as={TextField}
                style={{marginBottom:"10px"}}
                onChange={(e)=>handleFile(e.target.files)}
                type="file"
                multiple
                    id="outlined-disabled"
                    variant="outlined"
                    accept="media_type"
                  />
                   {/* {console.log(p)} */}
                  
               
                 {!disablebutton?(
                  <Button
                  disabled
                  onClick={uploadToFirebase}
                    style={{marginBottom:"10px"}}
                    color={props.appBar}
                    variant="contained"
                  >{uploadedProfile} </Button>
                 ):(
                  <Button
                  onClick={uploadToFirebase}
                    style={{marginBottom:"10px"}}
                    color={props.appBar}
                    variant="contained"
                  >{uploadedProfile} </Button>
                 )}
                  
              </Form>
                
            )}
            </Formik>
             </Grid>
             <Grid xs={6} container  style={{display:"flex",height:"60vh",justifyContent:"center",alignItems:"center"}}>
             <Grid container>
            <Grid container  xs={12} style={{marginBottom:"20px"}}>
              <Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <h3 >
                            Name :
                  </h3>
              </Grid>
              <Grid item xs={6} style={{textTransform:"capitalize"}}>
              {user && user.name}
              </Grid>
            </Grid>
            {
              user && user.type==="student"?
              (
                <Grid container  xs={12} style={{marginBottom:"20px"}}>
                <Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <h3>
                              RollNo :
                    </h3>
                </Grid>
                <Grid item xs={6} >
                {user && user.rollno}
                </Grid>
              </Grid>
              ):null
            }
            <Grid container  xs={12} style={{marginBottom:"20px"}}>
              <Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <h3>
                            Email:
                  </h3>
              </Grid>
              <Grid item xs={6} >
              {user && user.email}
              </Grid>
            </Grid>
            <Grid container  xs={12} style={{marginBottom:"20px"}}>
              <Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                 <h3 >
                        Program :
                  </h3>
              </Grid>
              <Grid item xs={6} >
              {user && user.programme}
              </Grid>
            </Grid>
            <Grid container  xs={12} style={{marginBottom:"20px"}}>
              <Grid item xs={6}  style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <h3>
                            Department:
                  </h3>
              </Grid>
              <Grid  item xs={6} >
              {user && user.department}
              </Grid>
            </Grid>
            </Grid> 
               
             </Grid>
           </Grid>
        </Paper>
      </Grid>
      <Grid item xs={0} sm={1}/>
    </Grid>
  );
};
  
export default About;