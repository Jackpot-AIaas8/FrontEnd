import React from "react";
import AuctionWebSocket from "../../config/AuctionWebSocket";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AuctionCarousel from "../../components/Auction/AuctionCarousel";

import styled from "styled-components";

const Auction = () => {
  return (
    <>
      <Container>
        <Grid container spacing={6} columns={16} style={{ marginTop: "200px" }}>
          <Grid size={4}>
            <StyledTypography variant="h4" component="h2">
              개모차
              <StyledTypography variant="caption"> ㈜Jackpot</StyledTypography>
            </StyledTypography>
            <hr
              style={{
                height: "3px",
                background: "black",
                margin: "30px auto 30px auto",
              }}
            />
            <StyledTypography variant="h4" component="h2">
              실시간 경매
            </StyledTypography>
            <hr
              style={{
                height: "3px",
                background: "black",
                marginTop: "30px auto 30px auto",
              }}
            />
          </Grid>
          <Grid size={8}>
            <AuctionCarousel />
          </Grid>
          <Grid size={4}>size=grow</Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container spacing={6} columns={16} style={{ marginTop: "100px" }}>
          <Grid size={8}>left</Grid>
          <Grid size={8}>right</Grid>
        </Grid>
      </Container>
    </>
  );
};

const StyledTypography = styled(Typography)`
  font-family: "Noto Sans KR", sans-serif;
`;

export default Auction;
