import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';

const Login = (props) => {

    const [cred, setCred] = useState({email: "", password:""})


    const onChange = ({ target }) => {
        setCred({ ...cred, [target.name]: target.value });
      };

    let nav = useNavigate();

    const host = "http://localhost:5000"
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: cred.email, password: cred.password}), 
        });

        const json = await response.json();
        console.log(json);

        if(json.success){
        localStorage.setItem('token', json.authToken);
        nav("/");
        props.showAlert("Welcome to iNotes", "success");

        }
        else{
        props.showAlert("Invalid Credentials", "danger");
        }
              
    }
  return (
    <div className='mt-3'>
        <h2>Login to iNotes</h2>
    <form  onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={cred.email} onChange={onChange}/>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' value={cred.password} onChange={onChange}/>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
  )
}

export default Login