import React from 'react'
import { Link } from "react-router-dom";
import { mutate } from "swr";


import '../App.css';

export default function Register() {

  const [email, setEmail] = React.useState("")
  const [inputEmail, setInputEmail] = React.useState(false)
  const [isValidEmail, setIsValidEmail] = React.useState(false)
  const [password, setPassword] = React.useState("")
  const [inputPassword, setInputPassword] = React.useState(false)
  const EmailForm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const [confpass, setConfpass] = React.useState("")
  const [inputconfpass, setInputConfpass] = React.useState(false)
  const [iscorrespond, setIsCorrespond] = React.useState(false)


  const users = [];
  async function getAllUsers() {
    let users = []
    let apiUrl = `http://localhost:5000/api/v1/users`;
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
            users = data
          }
          )
      )
      return users
    }
    catch (e) { }
  }

  async function addUser() {
    let users = await getAllUsers()
    if (users.some((el) => el.email === email)) {
      alert('used email')
    }
    else {
      let apiUrl = `http://localhost:5000/api/v1/addUser`;
      try {
        mutate(
          apiUrl,
          await fetch(apiUrl, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              "email": email,
              "password": password
            })
          })

            .then((response) => response.json())
            .then((data) => {
              console.log(data.status);
              if (data=== "ok") {
                alert("user added with success")
              }
              if (data.error) {
                throw Error("Error!");
              }



            }
            )
        )
      }
      catch (e) { }
    }
  }




  async function validation() {

    if (email === "") {
      setInputEmail(true)
    }
    if (password === "") {
      setInputPassword(true)
    }

    if (!EmailForm.test(email) && email !== "") {
      setIsValidEmail(true)
    }
    if (confpass === "") {
      setInputConfpass(true)

    }
    else if (confpass != password) {
      setIsCorrespond(true)
    }
    if (email !== "" && password !== "" && confpass !== "" && confpass == password && EmailForm.test(email)) {
 await addUser()
    }
     

  }


  return (
    <div className='Register'>
      <h1>Registration</h1>
      <div className='input-box mb-2 d-flex flex-column'>
        <label>Email</label>
        <input type="email" name='Email' value={email} onChange={(e) => {
          setEmail(e.target.value);
          setInputEmail(false);
          setIsValidEmail(false)
        }} /></div>
      {isValidEmail ? <div style={{ color: 'red', textAlign: 'left' }}>email address don't match</div> : null}
      {inputEmail ? <div style={{ color: 'red', textAlign: 'left' }}>Please insert your email</div> : null}

      <div className='input-box mb-2 d-flex flex-column'>
        <label>Password</label>
        <input type='password' name='password' value={password} onChange={(e) => {
          setPassword(e.target.value);
          setInputPassword(false)
        }} />
        {inputPassword ? <div style={{ color: 'red', textAlign: 'left' }}>Please insert your password</div> : null}
      </div>
      <div className='input-box mb-2 d-flex flex-column'>
        <label>Confirm Password</label>
        <input type='password' name='confpass' value={confpass} onChange={(e) => {
          setConfpass(e.target.value);
          setInputConfpass(false);
          setIsCorrespond(false)
        }} />
        {inputconfpass ? <div style={{ color: 'red', textAlign: 'left' }}>Must confirm your password</div> : null}
        {iscorrespond ? <div style={{ color: 'red', textAlign: 'left' }}>password didn't correspond</div> : null}

      </div>
      <button type='sumbit' onClick={validation}>Register</button>
      <div className="login-link">
        <p>Already have an account?</p>
        <Link to='/'>Login</Link>
      </div>
    </div>


  )
}


