import React from "react";
import styled from "styled-components";

// 전체 스타일을 하나의 컨테이너 컴포넌트로 관리
const StyledContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  .box-wrapper {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    padding: 10px 0;
  }

  .title {
    text-align: left;
    margin: 0;
    padding: 0;
  }

  .history-section {
    margin: 20px 0;
    width: 100%;
    min-height: 400px;

    gap: 5%;
  }

  .pictures-section {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 30px;
    padding: 20px;
  }

  .pictures-section img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    box-shadow: 0 0 10px 5px #666;
  }

  .pictures-section img:nth-child(even) {
    transform: translateY(70px); /* 짝수 번째 이미지 아래로 이동 */
  }

  .dog-info-section {
    flex: 1;
    padding: 0 20px;
    text-align: left;

    flex-direction: column;
    justify-content: center;
  }
`;

// 데이터와 컴포넌트 정의
const historyDescription = `  뽀삐는 어미에게 버림받고 거리에서 상처 입은 채 살아가던 유기견입니다. 
  구조되었지만 <strong>보호소의 재정 부족</strong>으로 인해 <strong>충분한 치료</strong>를 받기 어려웠습니다. 
  특히 <strong>다리 수술비가 부족</strong>해 <strong>생명에 위협</strong>을 받고 있었습니다. 
  <strong>후원이 없으면</strong> 유기견들은 치료를 받지 못하고, 결국 죽음에 이를 수 있습니다. 
  <strong>작은 후원이 그들의 생명을 살릴 수 있는 절실한 도움</strong>이 됩니다.
`;

const images = [
  "https://i.ytimg.com/vi/W99uYn4qVTY/maxresdefault.jpg", // 실제 이미지 경로로 변경
  "https://i.ytimg.com/vi/W99uYn4qVTY/maxresdefault.jpg",
  "https://i.ytimg.com/vi/W99uYn4qVTY/maxresdefault.jpg",
  "https://i.ytimg.com/vi/W99uYn4qVTY/maxresdefault.jpg",
];

// 컴포넌트 렌더링
const History = () => {
  return (
    <StyledContainer>
      <div className="box-wrapper">
        <h2 className="title">뽀삐의 History</h2>
      </div>
      <div className="history-section flex flex-row">
        <div className="pictures-section">
          {images.map((src, index) => (
            <img key={index} src={src} alt={`image-${index}`} />
          ))}
        </div>

        <div className="dog-info-section flex">
          <h3>뽀삐</h3>
          <p>나이: 1세</p>
          <p dangerouslySetInnerHTML={{ __html: historyDescription }}></p>
        </div>
      </div>
    </StyledContainer>
  );
};

export default History;
