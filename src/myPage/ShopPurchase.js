import { StyledPurchaseSection } from "../myPage/Mypage.styles";
import { Card } from "@mui/material";

const PurchaseHistory = ({ shopData }) => {
  console.log(shopData);
  const getState = (state) => {
    switch (state) {
      case 0:
        return "배송 준비 중";
      case 1:
        return "배송 중";
      case 2:
        return "배송 완료";
      default:
        return "알 수 없음";
    }
  };

  return (
    <StyledPurchaseSection>
      {/* left-section */}

      <div className="section-left flex">
        <h2 className="status">{getState(shopData.deliveryState)}</h2>
        <img
          src="https://cdn.univ20.com/wp-content/uploads/2016/03/06df40100dc3614b1f183f7a1b4e41c1-17.png"
          className="thumbnail"
          alt="품목"
        />
        <div className="product-section align-center">
          <p className="productTitle">{shopData.productDTO.exampleName}</p>{" "}
          {/*상품명*/}
          <span className="productPrice">
            {shopData.productDTO.productPrice}
          </span>
          <span>*</span>
          <span className="quntity">{shopData.productDTO.quantity}개</span>
        </div>
        <button className="btn_detailed">상세정보</button>
      </div>
    </StyledPurchaseSection>
  );
};

export default PurchaseHistory;
