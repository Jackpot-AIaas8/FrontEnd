import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiClient from "../token/AxiosConfig";
import { NoneContent } from "../pages/Memeber/Mypage";
import OrderDetails from "./OrderDetails";

const PurchaseHistorySection = ({ showAll }) => {
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); // 선택된 주문 상태 추가

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await apiClient.get("/order/findAll");
        setShopData(response.data);
      } catch (error) {
        console.error("Failed to fetch order data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  // 주문 번호(order_id)를 기준으로 데이터를 그룹화
  const groupedOrders = shopData.reduce((acc, item) => {
    const orderId = item.orderId;
    if (!acc[orderId]) {
      acc[orderId] = [];
    }
    acc[orderId].push(item);
    return acc;
  }, {});

  const displayedOrderKeys = showAll
    ? Object.keys(groupedOrders)
    : Object.keys(groupedOrders).slice(0, 3);

  if (loading) {
    return <div>Loading...</div>;
  }

  // 선택된 주문의 데이터를 필터링하여 전달
  const selectedOrderData = selectedOrder ? groupedOrders[selectedOrder] : null;

  return (
    <div>
      <h4 className="text-left p-0 m-0">구매내역</h4>
      {shopData.length ? (
        <>
          {/* 선택된 주문이 있을 때만 해당 주문 표시 */}
          {selectedOrder ? (
            <OrderGroup
              key={selectedOrder}
              orderId={selectedOrder}
              orderDate={
                groupedOrders[selectedOrder]?.[0]?.orderDate || "알 수 없음"
              }
              shopData={groupedOrders[selectedOrder]}
              setSelectedOrder={setSelectedOrder}
            />
          ) : (
            // 선택된 주문이 없을 때만 전체 목록 표시
            displayedOrderKeys.map((orderId) => (
              <OrderGroup
                key={orderId}
                orderId={orderId}
                orderDate={
                  groupedOrders[orderId]?.[0]?.orderDate || "알 수 없음"
                }
                shopData={groupedOrders[orderId]}
                setSelectedOrder={setSelectedOrder}
              />
            ))
          )}
        </>
      ) : (
        <NoneContent />
      )}

      {/* 선택된 주문이 있을 때만 상세 정보 컴포넌트 렌더링 */}
      {selectedOrderData && <OrderDetails orderData={selectedOrderData} />}
    </div>
  );
};

const OrderGroup = ({ orderId, orderDate, shopData, setSelectedOrder }) => {
  const handleViewDetails = () => {
    // 선택된 주문 번호를 설정
    setSelectedOrder(orderId);
  };

  return (
    <OrderGroupContainer>
      <ViewDetailsButton onClick={handleViewDetails}>
        상세보기
      </ViewDetailsButton>
      <OrderDateHeader>{orderDate} 주문</OrderDateHeader>
      {shopData.map((item) => (
        <PurchaseHistory key={item.id} shopData={item} />
      ))}
    </OrderGroupContainer>
  );
};

const OrderDateHeader = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const OrderGroupContainer = styled.div`
  position: relative;
  margin-bottom: 30px;
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ViewDetailsButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 4px;
  text-align: center;

  &:hover {
    background-color: #ddd;
  }
`;

export const PurchaseHistory = ({ shopData }) => {
  const stateInfo = (() => {
    switch (shopData.deliveryState) {
      case 0:
        return { text: "배송 준비 중", color: "black" };
      case 1:
        return { text: "배송 중", color: "orange" };
      case 2:
        return { text: "배송 완료", color: "green" };
      case 4:
        return { text: "구매 취소", color: "red" };
      default:
        return { text: "서비스 에러", color: "red" };
    }
  })();

  return (
    <StyledPurchaseSection $statecolor={stateInfo.color}>
      <div className="section-left flex">
        <h5 className="status">{stateInfo.text}</h5>
        <img
          src={shopData.imageUrl || "https://via.placeholder.com/64"}
          className="thumbnail"
          alt="품목"
        />
        <div className="product-section align-center">
          <p className="productTitle">{shopData.name}</p>
          <span className="productPrice">{shopData.totalPrice}</span>
          <span>*</span>
          <span className="quantity">{shopData.quantity}개</span>
        </div>
        <button className="btn_detailed">장바구니 담기</button>
      </div>
    </StyledPurchaseSection>
  );
};

export const StyledPurchaseSection = styled.div`
  .section-left {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: fit-content;
    text-align: left;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;

    > h5 {
      width: 100%;
      font-size: 1.2rem;
      color: ${(props) => props.$statecolor};
      margin-bottom: 10px;
    }

    > .thumbnail {
      width: 64px;
      height: 64px;
      margin-right: 20px;
    }

    > .product-section {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      flex-grow: 1;
    }
  }
  .section-left > *:last-child {
    margin-bottom: 0;
  }
  .btn_detailed {
    flex: 1;
    align-self: center;
    height: 30%;
  }

  .productInfo {
    margin: 20px 0;
  }

  .product-section span {
    margin-right: 5px;
  }
  .div {
    margin: 0 5px;
  }
`;

export default PurchaseHistorySection;
