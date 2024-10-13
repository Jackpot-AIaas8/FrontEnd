import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../token/AuthContext";
import apiClient from "../../token/AxiosConfig";

const useHeart = (dog, onHeartToggle) => {
  const [heart, setHeart] = useState(dog.isHeart);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleHeartToggle = () => {
    setHeart((prevHeart) => (prevHeart === 1 ? 0 : 1));
  };

  const apiHeartUpdate = async () => {
    try {
      const response = await apiClient.post("dog/addHeart", {
        dogId: dog.dogId,
      });
      if (response.status === 200) {
        console.log("Heart Update Success");
        onHeartToggle && onHeartToggle();
        alert(
          heart === 0
            ? `${dog.name} 하트를 눌렀습니다.`
            : `${dog.name} 하트를 취소하였습니다.`
        );
      } else {
        // 서버 오류 시 상태 복원
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
      navigate("/signIn", { state: { redirectedFrom: location.pathname } });
    } else {
      handleHeartToggle();
      apiHeartUpdate();
    }
  };

  return { heart, updateHeart };
};

export default useHeart;
