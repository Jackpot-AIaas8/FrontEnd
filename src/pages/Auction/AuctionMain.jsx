import Sidebar from "../../components/Shop/SideBar";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import AuctionCarousel from "../../components/Auction/AuctionCarousel"
import styled from "styled-components";
import Button from "../../components/Auction/AuctionButton";

const AuctionMain = () => {
  return (
    <>
      <Container style={{ marginTop: "200px" }}>
        <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={7} style={{ height: "400px" }}>
            <div>
              <AuctionCarousel />
            </div>
          </Grid>
          <Grid size={5}>
            <Grid container spacing={2}>
              <Grid size={12} style={{ marginTop: "100px" }}>
                <div>
                  <strong style={{ fontSize: "30px", fontWeight: "20px" }}>
                    개모차
                  </strong>
                  <span style={{ marginLeft: "8px" }}>Jackpot사 제품</span>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={12} style={{ marginTop: "50px" }}>
                <div>
                  <p style={{ fontsize: "15px" }}>
                    강아지가 아주 편해하는 개모차 강아지가 아주 편해하는 개모차
                    강아지가 아주 편해하는 개모차 강아지가 아주 편해하는 개모차
                  </p>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={6} style={{ marginTop: "50px" }}>
                <div>
                  <p>경매 시작가</p>
                </div>
              </Grid>
              <Grid size={6} style={{ marginTop: "50px" }}>
                <div>
                  <p>상품 가격</p>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={6}>
                <div>
                  <strong>30,000원</strong>
                </div>
              </Grid>
              <Grid size={6}>
                <div>
                  <strong>100,000원</strong>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={6} style={{height: "40px"}}>
            <Button text="뒤로가기"/>
          </Grid>
          <Grid size={6} >
            <Button text="입장하기"/>
          </Grid>
          <Grid size={12}>
            <div>
              <strong style={{ fontSize: "20px" }}>
                경매장은 VIP이상의 회원만 입장 가능합니다.
              </strong>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Sidebar />
    </>
  );
};

export default AuctionMain;
