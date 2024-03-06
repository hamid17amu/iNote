import React, {useEffect, useState, useContext} from 'react'
import {Link} from "react-router-dom";
import DP from "./img.jpg"
import noteContext from "../context/Notes/NoteContext";


const Profile = () => {
  const context = useContext(noteContext);
  const {setProgress} = context;

    const host = process.env.REACT_APP_HOST;

    const [info, setInfo] = useState();

      const fetchInfo = async ()=>{
      setProgress(10);
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authToken":localStorage.getItem('token')
            },
        });
      setProgress(70);
        const res= await response.json();
        setInfo({name: res.name,email: res.email, timeStamp: res.timeStamp});
          setProgress(100);
        // console.log(profile);
      }
    
        useEffect(() => {
            fetchInfo();
            //eslint-disable-next-line
        }, [])

  return (
    <>
    {info  && <div className='container mt-5 text-center'>
        <img src={DP} class="rounded" alt="" className='DP'/>
        <h4>Hello, {info.name}</h4>
        <h5>email: {info.email}</h5>
        <h5>Account created on: {info.timeStamp}</h5>

        <Link className='btn btn-primary m-2' to="/changepass">Change Password</Link>
    </div>}
    </>
  )
}

export default Profile