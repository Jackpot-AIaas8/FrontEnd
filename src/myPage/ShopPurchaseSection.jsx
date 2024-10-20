import styled from "styled-components";
import { NoneContent } from "../pages/Memeber/Mypage";

const PurchaseHistorySection = ({ shopData, showAll }) => {
  
  const displayedData = showAll ? shopData : shopData.slice(0, 3);
  return (
    <div>
      <h4 className="text-left p-0 m-0">구매내역</h4>
      {shopData?.length ? (
        <>
          {displayedData.map((shopDatum) => (
            <PurchaseHistory key={shopDatum.id} shopData={shopDatum} />
          ))}
        </>
      ) : (
        <NoneContent />
      )}
    </div>
  );
};

export const PurchaseHistory = ({ shopData, theme }) => {
  
  const getStateInfo = (state) => {
    switch (state) {
      case 0:
        return { text: "배송 준비 중", color: "black" };
      case 1:
        return { text: "배송 중", color: "orange" };
      case 2:
        return { text: "배송 완료", color: "green" };
      default:
        return { text: "서비스 에러", color: "red" };
    }
  };

  const stateInfo = getStateInfo(shopData.deliveryState);

  return (
    <StyledPurchaseSection $statecolor={stateInfo.color}>
      {/* left-section */}

      <div className="section-left flex">
        <h5 className="status">{stateInfo.text}</h5>
        <img
          src="https://cdn.univ20.com/wp-content/uploads/2016/03/06df40100dc3614b1f183f7a1b4e41c1-17.png"
          className="thumbnail"
          alt="품목"
        />
        <div className="product-section align-center">
          <p className="productTitle">{shopData.name}</p>
          <span className="productPrice">{shopData.totalPrice}</span>
          <span>*</span>
          <span className="quantity">{shopData.quantity}개</span>
        </div>
        <button className="btn_detailed">상세정보</button>
      </div>
    </StyledPurchaseSection>
  );
};

export const StyledPurchaseSection = styled.div`
  .section-left {
    flex-wrap: wrap;
    height: fit-content;
    text-align: left;
    padding: 30px;
    margin-bottom: 30px;

    > h5 {
      width: 100%;
      font-size: 1.5rem;
      color: ${(props) => props.$statecolor};
    }

    > .thumbnail {
      width: 64px;
      height: 64px;
    }

    > .product-section {
      width: calc(100% - 194px);
    }

    > .productPrice,
    .quntity {
    }

    > .btn_detailed {
      width: 100px;
    }
    
  }
  .section-left>*:last-child {
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

  .product-section {
    margin-left: 20px;
  }
`;
export default PurchaseHistorySection;
