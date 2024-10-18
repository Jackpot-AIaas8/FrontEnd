import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import apiClient from "../../token/AxiosConfig";

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const navigate = useNavigate();
  const [isConfirming, setIsConfirming] = useState(true);

  const paymentData = JSON.parse(sessionStorage.getItem("paymentData")) || {};
  console.log("Session에서 가져온 결제 데이터:", paymentData);

  const {
    memberID,
    customerName = "",
    customerMobilePhone = "",
    userAddress = "",
    totalPrice = 0,
    quantity,
    deliveryFee = 3000,
    orderId,
    shopId = "" ,
    orderName: name, 
  } = paymentData;

  useEffect(() => {
    if (!orderId) {
      navigate(`/fail?message=결제 정보가 유실되었습니다.`);
      return;
    }

    const requestData = {
      orderId: searchParams.get("orderId") || orderId,
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
      shopId: shopId,       
      orderName: name,
      quantity: quantity,
      memberID: memberID, 
      name: customerName,
      phone: customerMobilePhone,
      address: userAddress,
    };
    console.log("결제 완료 후 백엔드로 전달할 데이터:", requestData);

    async function confirm() {
      try {
        const response = await apiClient.post("http://localhost:8181/api/confirm", requestData, {
          headers: {
            Authorization: "Basic " + btoa("test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6:"), // 시크릿 키를 인코딩하여 포함
            "Content-Type": "application/json"
          }
        });

        console.log("API 응답:", response);


        if (response.status !== 200) {
          navigate(`/fail?message=${response.data.message}&code=${response.data.code}`);
          return;
        }

        setPaymentInfo(response.data);
        setIsConfirming(false);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error.response?.data || error.message);
        console.error(error);
        navigate(`/fail?message=결제 확인 중 오류가 발생했습니다.`);
      }
    }

    confirm();
  }, [searchParams, navigate, orderId]);

  if (isConfirming) {
    return <div>결제 확인 중...</div>;
  }

  if (!paymentInfo) {
    return <div>결제 정보를 불러올 수 없습니다.</div>;
  }

  const {
    orderName,
    totalAmount,
    status,
  } = paymentInfo;

  const suppliedAmount = totalAmount - deliveryFee;

  return (
    <PageContainer>
      <Title>주문완료</Title>
      <Subtitle>주문이 완료되었습니다. 감사합니다!</Subtitle>
      <Section>
        <SectionTitle>상품배송 정보</SectionTitle>
        <InfoRow>
          <InfoLabel>{name}({quantity}개)</InfoLabel>
        </InfoRow>
      </Section>
      <InfoContainer>
        <LeftColumn>
          <SectionTitle>받는사람 정보</SectionTitle>
          <InfoRow>
            <InfoLabel>받는사람</InfoLabel>
            <InfoValue>{customerName} / {customerMobilePhone}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>받는주소</InfoLabel>
            <InfoValue>{userAddress}</InfoValue>
          </InfoRow>
        </LeftColumn>
        <RightColumn>
          <SectionTitle>결제 정보</SectionTitle>
          <InfoRow>
            <InfoLabel>주문금액</InfoLabel>
            <InfoValue>{totalPrice.toLocaleString()} 원</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>배송비</InfoLabel>
            <InfoValue>{deliveryFee.toLocaleString()} 원</InfoValue>
          </InfoRow>
          <TotalRow>
            <TotalLabel>총 결제금액</TotalLabel>
            <TotalValue>{totalAmount.toLocaleString()} 원</TotalValue>
          </TotalRow>
        </RightColumn>
      </InfoContainer>
      <ButtonContainer>
        <Button>주문 상세보기</Button>
        <Button primary={true}>쇼핑 계속하기</Button>
      </ButtonContainer>
    </PageContainer>
  );
}

// 스타일 정의는 생략
export default SuccessPage;

// 스타일 정의
const PageContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  margin-top: 100px;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const InfoLabel = styled.span`
  font-weight: bold;
`;

const InfoValue = styled.span`
  color: #333;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const LeftColumn = styled.div`
  width: 48%;
`;

const RightColumn = styled.div`
  width: 48%;
`;

const TotalRow = styled(InfoRow)`
  font-size: 18px;
  font-weight: bold;
  border-top: 1px solid #ddd;
  padding-top: 10px;
`;

const TotalLabel = styled.span`
  font-weight: bold;
`;

const TotalValue = styled.span`
  color: #f00;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: ${({ primary }) => (primary ? '#0066cc' : '#ddd')};
  color: ${({ primary }) => (primary ? '#fff' : '#333')};
  font-size: 16px;
  cursor: pointer;
`;
