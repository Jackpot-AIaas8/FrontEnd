import styled from "styled-components";




export const StyledMypageWrapper = styled.div`
  padding: 30px;
  gap: 100px;

  min-width:1200px;

`;

export const StyledNavBar = styled.div`
  flex: 1;
  padding: 0 20px;
  max-width: 400px;

  .section-nav {
    box-shadow: 10px 10px 5px rgb(0, 0, 0, 0.2);
    max-width: 100%;
    width: 100%;
  }

  .logoArea {
    padding: 10px;
    box-sizing: border-box;
    gap: 10px;
  }

  .logo {
    width: fit-content;
    z-index: 10;
  }

  .logo-image {
    width: 80px;
    height: 20px;
  }

  .logo_title {
    display: inline-block;
    font-size: 0.8em;
  }
`;

export const StyledProFileArea = styled.div`
  background-color: white;
  padding: 20px 0;
  height: 30%;

  .photo {
    box-sizing: border-box;
    display: inline-block; /* 자식 요소 크기만큼 부모 크기를 지정 */
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .nickName {
    font-size: 26px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: -0.67px;
    word-break: break-all;
    margin: 0;
  }
`;

export const StyledMypageMenu = styled.div`
  margin-top: 20px;
  padding: 10px 30px;

  .menu_list {
    gap: 30px;
  }

  .menu_item {
    font-size: 20px;
    font-weight: 700;
    color: #1e1e23;
    letter-spacing: -1.18px;
    line-height: 26px;
  }
`;

export const StyeldRightSection = styled.div`
  flex: 1;
  gap: 10%;

  .section-mypage {
    padding: 20px;
    flex: 1;
  }

  .div-section {
    gap: 15px;
  }

  li {

    width: 100%;
    align-items: center;
  }

  hr{
    width: 100%;
  }
`;
