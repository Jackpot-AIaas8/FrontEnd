import styled from "styled-components";

import OffHeart from "@mui/icons-material/FavoriteBorderSharp";
import OnHeart from "@mui/icons-material/FavoriteSharp";

import UseHeart from "./heart/useHeart";

const StyledIconButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  color: ${(props) =>
    props.$heart === 1 ? props.theme.colors.red : props.theme.colors.white};
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
  const { dog, onHeartToggle } = props;
  const { heart, updateHeart } = UseHeart(dog, onHeartToggle);

  return (
    <StyledIconButton
      $heart={heart}
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
