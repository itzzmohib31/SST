import React from 'react'
import { useState,useEffect } from 'react'
import Sidebar from './Components/Sidebar'
import { TextField,Button} from '@mui/material'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const TestData={
    Title:'',
    Instructor:'',
    Subject:'',
    Date:new Date(),
    Batch:'',
    MaxMarks:'',
    Students:[],
}


const Tests = () => {







    const [batch, setbatch] = React.useState('');
    const [Row, setRow] = React.useState('');


    const handleChange = (event) => {
        let Edit=[]

      Students.filter((e)=>{
        if(e.Batch==event.target.value)
        {
            Edit.push(e);
        }
      })
      setRow(Edit);
    }

    

    const setMarks=(e,Std)=>{
        console.log(e.target.value);
        console.log(Std.Name);
        let found=false;
        TestData.Students.map((items)=>{
            if(items.Name==Std.Name)
            {
                found=true;
                items.Marks=e.target.value;
            }
        })
        if(found==false)
        {
            TestData.Students.push({id:Std._id,Name:Std.Name,Marks:e.target.value})
        }

        console.log(TestData);
    }

    const [Students,setStudents]=useState('');


    const columns = [
        {
          field: 'Name',
          headerName: 'Name',
          width: 150,
          editable: true,
          flex:1,
        },
        
        {
            flex:1,
            field: 'Marks',
            headerName: 'Marks',
            width: 150,
            renderCell:(cellValues)=>{return(
        
                <TextField type={'number'} onChange={(e)=>setMarks(e,cellValues.row)} style={{marginTop:'1rem'}}  id="outlined-basic" label="Marks" variant="outlined" />
             
            ) }
          },
      ];
      



    useEffect(()=>{


        let Options = {
            method:"GET",
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
          }
      
            fetch("/api/AddStudents", Options).then(res => {
              if (!res.ok) {
                throw Error('Failed To Fetch');
              }
              return res.json();
            }).then(data => {
            setStudents(data.students)
            }).catch(err => {
             console.log(err.message);
            });
    
    
    
    
     },[])


     const TitleChangeHandler=(e)=>{
        TestData.Title=e.target.value;
     }
     const BatchChangeHandler=(e)=>{
        TestData.Batch=e.target.value;
     }
     const SubjectChangeHandler=(e)=>{
        TestData.Subject=e.target.value;
     }
     const InstructorChangeHandler=(e)=>{
        TestData.Instructor=e.target.value;
     }
     const MaxMarksChangeHandler=(e)=>{
        TestData.MaxMarks=e.target.value;
     }


     const TestSubmitHandler=(e)=>{

        e.preventDefault();

        let Options = {
            method:"POST",
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
            body:JSON.stringify(TestData)
          }
      
            fetch("/api/AddTests", Options).then(res => {
              if (!res.ok) {
                throw Error('Failed To Fetch');
              }
              return res.json();
            }).then(data => {
            console.log(data)
            }).catch(err => {
             console.log(err.message);
            });


            //ADD TEST TO STUDENTS

            TestData.Students.forEach((e)=>{

              let Data={
                Title:TestData.Title,
                Instructor:TestData.Instructor,
                Subject:TestData.Subject,
                date:new Date(),
                Batch:TestData.Batch,
                MaxMarks:TestData.MaxMarks,
                ObtainedMarks:e.Marks
              }
      
             
      
      
      
              let MYOptions = {
                method:"PUT",
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                },
                body:JSON.stringify({Name:e.Name,items:Data})
      
              }
          
                fetch("/api/Queries", MYOptions).then(res => {
                  if (!res.ok) {
                    throw Error('Failed To Fetch');
                  }
                  return res.json();
                }).then(data => {
                console.log(data)
                }).catch(err => {
                 console.log(err.message);
                });
      
      
              
      
      
      
            })




     }

  return (
    <div>
    <Sidebar></Sidebar>


    

   <form onSubmit={TestSubmitHandler} style={{marginLeft:'30rem',display:'flex',flexDirection:'column',width:'30%',margin:'auto'}}   >

   


   <TextField style={{marginTop:'1rem'}} onChange={TitleChangeHandler}  id="outlined-basic" label="Title" variant="outlined" />
   <TextField style={{marginTop:'1rem'}} onChange={BatchChangeHandler} id="outlined-basic" label="Batch" variant="outlined" />
   <TextField style={{marginTop:'1rem'}} onChange={SubjectChangeHandler} id="outlined-basic" label="Subject" variant="outlined" />
   <TextField style={{marginTop:'1rem'}} onChange={InstructorChangeHandler}  id="outlined-basic" label="Created By" variant="outlined" />
   <TextField type={'number'} style={{marginTop:'1rem'}} onChange={MaxMarksChangeHandler}  id="outlined-basic" label="Max Marks" variant="outlined" />




   <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Batch</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={batch}
          label="Batch"
          onChange={handleChange}
        >
          <MenuItem value={'IX'}>IX</MenuItem>
          <MenuItem value={'X'}>X</MenuItem>
          <MenuItem value={'XI'}>XI</MenuItem>
          <MenuItem value={'XII'}>XII</MenuItem>

        </Select>
      </FormControl>
    </Box>


   <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={Row}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>

   <Button className='submitbtn' type={'submit'} value='Add Student' variant="contained">Add Test</Button>

   </form>

</div>


  )
}

export default Tests;