import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import apiClient from "../../token/AxiosConfig";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "e6Bp3EiNGF0nTmXJ05nvg";

function CheckoutPage() {
  const location = useLocation();

  const { productNames = [], totalAmount = 0 } = location.state || {};

  productNames.forEach((item) => {
    console.log(
      `상품명: ${item.name}, 가격: ${item.productPrice}, 수량: ${item.quantity}, 총 금액: ${item.totalAmount}`
    );
  });
  // 장바구니에서 잘 들어왔는지 콘솔찍어보는거임

  const {
    name: productName = "",
    quantity = 1,
    totalPrice = 50000,

    shopId = "",
  } = location.state || {};

  const name = productName;
  const amount = totalPrice + 3000; // 배송비 포함 금액

  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiClient.get("member/myPage");
        setUser(response.data);
        console.log(response.data); // 확인용 로그 추가
      } catch (error) {
        console.error(error);
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
      if (!widgets) return;

      await widgets.setAmount({
        currency: "KRW",
        value: parseInt(amount, 10), // 결제 금액 설정
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
    const paymentAmount = parseInt(amount, 10);
    const orderId = `order_${Date.now()}`;
    console.log("Amount:", paymentAmount);
    if (!ready) {
      alert("결제 준비가 완료되지 않았습니다.");
      return;
    }

    try {
      console.log("결제 요청 시작");
      console.log("Order ID:", orderId);
      console.log("shopId:", shopId);
      console.log("Order Name:", name);
      console.log("Amount:", paymentAmount);
      console.log("Customer Email:", user.email);
      console.log("Customer Name:", user.name);
      console.log("Customer Phone:", user.phone);
      console.log("Sending amount to Toss Payments:", paymentAmount);

      // 결제 요청 처리
      await widgets.requestPayment({
        orderId: orderId,
        orderName: name,
        successUrl: `${window.location.origin}/success?orderId=${orderId}`,
        failUrl: `${window.location.origin}/fail`,
        customerEmail: user.email,
        customerName: user.name,
        customerMobilePhone: user.phone,
      });
      console.log("결제 요청 완료");

      // 결제 성공 시 sessionStorage에 결제 정보 저장
      const paymentData = {
        orderId,
        productNames,
        shopId,
        // orderName: name,
        // quantity,
        orderName: productNames.map((item) => item.productName).join(", "),
        quantity: productNames.reduce((acc, item) => acc + item.quantity, 0),
        memberId: user.memberID,
        customerName: user.name,
        customerMobilePhone: user.phone,
        userAddress: user.address,
        totalPrice: totalAmount - 3000, // 합계가격에서 배송비를 빼야 토탈프라이스임
        deliveryFee: 3000,
        amount: paymentAmount,
      };

      sessionStorage.setItem("paymentData", JSON.stringify(paymentData));
      console.log("SuccessPage로 전달할 데이터:", paymentData);
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
            <Value>
              {/* {Array.isArray(name) && name.length > 0
                ? name.map((item) => item.productName).join(", ") */}

              {Array.isArray(productNames) && productNames.length > 0
                ? productNames.map((item) => item.name).join(", ") // 배열일 때 처리 - 장바구니
                : typeof name === "string" && name // 단일 값일 때 처리 - 디테일페이지 바로구매
                ? name
                : "상품명 불러오기 실패"}
            </Value>
          </ProductRow>
          <ProductRow>
            <Label>수량</Label>
            <Value>
              {/* {Array.isArray(name) && name.length > 0 // 장바구니 형태일 경우 배열
                ? name.map((item) => `${item.quantity}개`).join(", ") */}
              {Array.isArray(productNames) && productNames.length > 0
                ? productNames.map((item) => `${item.quantity}개`).join(", ")
                : typeof name === "string" && quantity // 단일 값일 때 바로구매 형태
                ? `${quantity}개`
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
              {Array.isArray(totalAmount) && totalAmount.length > 0 // 장바구니 형태일 경우 배열
                ? `${totalAmount
                    .reduce((acc, item) => acc + item, 0)
                    .toLocaleString()}원` // 배열일 경우 총합 계산
                : typeof totalAmount === "number" // 단일 상품일 경우 숫자형 처리
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
              {Array.isArray(totalAmount) && totalAmount.length > 0
                ? `${(
                    totalAmount.reduce((acc, item) => acc + item, 0) + 3000
                  ).toLocaleString()}원` // 총 상품 가격 + 배송비 계산
                : typeof totalAmount === "number"
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
