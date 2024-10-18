import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import apiClient from "../../token/AxiosConfig";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "e6Bp3EiNGF0nTmXJ05nvg";

function CheckoutPage() {
  const location = useLocation();
  const { productNames = [], totalAmount = 0, quantity = 1, isFunding = false, name } = location.state || {}; // 'name'은 상품명 또는 강아지 이름
  const { shopId = "" } = location.state || {};

  const amount = totalAmount + (isFunding ? 0 : 3000); // 펀딩일 경우 배송비는 없음
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);
  const [user, setUser] = useState({});
  const [isEditingAddress, setIsEditingAddress] = useState(false); // 주소 수정 상태 관리

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiClient.get("/member/myPage");
        setUser(response.data);
        console.log("Fetched User Info:", response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  // 토스 결제 위젯 불러오기
  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey });
      setWidgets(widgets);
    }
    fetchPaymentWidgets();
  }, []);

  // 결제 위젯 렌더링
  useEffect(() => {
    async function renderPaymentWidgets() {
      if (!widgets) return; // 위젯이 로드되지 않았다면 종료

      await widgets.setAmount({
        currency: "KRW",
        value: parseInt(amount, 10), // 결제 금액 설정
      });

      // 결제 수단 및 동의란 위젯 렌더링
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

      setReady(true); // 결제 준비 완료
    }
    renderPaymentWidgets();
  }, [widgets, amount]); // widgets와 amount가 변경될 때마다 렌더링

  const handlePayment = async () => {
    const paymentAmount = parseInt(amount, 10);
    const orderId = `order_${Date.now()}`;
  
    if (!ready) {
      alert("결제 준비가 완료되지 않았습니다.");
      return;
    }
  
    try {
      // 펀딩일 경우 강아지 이름을 orderName으로 사용, 상품일 경우 상품명 사용
      const orderName = isFunding
        ? name // 펀딩일 때는 'name'이 강아지 이름으로 사용됨
        : Array.isArray(productNames) && productNames.length > 1
        ? productNames.map((item) => item.productName).join(", ")
        : name || productNames[0]?.productName || "상품 이름 없음";
  
      if (!orderName) {
        // orderName이 없을 경우 경고 메시지 표시
        alert("필수 파라미터 'orderName'이 누락되었습니다.");
        return;
      }
  
      console.log("Order Name:", orderName);
  
      // 결제 정보 저장 (펀딩과 상품 구분)
      const paymentData = isFunding
        ? {
            orderId,
            name, // 강아지 이름
            orderName, // orderName은 강아지 이름으로 설정됨
            memberID: user.memberID,
            customerName: user.name,
            customerMobilePhone: user.phone,
            totalPrice: totalAmount, // 강아지 펀딩에서는 수량과 상관없이 총 금액
            amount: paymentAmount,
            isFunding: true, // 펀딩 여부 저장
          }
        : {
            orderId,
            productNames, // 상품 이름 목록
            shopId,
            orderName, // orderName은 상품명으로 설정됨
            quantity, // 상품 수량
            memberID: user.memberID,
            customerName: user.name,
            customerMobilePhone: user.phone,
            userAddress: user.address || "주소 정보 없음", // 배송 주소
            totalPrice: totalAmount * quantity, // 총 상품 금액
            deliveryFee: 3000, // 배송비
            amount: paymentAmount,
            isFunding: false, // 펀딩 여부 저장
          };
  
      sessionStorage.setItem("paymentData", JSON.stringify(paymentData));
      console.log("sessionStorage에 저장된 데이터:", JSON.parse(sessionStorage.getItem("paymentData")));
  
      await widgets.requestPayment({
        orderId: orderId,
        orderName, // 강아지 이름 또는 상품명을 포함한 orderName
        successUrl: isFunding
        ? `${window.location.origin}/dog/${name}` // 펀딩일 경우 강아지 이름 페이지로 이동
        : `${window.location.origin}/success?orderId=${orderId}`, // 상품일 경우 성공 페이지로 이동
        failUrl: `${window.location.origin}/fail`,
        customerEmail: user.email,
        customerName: user.name,
        customerMobilePhone: user.phone,
      });
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

      {/* 펀딩일 때는 받는 사람 정보 숨김 */}
      {!isFunding && (
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
              value={user.address || ""} // 주소가 없을 경우 빈 문자열 처리
              onChange={handleAddressChange}
              placeholder="주소를 수정하세요"
            />
          ) : (
            <MessageBox>{user.address || "주소 정보가 없습니다."}</MessageBox>
          )}
        </Section>
      )}

      <Divider />

      <Section>
        <SectionTitle>{isFunding ? "강아지 정보" : "상품 정보"}</SectionTitle>
        <ProductInfoBox>
          <ProductRow>
            <Label>{isFunding ? "강아지 이름" : "상품명"}</Label>
            <Value>{name || "정보 없음"}</Value>
          </ProductRow>
          {!isFunding && (
            <ProductRow>
              <Label>수량</Label>
              <Value>{quantity || 1}개</Value>
            </ProductRow>
          )}
        </ProductInfoBox>
      </Section>

      <Divider />

      <Section>
        <SectionTitle>결제 정보</SectionTitle>
        <InfoBox>
          <TotalRow>
            <Label>총 결제 금액</Label>
            <Value>{amount.toLocaleString()}원</Value>
          </TotalRow>
        </InfoBox>
      </Section>

      <Divider />

      <PaymentSection>
        <MessageBox>
          현재는 <strong>토스, 카카오, 카드 결제</strong>만 가능합니다.
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

export default CheckoutPage;

const PageContainer = styled.div`
  width: 40%;
  margin: 0 auto;
  padding: 20px;
  margin-top: 100px;
  background-color: #f0f0f0; /* 배경 색상 추가 */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-size: 24px;
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

const InfoBox = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
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

const ProductInfoBox = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
`;

const ProductRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TotalRow = styled(InfoRow)`
  font-size: 18px;
  font-weight: bold;
`;

const PaymentSection = styled.div`
  margin-top: 20px;
`;

const PayButton = styled.button`
  width: 100%;
  background-color: #ffa150; /* 버튼 색상 #ffa150 */
  color: white;
  padding: 15px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const EditAddressButton = styled.button`
  background-color: #ffa150; /* 수정 버튼 색상 #ffa150 */
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const SaveAddressButton = styled.button`
  background-color: #ffa150; /* 저장 버튼 색상 #ffa150 */
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
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
  font-weight: bold;
  strong {
    color: #28a745;
  }
`;
