import * as React from 'react';
import {useEffect} from 'react';
import TextField from '@mui/material/TextField';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import axios from 'axios'

function BookedRequests() {


  const [bookings, setBookings] = React.useState([])
  const [payload, setPayload] = React.useState({})
  const [expanded, setExpanded] = React.useState(false);


    useEffect(()=>{
      getBookingsData().then(response=>{
        if(response&&response.data){
          setBookings([...response.data])
        }
      })
    }, [])

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const getBookingsData = ()=>{
      return axios.get(process.env.REACT_APP_API_HOST+':'+process.env.REACT_APP_API_PORT+'/api/appointment')
        .then(function (response) {
          console.log(response);
          return response
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    const fullfillBooking = (id)=>{
      return axios.put(process.env.REACT_APP_API_HOST+':'+process.env.REACT_APP_API_PORT+'/api/appointment/fullfill/'+id)
        .then(function (response) {
          console.log(response);
          return response
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  return (
    <div className="booked-requests" style={{width:'80%'}}>
        
      <div className="detailed-form" 
       style={{background:'white', color: 'black', padding: '10%'}} >

         {bookings.map(booking=>{
           return  <Accordion expanded={expanded === booking._id} onChange={handleChange(booking._id)}>
           <AccordionSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1bh-content"
             id="panel1bh-header"
           >
             <Typography sx={{ width: '33%', flexShrink: 0 }}>
               {booking.name}
             </Typography>
             <Typography sx={{ color: 'text.secondary' }}>{booking.email}</Typography>
           </AccordionSummary>
           <AccordionDetails>
             <Typography style={{textAlign:'left'}}>
              <p><b>Message : </b>{booking.message}</p>
              <p><b>Name : </b>{booking.name}</p>
              <p><b>Mobile : </b>{booking.mobile}</p>
              <p><b>Email : </b>{booking.email}</p>
             </Typography>

             {booking.image&&<div>
             <img
                src={booking.image}
                alt={'payment'}
                width="500px"
                heigth="600px"
              />
             </div>}
             <Button fullWidth variant="contained" onClick={()=>fullfillBooking(booking._id)}>Submit</Button>
           </AccordionDetails>
         </Accordion>
         })}
        

    
        <br/><br/>
        


      </div>
    </div>
  );
}

export default BookedRequests;
