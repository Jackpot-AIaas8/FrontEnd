import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiClient from "../../token/AxiosConfig"; // 서버 API를 호출하는 axios 설정
import styled from "styled-components"; // 스타일링을 위해 styled-components 사용

function SuccessPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [user, setOrderInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchOrderInfo = async () => {
      // Authorization 헤더 없이 API 호출
      try {
        const response = await apiClient.get(`/order/info?orderId=${orderId}`);
        console.log("Fetched Order Info:", response.data); // 가져온 데이터를 로그로 출력
        setOrderInfo(response.data); // 가져온 데이터를 상태에 저장
        setIsLoading(false); // 로딩 완료
      } catch (error) {
        console.error("Error fetching order info:", error); // 에러 발생 시 로그 출력
        setIsLoading(false); // 로딩 완료
      }
    };

    if (orderId) {
      console.log("Order ID:", orderId); // URL에서 넘어온 orderId 로그로 출력
      fetchOrderInfo();
    }
  }, [orderId]);

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중 표시
  }

  if (!user) {
    return <div>정보를 불러오지 못했습니다. 다시 시도해 주세요.</div>; // 데이터가 없을 때의 오류 처리
  }

  return (
    <PageWrapper>
      <ContentWrapper>
        <Container>
          <Title>주문완료</Title>
          <SubTitle>주문이 완료되었습니다. 감사합니다!</SubTitle>

          {/* 데이터를 확인하기 위한 임시 출력 */}
          <pre>{JSON.stringify(user, null, 2)}</pre>

          <Section>
            <SectionTitle>상품배송 정보</SectionTitle>
            <DeliveryInfo>
              <DeliveryStatus>
                <img src="/delivery-icon.png" alt="배송 아이콘" />
                <p>내일(화) 도착 보장 ({user.productName} 1개)</p>
              </DeliveryStatus>
            </DeliveryInfo>
          </Section>

          <Row>
            <InfoBox>
              <SectionTitle>받는사람 정보</SectionTitle>
              <InfoItem>
                <Label>받는사람</Label>
                <Value>{user.name}</Value>
              </InfoItem>
              <InfoItem>
                <Label>받는주소</Label>
                <Value>{user.address}</Value>
              </InfoItem>
              <InfoItem>
                <Label>배송요청사항</Label>
                <Value>문 앞 (예: {user.phone})</Value>
              </InfoItem>
            </InfoBox>

            <InfoBox>
              <SectionTitle>결제 정보</SectionTitle>
              <InfoItem>
                <Label>주문금액</Label>
                <Value>{user.amount.toLocaleString()}원</Value>
              </InfoItem>
              <InfoItem>
                <Label>배송비</Label>
                <Value>0원</Value> {/* 실제로 배송비를 서버에서 받아올 수 있으면 수정 */}
              </InfoItem>
              <TotalItem>
                <Label>총 결제금액</Label>
                <TotalValue>{user.amount.toLocaleString()}원</TotalValue>
              </TotalItem>
            </InfoBox>
          </Row>

          <ButtonGroup>
            <Button>주문 상세보기</Button>
            <Button secondary>쇼핑 계속하기</Button>
          </ButtonGroup>
        </Container>
      </ContentWrapper>

      <Footer>
        <p>Copyright © 2024 Your Company. All rights reserved.</p>
      </Footer>
    </PageWrapper>
  );
}

export default SuccessPage;

// 스타일 정의 (기존 코드와 동일)
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; // 화면의 전체 높이를 차지하도록 설정
`;

const ContentWrapper = styled.div`
  flex-grow: 1; // 메인 콘텐츠가 남은 모든 공간을 차지하게 설정
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.p`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const DeliveryInfo = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
`;

const DeliveryStatus = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  p {
    font-size: 16px;
    color: #28a745;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoBox = styled.div`
  width: 48%;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
  color: #555;
`;

const Value = styled.span`
  color: #333;
`;

const TotalItem = styled(InfoItem)`
  font-size: 18px;
  font-weight: bold;
`;

const TotalValue = styled(Value)`
  color: #e60023;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ secondary }) => (secondary ? '#007bff' : '#28a745')};
  color: white;
  margin: 0 10px;

  &:hover {
    opacity: 0.8;
  }
`;

const Footer = styled.footer`
  background-color: #f1f1f1;
  padding: 20px;
  text-align: center;
  font-size: 14px;
  color: #666;
  border-top: 1px solid #ddd;
  width: 100%;
  margin-top: auto;  // 푸터가 항상 페이지의 맨 아래로 가도록 설정
`;
