import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import apiClient from "../../token/AxiosConfig";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "6JqYbn-tMjCQIrq9p4xLN";

function CheckoutPage() {
  const location = useLocation();
  const {
    name = "상품명",

    quantity = 1,
    totalPrice = 50000,
  } = location.state || {};

  // 디버깅 1: 처음 렌더링 시 amount 값 확인
  const amount = totalPrice + 3000; // 결제 금액 + 배송비
  console.log("Initial Amount:", amount);

  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);
  
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [user, setUser] = useState({});



  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiClient.get("/member/myPage");
        console.log("User Data:", response.data); // 결과 콘솔에 출력
        setUser(response.data);
      } catch (error) {
        console.error("서버 오류 발생:", error); // 오류 발생 시 콘솔에 출력
      }
    };

    fetchUserInfo(); // 컴포넌트 마운트 시 호출
  }, []);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey });
      setWidgets(widgets);
    }
    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (!widgets) return;

      // 디버깅 2: setAmount 호출 시 전달되는 amount 값 확인
      console.log("Setting Amount in Widgets:", amount);

      await widgets.setAmount({
        currency: "KRW",
        value: parseInt(amount, 10), // 정수형으로 변환하여 전달
      });

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);
      setReady(true);
    }
    renderPaymentWidgets();
  }, [widgets, amount]);

  const handlePayment = async () => {
    const paymentAmount = parseInt(amount, 10); // 숫자로 변환
    const orderId = `order_${Date.now()}`; // 고유한 orderId 생성
    console.log("Amount:", paymentAmount);       // 디버깅 로그 추가

  
    if (!ready) {
      alert("현재는 토스 카드 결제만 가능합니다.");
      return;
    }
  
    try {
      console.log("결제 요청 시작");
      console.log("Order ID:", orderId);
      console.log("Order Name:", name);
      console.log("Amount:", paymentAmount);  // 숫자로 변환된 금액 확인
      console.log("Customer Email:", user.email);
      console.log("Customer Name:", user.name);
      console.log("Widgets Object:", widgets);
      console.log("Customer Phone:", user.phone);
      console.log("Sending amount to Toss Payments:", paymentAmount);

  
      // 결제 요청 처리
      await widgets.requestPayment({
        orderId: "orderId_123456",
        orderName: name,
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
        customerEmail: user.email,
        customerName: user.name,
        customerMobilePhone: user.phone,
      });
      console.log("결제 요청 완료");
    } catch (error) {
      console.error("결제 요청 중 오류 발생:", error);
      
      
      alert("결제 요청 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };


  const handleAddressEdit = () => {
    setIsEditingAddress(true);
  };

  const handleAddressSave = () => {
    setIsEditingAddress(false);
  };
  const handleAddressChange = (e) => {
    const newAddress = e.target.value;
    setUser((prevUser) => ({ ...prevUser, address: newAddress }));
  };

  return (
    <PageContainer>
      <Header>
        <Logo>로고</Logo>
        <OrderProcess>
          주문/결제 <span>주문결제 &gt; 주문완료</span>
        </OrderProcess>
      </Header>
      <Divider />

      <Section>
        <SectionTitle>구매자 정보</SectionTitle>
        <InfoBox>
          <InfoRow>
            <Label>이름</Label>
            <Value>{user.name || "정보 없음"}</Value>
          </InfoRow>
          <InfoRow>
            <Label>이메일</Label>
            <Value>{user.email || "정보 없음"}</Value>
          </InfoRow>
          <InfoRow>
            <Label>휴대폰 번호</Label>
            <Value>{user.phone || "정보 없음"}</Value>
          </InfoRow>
        </InfoBox>
      </Section>

      <Divider />

      <Section>
        <FlexRow>
          <SectionTitle>받는 사람 정보</SectionTitle>
          {isEditingAddress ? (
            <SaveAddressButton onClick={handleAddressSave}>저장</SaveAddressButton>
          ) : (
            <EditAddressButton onClick={handleAddressEdit}>수정</EditAddressButton>
          )}
        </FlexRow>
        {isEditingAddress ? (
          <Input
            type="text"
            value={user.address}
            onChange={handleAddressChange}
            placeholder="주소를 수정하세요"
          />
        ) : (
          <MessageBox>{user.address || "주소 정보가 없습니다."}</MessageBox>
        )}
      </Section>

      <Divider />

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

      <Divider />

      <PaymentSection>
        <MessageBox>
          현재는 <strong>토스 카드 결제</strong>만 가능합니다.
        </MessageBox>
        <div id="payment-method" />
        <div id="agreement" />
        <PayButton onClick={handlePayment} disabled={!ready}>
          결제하기
        </PayButton>
      </PaymentSection>
    </PageContainer>
  );
}



// 스타일 정의
const PageContainer = styled.div`
  width: 40%;
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

const EditAddressButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const SaveAddressButton = styled.button`
  background-color: #28a745;
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
  background-color: #f9f9f9;
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const PaymentSection = styled.div`
  margin-top: 20px;
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
