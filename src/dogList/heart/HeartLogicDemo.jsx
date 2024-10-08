import { useState } from "react";
import apiClient from "../../token/AxiosConfig";

export const HeartLogic = (props) => {
    const [isHeart, setIsHeart] = useState(props.initialHeart);

    const toggleHeartState = () => {
        setIsHeart((prevHeart) => (prevHeart === 1 ? 0 : 1));
      };

    const updateHeartAPI = async () => {
    try {
      const response = await apiClient.post("dog/addHeart", {
        dogId :props.dogId 
    });
      if (response.status !== 200) {
        throw new Error("Failed to update heart status");
      }
      
    } catch (error) {
      
      // 요청 실패 시 상태를 복구 (토글된 상태를 되돌림)
      toggleHeartState();
    }
  };

  const handleHeartUpdate = () => {
    toggleHeartState(); // UI에서 즉시 토글
    updateHeartAPI(); // 서버에 상태 업데이트 요청
  };
  return { isHeart, handleHeartUpdate };
}
