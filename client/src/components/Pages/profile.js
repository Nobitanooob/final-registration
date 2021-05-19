import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Grid,Paper} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import "../../App.css";
import Spinner from './helper/spinner';

const About = () => {
  let [user, setUser] = useState('');

  useEffect(() => {
    // getting user details by api call
    axios.get(`/api/user/${localStorage.getItem('userId')}`)
      .then((data) => {
        //console.log(data.data.user);
        setUser(data.data.user);
      });
  },[]);
  if (!user)
  {
    return <Spinner />
    // return <div>No user found!!</div>
  }
  return (
    <Grid container item width="auto">
       <Grid item xs={0} sm={2}/>
      <Grid xs={12} sm={8}  item container direction="column">
        <Paper spacing={4} elevation={10}>
        <Grid container style={{marginBottom:"20px"}}>
            <Grid xs={3} item />
            <Grid item xs={6} style={{display:"flex",justifyContent:"center"}}>
              <Avatar
              style={{
                height:'100px',
                width:'100px',
                backgroundColor: '#3f51b5',
                textTransform: "uppercase"
              }}>
              {user && user.name && user && user.name.charAt(0)}
              </Avatar>
            </Grid>
            <Grid xs={3} item />
            
            </Grid>
            <Grid container>
            <Grid container xs={12} style={{marginBottom:"20px"}}>
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
                <Grid container xs={12} style={{marginBottom:"20px"}}>
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
            <Grid container xs={12} style={{marginBottom:"20px"}}>
              <Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <h3>
                            Email:
                  </h3>
              </Grid>
              <Grid item xs={6} >
              {user && user.email}
              </Grid>
            </Grid>
            <Grid container xs={12} style={{marginBottom:"20px"}}>
              <Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                 <h3 >
                        Program :
                  </h3>
              </Grid>
              <Grid item xs={6} >
              {user && user.programme}
              </Grid>
            </Grid>
            <Grid container xs={12} style={{marginBottom:"20px"}}>
              <Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <h3>
                            Department:
                  </h3>
              </Grid>
              <Grid  item xs={6} >
              {user && user.department}
              </Grid>
            </Grid>
            </Grid>
            
        </Paper>
      </Grid>
      <Grid item xs={0} sm={2}/>
    </Grid>
  );
};
  
export default About;