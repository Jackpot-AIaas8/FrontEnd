import React from "react";
import styled from "styled-components";
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

const Button = () => {
    const topClick = () => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    };
    const chatClick = () => {

    };
    return (
        <>
            <StyledWrapper>
                <button onClick={topClick} style={{marginRight: "50px"}}>
                    <div className="arrow-up"/>
                </button>
                <button onClick={chatClick}>
                    <HeadsetMicIcon style={{color: "white"}}/>
                </button>
            </StyledWrapper>
        </>
    );
};

const StyledWrapper = styled.div`
  button {
    width: 45px;
    height: 45px;
    bottom: 45px;
    right: 40px;
    background-color: #004dff;
    color: #FFF;
    border-radius: 50px;
    text-align: center;
    font-size: 30px;
    box-shadow: 2px 2px 3px #999;
    z-index: 1000;
    border: #004dff;
    transition: 0.5s;
    position: fixed;
  }

  button:hover {
    transform: scale(1.1);
  }

  button:active {
    background-color: #020cd1;
  }

  .arrow-up {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    margin: 35% auto 60%;
    border-bottom: 15px solid white;
  }

  .chat-bot {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    margin: 35% auto 60%;
    border-bottom: 15px solid white;
  }
`;

export default Button;
