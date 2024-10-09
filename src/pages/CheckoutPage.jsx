import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

function CheckoutPage() {
  const location = useLocation();
  const {
    name,
    userName,
    userEmail,
    userPhone,
    userAddress,
    quantity,
    totalPrice,
  } = location.state || {};

  useEffect(() => {
    console.log("Received location state:", location.state); // 데이터 확인용 로그
    console.log("User Address:", userAddress);
    console.log("User Name:", userName);
    console.log("User Email:", userEmail);
    console.log("User Phone:", userPhone);
  }, [location.state]);

  return (
    <PageContainer>
      {/* 로고 및 주문/결제 단계 */}
      <Header>
        <Logo>로고</Logo>
        <OrderProcess>
          주문/결제 <span>주문결제 &gt; 주문완료</span>
        </OrderProcess>
      </Header>
      <Divider />

      {/* 구매자 정보 섹션 */}
      <Section>
        <SectionTitle>구매자 정보</SectionTitle>
        <InfoBox>
          <InfoRow>
            <Label>이름</Label>
            <Value>{userName || "정보 없음"}</Value>
          </InfoRow>
          <InfoRow>
            <Label>이메일</Label>
            <Value>{userEmail || "정보 없음"}</Value>
          </InfoRow>
          <InfoRow>
            <Label>휴대폰 번호</Label>
            <Value>{userPhone || "정보 없음"}</Value>
          </InfoRow>
          
        </InfoBox>
      </Section>

      {/* 받는 사람 정보 섹션 */}
      <Section>
        <FlexRow>
          <SectionTitle>받는 사람 정보</SectionTitle>
          <AddShippingBox>배송지 추가</AddShippingBox>
        </FlexRow>
        <MessageBox>저장되어 있는 배송지가 없습니다. 추가해주세요.</MessageBox>
      </Section>
      <Divider />

      {/* 상품 정보 섹션 */}
      <Section>
        <SectionTitle>상품 정보</SectionTitle>
        <ProductInfoBox>
          <ProductRow>
            <Label>상품명</Label>
            <Value>{name || "상품명 불러오기 실패"}</Value>
          </ProductRow>
          <ProductRow>
            <Label>수량</Label>
            <Value>{quantity || 1}개</Value>
          </ProductRow>
        </ProductInfoBox>
      </Section>
      <Divider />

      {/* 결제 정보 섹션 */}
      <Section>
        <SectionTitle>결제 정보</SectionTitle>
        <InfoBox>
          <InfoRow>
            <Label>총 상품 가격</Label>
            <Value>{totalPrice ? `${totalPrice.toLocaleString()}원` : "가격 정보 없음"}</Value>
          </InfoRow>
          <InfoRow>
            <Label>배송비</Label>
            <Value>3,000원</Value>
          </InfoRow>
          <TotalRow>
            <Label>총 결제 금액</Label>
            <Value>{totalPrice ? `${(totalPrice + 3000).toLocaleString()}원` : "가격 정보 없음"}</Value>
          </TotalRow>
        </InfoBox>
      </Section>

      {/* 결제 방법과 결제하기 버튼 */}
      <PaymentSection>
        <PaymentMethods>결제 방법: 네이버페이, 카카오페이 구현 예정</PaymentMethods>
        <PayButton>결제하기</PayButton>
      </PaymentSection>
    </PageContainer>
  );
}

// 스타일 정의
const PageContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  margin-top: 100px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 24px;
`;

const OrderProcess = styled.div`
  font-size: 18px;
  color: #555;
  span {
    font-size: 16px;
    color: #888;
  }
`;

const Divider = styled.hr`
  border: 1px solid #ddd;
  margin: 20px 0;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const InfoBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: white;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Value = styled.span``;

const TotalRow = styled(InfoRow)`
  font-size: 18px;
  font-weight: bold;
`;

const ProductInfoBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: white;
`;

const ProductRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const AddShippingBox = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const MessageBox = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  background-color: white;
`;

const PaymentSection = styled.div`
  margin-top: 20px;
`;

const PaymentMethods = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const PayButton = styled.button`
  display: block;
  width: 100%;
  background-color: #28a745;
  color: white;
  padding: 15px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export default CheckoutPage;
