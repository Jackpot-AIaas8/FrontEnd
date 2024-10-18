import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import apiClient from "../../token/AxiosConfig";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "e6Bp3EiNGF0nTmXJ05nvg";

function CheckoutPage() {
  const location = useLocation();
  const {
    productNames = [],
    totalAmount = 0,
    quantity = 1,
  } = location.state || {};
  const { name: productName = "", shopId = "" } = location.state || {};

  const amount = totalAmount + 3000; // 배송비 포함 금액
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
      const orderName =
        Array.isArray(productNames) && productNames.length > 1
          ? productNames.map((item) => item.productName).join(", ")
          : productName || productNames[0]?.productName || "상품 이름 없음";

      console.log("Order Name:", orderName);

      const paymentData = {
        orderId,
        productNames: orderName,
        shopId,
        orderName,
        quantity,
        memberID: user.memberID,
        customerName: user.name,
        customerMobilePhone: user.phone,
        userAddress: user.address || "주소 정보 없음",
        totalPrice: totalAmount * quantity,
        deliveryFee: 3000,
        amount: paymentAmount,
      };

      sessionStorage.setItem("paymentData", JSON.stringify(paymentData));
      console.log(
        "sessionStorage에 저장된 데이터:",
        JSON.parse(sessionStorage.getItem("paymentData"))
      );

      await widgets.requestPayment({
        orderId: orderId,
        orderName,
        successUrl: `${window.location.origin}/success?orderId=${orderId}`,
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
            <SaveAddressButton onClick={handleAddressSave}>
              저장
            </SaveAddressButton>
          ) : (
            <EditAddressButton onClick={handleAddressEdit}>
              수정
            </EditAddressButton>
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

      <Divider />

      <Section>
        <SectionTitle>상품 정보</SectionTitle>
        <ProductInfoBox>
          <ProductRow>
            <Label>상품명</Label>
            <Value>
              {Array.isArray(productNames) && productNames.length > 0
                ? productNames
                    .map((item) => item.shopName || item.name)
                    .join(", ") // 배열일 때 처리 (장바구니 데이터)
                : typeof productName === "string" && productName // 단일 값일 때 처리 (상세 페이지 데이터)
                ? productName
                : "상품명 불러오기 실패"}
            </Value>
          </ProductRow>
          <ProductRow>
            <Label>수량</Label>
            <Value>
              {Array.isArray(productNames) && productNames.length > 0 // 장바구니 형태일 경우 배열
                ? productNames
                    .map((item) => `${item.quantity || 1}개`)
                    .join(", ") // 수량이 없으면 기본값으로 1 설정
                : typeof productName === "string" && quantity // 단일 값일 때 바로구매 형태
                ? `${quantity || 1}개` // 수량이 없으면 기본값으로 1 설정
                : "수량 불러오기 실패"}
            </Value>
          </ProductRow>
        </ProductInfoBox>
      </Section>

      <Divider />

      <Section>
        <SectionTitle>결제 정보</SectionTitle>
        <InfoBox>
          <InfoRow>
            <Label>총 상품 가격</Label>
            <Value>
              {totalAmount
                ? `${totalAmount.toLocaleString()}원`
                : "가격 정보 없음"}
            </Value>
          </InfoRow>
          <InfoRow>
            <Label>배송비</Label>
            <Value>3,000원</Value>
          </InfoRow>
          <TotalRow>
            <Label>총 결제 금액</Label>
            <Value>
              {totalAmount
                ? `${(totalAmount + 3000).toLocaleString()}원`
                : "가격 정보 없음"}
            </Value>
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

// 스타일 정의
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
