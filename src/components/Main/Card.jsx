import React from "react";
import styled from "styled-components";

const Card = () => {
    return (
        <StyledWrapper>
            <div className="card">
                <div className="card-overlay"/>
                <div className="card-inner">
                    강아지
                    <br/>
                    매년 어쩌구
                    <br/>
                    저쩌구
                </div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .card {
    --bg: #e8e8e8;
    --contrast: #e2e0e0;
    --grey: #93a1a1;
    position: absolute;
    padding: 9px;
    background-color: var(--bg);
    border-radius: 35px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }

  .card-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: repeating-conic-gradient(var(--bg) 0.0000001%, var(--grey) 0.000104%) 60% 60%/600% 600%;
    filter: opacity(10%) contrast(105%);
  }

  .card-inner {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 190px;
    height: 254px;
    //background-color: var(--contrast);
    border-radius: 30px;
    /* Content style */
    font-size: 30px;
    font-weight: 900;
    color: #c7c4c4;
    text-align: center;
    font-family: monospace;
  }
`;

export default Card;
