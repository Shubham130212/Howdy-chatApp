import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import robot from "../assets/robot.gif";

const Welcome=({currentUser})=> {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);

  return (
    <container>
      <img src={robot} alt="robot"/>
      <h1>Welcome,<span>{currentUser.username}!</span></h1>
      <h3>Please select a chat to start chat</h3>
    </container>
  )
};

const container=styled.div`
display: flex;
justify-content: center;
align-items: center;
color: white;
flex-direction: column;
img {
  height: 20rem;
}
span {
  color: #4e0eff;
}
`;


export default Welcome;
