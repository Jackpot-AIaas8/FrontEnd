import styled from "styled-components";
import OffHeart from "@mui/icons-material/FavoriteBorderSharp";
import OnHeart from "@mui/icons-material/FavoriteSharp";
import theme from "../../config/theme";

// Heart 버튼 스타일링
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

// HeartButton 컴포넌트: heart 상태에 따라 아이콘을 표시
export const HeartButton = ({ isHeart, onClick }) => {
  return (
    <StyledIconButton heart={isHeart} onClick={onClick}>
      {isHeart === 1 ? <OnHeart /> : <OffHeart />}
    </StyledIconButton>
  );
};