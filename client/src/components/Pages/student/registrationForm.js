import React, { useEffect, useState } from 'react';
import {Grid,Paper } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Select , MenuItem} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import * as Yup from 'yup';
import {Storage} from "../../../index";
import Notification from '../../toasts'

import { v4 as uuidv4 } from 'uuid';

  
const RegistrationForm=(props) =>{
  const [user, setUser] = useState();
  const [uploadedFile, setFile] = useState(null);
  const [fileUrl, setUrl] = useState();
  const [semester, setSemester] = React.useState('');
  const [buttonText,SetButtonText] = useState("Submit")

  useEffect(() => {
    axios.get(`/api/user/${localStorage.userId}`)
      .then((data) => {
        // console.log('user data', data.data.user);
        setUser(data.data.user);
      });
   }, []);

  const handleFile = async (uploaded) => {
    
    let file =await uploaded[0]; 
    
          await setFile(file);
       
    
  };
  
 
  const initialValues={
    // name: '', email: '', department: '',programme:""
  };
  const validationSchema=Yup.object({
    // name: Yup.string().required('Required'),
    // email: Yup.string().email('Invalid email address').required('Required'),
    // department: Yup.string().required('Required'),
    // programme: Yup.string().required('Required'),
  });
  const onSubmit = async (value, { resetForm }) => {
    SetButtonText("Submitting ...");
    try {
      const semesterData={
        semester:semester,
        id:`${localStorage.userId}`
      }
      const sem=await axios.post('api/student/forms/semester',semesterData);

      if(sem.data.status){
        const fileRef = await Storage.ref(`${localStorage.userId}/forms/${semester}/${uuidv4()}`);
        await fileRef.put(uploadedFile);
      const url=await fileRef.getDownloadURL()
        await setUrl(url);
      }
     
      
     let form = {
       name: user.name,
       email: user.email,
       department: user.department,
       programme: user.programme,
       semester: semester,
       fileUrl: fileUrl
     };
     console.log(fileUrl);
     let data = await axios.post(`/api/student/uploadForm/${localStorage.userId}`, form);

     SetButtonText('submit');
     setSemester('');
     resetForm();
     data.data.isSubmit && Notification('success', data.data.message);
     !data.data.isSubmit && Notification('fail', data.data.message); 
     
   } catch (error) {
     console.log(error);
       Notification('fail', error); 
   }
  };


  
 const paperStyle={
    padding:20,
    height:'auto',
    width: '40vw',
    margin:'20px auto'
  };
  const handleChange = (event) => {
    setSemester(event.target.value);
  };
  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle} >
              <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(p) => (
              
              <Form>
               
                <Field as={TextField}
                  name="name"
                  style={{textTransform:"capitalize",marginBottom:"10px"}}
                  label={user && user.name}
                    disabled
                    fullWidth
                    id="outlined-disabled"
                    variant="outlined"
                  />
                   
                  <Field as={TextField}
                  name="email"
                  style={{marginBottom:"10px"}}
                  label={user && user.email}
                    disabled
                    fullWidth
                    id="outlined-disabled"
                    defaultValue={user && user.email}
                    variant="outlined"
                  />
                  <Field as={TextField}
                  name="email"
                  style={{marginBottom:"10px"}}
                  label={user && user.rollno}
                    disabled
                    fullWidth
                    id="outlined-disabled"
                    variant="outlined"
                  />
                  <Field as={TextField}
                  name="programme"
                  style={{textTransform:"uppercase",marginBottom:"10px"}}
                  label={user && user.programme}
                    disabled
                    fullWidth
                    id="outlined-disabled"
                    variant="outlined"
                  />
                  <Field as={TextField}
                  name="email"
                  style={{marginBottom:"10px"}}
                  label={user && user.department}
                    disabled
                    fullWidth
                    id="outlined-disabled"
                    variant="outlined"
                  />
               
                <FormControl fullWidth variant="outlined" style={{marginBottom:"10px"}}>
                  <InputLabel htmlFor="semester" id="demo-simple-select-label">Semester</InputLabel>
                  <Select 
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    name = "semester"
                    value={semester}
                    label="semester"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>

                    {/* <option aria-label="None" value="" />
                    <option value="1" >1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value= "8">8</option> */}
                  </Select>
                </FormControl>
                 <input
                  onChange={(e)=>handleFile(e.target.files)}
                    id="contained-button-file"
                    type="file"
                    style={{marginBottom:"10px"}} />
                  <label htmlFor="contained-button-file">
                    
                </label>
                <br />
                <small style={{marginBottom : '5px'}}>*NOTE* Please upload the <strong>pdf format as name_rollno.pdf</strong></small>
                <br />
                <small style={{marginBottom : '10px'}}>*NOTE* Upload all the recipts in one pdf</small>
                  <Button
                    type="submit"
                    style={{marginBottom:"10px"}}
                    color={props.appBar}
                    variant="contained"
                    fullWidth
                  >{ buttonText }</Button>
              </Form>
                
            )}
            </Formik>
        </Paper>
      </Grid>
      </div>
  );
}


export default RegistrationForm;



