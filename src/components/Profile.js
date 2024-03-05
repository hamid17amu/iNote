import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";

const host = "http://localhost:5000";
const fetchInfo = async (setInfo)=>{
    const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authToken":localStorage.getItem('token')
        },
    });
        const res= await response.json();
        setInfo({name: res.name,email: res.email, timeStamp: res.timeStamp});
        // console.log(profile);
  }

const Profile = (props) => {

    const [info, setInfo] = useState({name: "", email:"", timeStamp:""});
    useEffect(() => {
        fetchInfo(setInfo);
    }, [])


  return (
    <div className='container mt-5'>
        <h4>Hello, {info.name}</h4>
        <h5>email: {info.email}</h5>
        <Link className='btn btn-primary m-2' to="/changepass">Change Password</Link>
    </div>
  )
}

export default Profile