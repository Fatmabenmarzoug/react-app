import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { mutate } from "swr";

import Register from './Register';

import '../App.css';

export default function Login() {
  const [email, setEmail] = React.useState("")
  const [inputEmail, setInputEmail] = React.useState(false)
  const [isValidEmail, setIsValidEmail] = React.useState(false)
  const [password, setPassword] = React.useState("")
  const [inputPassword, setInputPassword] = React.useState(false)

  const EmailForm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  
async function fetchUser(){
  let apiUrl = `http://localhost:5000/api/v1/client?email=${email}&password=${password}`;
  try {
    mutate(
        apiUrl,
        await fetch(apiUrl, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
              console.log(data.status);
              if(data.status===200){
                alert("ok")
              }
              else{
                alert("user not found")
              }
                if (data.error) {
                    throw Error("Error!");
                }

               
            })
    );
} catch (e) {}

}

  async function validation() {

   if (email === "") {
     setInputEmail(true)
    }
  if (password === "") {
     setInputPassword(true)
    }

  if (!EmailForm.test(email) && email!=="") {
     setIsValidEmail(true)
    }


    if (email!=="" && password!=="" && EmailForm.test(email) ) {
      await fetchUser()
      
    }
    
  }
  return (

    // <form>
      <div className='login'>
        <h1>Login Page</h1>
        <div className='input-box mb-2 d-flex flex-column'>
          <label>Email</label>
          <input type="email" name='Email' value={email} onChange={(e) => { setEmail(e.target.value) ;
            setInputEmail(false);
            setIsValidEmail(false)
          }} /></div>
          {isValidEmail?<div style={{color:'red',textAlign:'left'}}>email address don't match</div>:null}
          {inputEmail?<div style={{color:'red',textAlign:'left'}}>Please insert your email</div>:null}

        <div className='input-box mb-2 d-flex flex-column'>
          <label>Password</label>
          <input type='password' name='password' value={password} onChange={(e) => { setPassword(e.target.value);
            setInputPassword(false)
           }} />
          {inputPassword?<div style={{color:'red',textAlign:'left'}}>Please insert your password</div>:null}

        </div>
        <button type='sumbit' onClick={validation}>Login</button>
        <div className="register-link">
          <p>Don't have an account?</p>
          <Link to='/Register'>Create Account</Link>


        </div>

      </div>
      // </form>




  )
}