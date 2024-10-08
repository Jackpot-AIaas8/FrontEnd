import styled from "styled-components";

export const MypageWrapper = styled.div`
  background-color: aqua;
  padding: 30px;
  gap: 100px;

  .left-section {
    background-color: pink;
    flex: 1;
  }

  .right-section {
    flex: 2;
    gap: 10%;
  }

  .membership-rank-section {
    background-color: red;
    flex: 1;
    border-radius: 8px;
    position: relative;
  }

  .funding-details-section {
    background-color: green;
    flex: 1;
    border-radius: 8px;
  }

  .buying-details-section {
    background-color: yellow;
    flex: 1;
    border-radius: 8px;
  }
`;

export const NavBar = styled.div`
  background-color: pink;
  flex: 1;
  padding: 10px;
  .nav-section {
    background-color: blue;
    max-width: 300px;
    width: 100%;
  }
  .navList-section {
  }
`;
