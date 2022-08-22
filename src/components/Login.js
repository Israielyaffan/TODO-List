import axios from "axios";
import React, { useRef, useState } from "react";
import Loader from "./Loader";
import styled from "styled-components";
import TodoList from "./TodoList";

function Login() {
  const user1 = useRef();
  const pass1 = useRef();
  const [name,setName] = useState("");
  const [openApp,setOpenApp]=useState(false)
  const logHandler = (e) => {
    
    axios
      .post("http://127.0.0.1:3001/login", {
        email: user1.current.value
      })
      .then((res) => {
       if (res.data.isVerified)
          {  setName(res.data.name)
            console.log(res.data);
            setOpenApp(true)
          }
          else
          alert("Email is not verified")
      });
  };
  return (
    <div>
    {!openApp?<><SignUpForm>
      {" "}
      <label className="form-label">Verified Email</label>
      <input className="inputField"
        type="text"
        placeholder="Enter your verified Email"
        ref={user1}
      ></input>
       <label className="form-label">Password</label>
       <input className="inputField"
        type="password"
        placeholder="Enter your password"
        ref={pass1}
      ></input>
      <LogInButton onClick={()=>{logHandler()}}> Open my To DO</LogInButton>
    </SignUpForm></>:<><TodoList user={name}></TodoList></>}
    </div>
  );
}

export default Login;

const SignUpForm = styled.div`

  color: black;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 50%;
  padding: 10px;
`;

const LogInButton = styled.button`
  padding: 6px 10px;
  border: 2px solid #92a8d1;
  margin-left: 3.5%;
  margin-top: 1vh;
  width: 30%;
  padding: 10px;
  border-radius: 8px;

  :hover {
    background-color: #92a8d1;
  }
  ::before {
    background-color: #92a8d1;
  }
`;
