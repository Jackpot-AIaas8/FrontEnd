import React from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

function SuccessPage() {
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const paymentKey = searchParams.get("paymentKey");

  return (
    <PageContainer>
      <OrderCompleteBox>
        <OrderHeader>
          <Step>01 주문/결제</Step>
          <StepHighlight>02 주문완료</StepHighlight>
        </OrderHeader>

        <OrderCompleteHeader>주문완료</OrderCompleteHeader>
        <OrderMessage>주문이 완료되었습니다. 감사합니다!</OrderMessage>

        {/* 상품 배송 정보 */}
        <SectionTitle>상품배송 정보</SectionTitle>
        <DeliveryBox>
          <DeliveryStatus>
            <DeliveryText>
              내일(화) 도착 보장(상품 1개)
            </DeliveryText>
          </DeliveryStatus>
        </DeliveryBox>

        {/* 받는 사람 정보 */}
        <SectionTitle>받는사람 정보</SectionTitle>
        <InfoWrapper>
          <InfoBox>
            <InfoRow>
              <Label>받는사람</Label>
              <Value>박우람 / 010-4826-7085</Value>
            </InfoRow>
            <InfoRow>
              <Label>받는주소</Label>
              <Value>
                광주광역시 북구 일동 632 2차 국제미소래아파트 201동 1508호
              </Value>
              <ModifyLink>변경하기</ModifyLink>
            </InfoRow>
            <InfoRow>
              <Label>배송요청사항</Label>
              <Value>문 앞 (15*********)</Value>
              <ModifyLink>변경하기</ModifyLink>
            </InfoRow>
          </InfoBox>

          {/* 결제 정보 */}
          <SectionTitle>결제 정보</SectionTitle> {/* 박스 바깥으로 이동 */}
          <InfoBox>
            <InfoRow>
              <Label>주문금액</Label>
              <Value>4,890원</Value>
            </InfoRow>
            <InfoRow>
              <Label>배송비</Label>
              <Value>+0원</Value>
            </InfoRow>
            <TotalRow>
              <Label>총 결제금액</Label>
              <TotalValue>4,8920원</TotalValue>
            </TotalRow>
          </InfoBox>
        </InfoWrapper>

        {/* 버튼 섹션 */}
        <ButtonSection>
          <OrderButton>주문 상세보기</OrderButton>
          <ContinueShoppingButton>쇼핑 계속하기</ContinueShoppingButton>
        </ButtonSection>
      </OrderCompleteBox>
    </PageContainer>
  );
}

export default SuccessPage;

// 스타일 정의
const PageContainer = styled.div`
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  min-height: 80vh;
`;

const OrderCompleteBox = styled.div`
  width: 60%; /* 중앙에 배치하기 위해 너비를 60%로 설정 */
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const Step = styled.span`
  color: #888;
  margin-right: 20px;
`;

const StepHighlight = styled.span`
  color: #000;
  font-weight: bold;
`;

const OrderCompleteHeader = styled.h2`
  text-align: left;
  font-size: 24px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const OrderMessage = styled.p`
  text-align: center;
  font-size: 18px;
  margin: 20px 0;
  font-weight: bold;

`;

const SectionTitle = styled.h3`
  text-align: left;
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 20px; /* 각 섹션 타이틀이 상단에 떨어지게 여백 추가 */
`;

const DeliveryBox = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: white;
`;

const DeliveryStatus = styled.div`
  display: flex;
  align-items: center;
`;

const DeliveryText = styled.p`
  font-size: 18px;
  margin: 0;
  span {
    color: #888;
    font-size: 16px;
    margin-left: 10px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const InfoBox = styled.div`
  width: 48%; /* 두 박스를 동일한 크기로 설정 */
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  word-wrap: break-word; /* 긴 텍스트가 줄바꿈되도록 설정 */
  word-break: break-all;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Value = styled.span`
  max-width: 60%; /* 긴 주소에 대한 줄바꿈 처리 */
  word-wrap: break-word;
`;

const ModifyLink = styled.a`
  color: #007bff;
  cursor: pointer;
`;

const TotalRow = styled(InfoRow)`
  font-size: 18px;
  font-weight: bold;
`;

const TotalValue = styled.span`
  color: red;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const OrderButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ContinueShoppingButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
