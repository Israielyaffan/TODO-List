import React, { useImperativeHandle, useState } from "react";
import styled from "styled-components";
import image from  "./logo.png";
import TodoList from "./TodoList";
import Wall from "./Wall";
function LandingPage() {
  const [logged,setLogged]=useState(false)
  const [user,setUser]=useState()
  const clickHandler=()=>
  {
    setLogged(true)
  }
  return (
   !logged? <LogIn>
      <LogDiv>
        <Logo>
        <Image  src={image}></Image>
        <Heading>Facebook helps you connect and <br></br>share with the people in your life.</Heading>
        </Logo>
        <FormDiv>
          <Form>
            <div >
            <InputBox onChange={(e)=>{setUser(e.target.value)}}/>
            </div>
            <div>
            <input/>
            </div>
            <button onClick={()=>{clickHandler()}}>Log In</button>
            <a href="#">Forgot Password ?</a>
          </Form>
        </FormDiv>
      </LogDiv>
      
      <div></div>
    </LogIn>:<TodoList user={user}></TodoList>
  );
}

export default LandingPage;


const LogDiv=styled.div `
display: flex;
gap: 5vw;
height: 68vh;
background-color: #f0f2f5;

`;
const Logo=styled.div`
margin-left: 3vw;
margin-top: 21vh;
`;
const Heading=styled.h2`
font-size: 24px;
font-family: Arial, Helvetica, sans-serif;
font-weight: lighter;
`
const FormDiv=styled.div`
background-color: white;
justify-content: center;
text-align: center;
border-radius: 10px;
margin-top: 12vh;
height: 10vh;
padding: 10px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const Form=styled.form`
display: flex;
flex-direction: column;

`;

const InputBox=styled.input`
width: 20vw;
height: 2vw;
border-radius: 8px;
`;

const LogIn=styled.div`
display:flex;
flex-direction: column;
`;
const Image=styled.img`
height: 4.9vh;

`;