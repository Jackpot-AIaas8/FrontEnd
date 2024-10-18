import React from "react";
import AuctionWebSocket from "../../config/AuctionWebSocket";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import AuctionCarousel from "../../components/Auction/AuctionCarousel";
import Button from "../../components/Auction/AuctionButton";
import theme from "../../config/theme";

// style={{background: "#FAFAFA", borderRadius: '10px'}}
const Auction = () => {
    return (
        <>
            <Container>
                <Grid container spacing={6} columns={16} style={{marginTop: "200px", height: "600px"}}>
                    <Grid size={9}>
                        <AuctionCarousel style={{height: "100%"}}/>
                        <Typography variant="h6" component="h2">엄청 편한 개모차~ 어쩌구 저쩌구~</Typography>
                    </Grid>
                    <Grid size={7}>
                        <Stack spacing={4}>
                            <Stack spacing={2}>
                                <Typography variant="h4">낙찰까지 남은 시간</Typography>
                                <Typography variant="h4"><span style={{marginLeft:"200px", fontWeight:"bold"}}>25초</span></Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="h6"><span style={{
                                    marginLeft: "200px",
                                    marginTop: "500px",
                                    paddingTop: "100px",
                                    fontSize: "16px"
                                }}>상품 가격</span></Typography>
                                <Typography variant="bod2"><span style={{
                                    marginLeft: "150px",
                                    fontSize: "25px",
                                    fontWeight:"bold"
                                }}>1000000원</span></Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="h6"><span style={{
                                    marginLeft: "190px",
                                    marginTop: "500px",
                                    paddingTop: "100px",
                                    fontSize: "16px"
                                }}>경매 시작가</span></Typography>
                                <Typography variant="bod2"><span style={{
                                    marginLeft: "210px",
                                    fontSize: "25px",
                                    fontWeight:"bold"
                                }}>100원</span></Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="h6"><span style={{
                                    marginLeft: "160px",
                                    marginTop: "500px",
                                    paddingTop: "100px",
                                    fontSize: "16px"
                                }}>현재 최고 입찰가</span></Typography>
                                <Typography variant="bod2"><span style={{
                                    marginLeft: "190px",
                                    fontSize: "25px",
                                    fontWeight:"bold"
                                }}>45000원</span></Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
            <Container>
                <Grid container spacing={6} columns={16} style={{marginTop: "100px"}}>
                    <Grid size={8}><Button text="나가기"/></Grid>
                    <Grid size={8}>

                        <Button text="입찰하기"/>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
        ;
};


export default Auction;
