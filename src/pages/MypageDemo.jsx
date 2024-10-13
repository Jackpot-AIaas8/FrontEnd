import React from "react";
import styled from "styled-components";

// Styled Components 정의
const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #f9f9f9;
`;

const ProfileImage = styled.div`
  width: 85px;
  height: 85px;
  background: url("/common/img/default_profile.png") 50% 50% / cover no-repeat;
  border-radius: 50%;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  flex: 1;
`;

const GreetingText = styled.span`
  font-size: 16px;
  color: #333;
  font-weight: bold;
`;

const OrderTotal = styled.div`
  font-size: 14px;
  color: #777;
`;

const PointView = styled.div`
  text-align: center;
  font-weight: bold;
`;

const OrderTitle = styled.h6`
  font-size: 18px;
  margin: 10px 0;
  font-weight: bold;
`;

const EmptyOrder = styled.div`
  font-size: 15px;
  padding: 70px;
  text-align: center;
  color: #777;
`;

const MoreButton = styled.a`
  font-size: 15px;
  padding: 15px;
  display: block;
  text-align: center;
  cursor: pointer;
`;

const MyPageSection = () => {
  return (
    <div className="container">
      {/* 프로필 및 포인트 정보 섹션 */}
      <ProfileContainer>
        <div style={{ display: "flex", alignItems: "center" }}>
          <a href="#1;" onClick={() => alert("정보 수정")}>
            <ProfileImage />
          </a>
          <ProfileInfo>
            <GreetingText>전세계 님 안녕하세요.</GreetingText>
            <OrderTotal>누적 구매금액: 0원</OrderTotal>
          </ProfileInfo>
        </div>
        <PointView>
          <a href="/shop_mypage/?m2=point_list">
            <p>포인트</p>
            <span>1,000</span>
          </a>
        </PointView>
      </ProfileContainer>

      {/* 주문 조회 */}
      <OrderTitle>주문 조회</OrderTitle>
      <EmptyOrder>취소 내역이 없습니다.</EmptyOrder>

      {/* 더보기 버튼 */}
      <MoreButton onClick={() => alert("더보기 클릭")}>
        더보기{" "}
        <i
          aria-hidden="true"
          style={{ marginLeft: "2px" }}
          className="btm bt-plus-circle"
        ></i>
      </MoreButton>
    </div>
  );
};

export default MyPageSection;
