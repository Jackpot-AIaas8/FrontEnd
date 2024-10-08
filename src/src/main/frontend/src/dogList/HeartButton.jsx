import React, { useState, useContext } from "react";
import styled from "styled-components";

import OffHeart from "@mui/icons-material/FavoriteBorderSharp";
import OnHeart from "@mui/icons-material/FavoriteSharp";
import theme from "../config/theme";
import apiClient from "../token/AxiosConfig";

import { AuthContext } from "../token/AuthContext";

const StyledIconButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  color: ${(props) =>
    props.heart === 1 ? theme.colors.red : theme.colors.white};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  box-shadow: none;
  z-index: 10;

  &:hover {
    background-color: transparent;
  }

  &:focus {
    outline: none;
  }
`;

const HeartButton = (props) => {
  const { onHeartToggle, dog } = props;
  const [heart, setHeart] = useState(props.dog.isHeart);
  const { isAuthenticated } = useContext(AuthContext);

  const handleHeartToggle = () => {
    setHeart((prevHeart) => (prevHeart === 1 ? 0 : 1));
  };
  /* heart db추가 api 성공 시 던져주면 그거 */
  const apiHeartUpdate = async () => {
    console.log(dog.dogId);
    try {
      const response = await apiClient.post("dog/addHeart", {
        dogId: dog.dogId,
      });
      if (onHeartToggle) {
        onHeartToggle();
        alert(
          heart === 0
            ? `${dog.name} 하트를 눌렀습니다.`
            : `${dog.name} 하트를 취소하였습니다.`
        );
      }

      if (response.status === 200) {
        console.log("Heart Update Success");
      } else {
        setHeart((prevHeart) => (prevHeart === 1 ? 0 : 1));
      }
    } catch (error) {
      console.error(error);
      setHeart((prevHeart) => (prevHeart === 1 ? 0 : 1));
    }
  };

  const updateHeart = () => {
    if (!isAuthenticated) {
      alert("로그인 후 이용할 수 있는 기능입니다.");
    } else {
      handleHeartToggle();
      apiHeartUpdate();
    }
  };

  return (
    <StyledIconButton
      heart={heart}
      onClick={(e) => {
        e.stopPropagation(); // 부모 요소로 이벤트 전파 방지
        updateHeart();
      }}
    >
      {heart === 1 ? <OnHeart /> : <OffHeart />}
    </StyledIconButton>
  );
};

export default HeartButton;
