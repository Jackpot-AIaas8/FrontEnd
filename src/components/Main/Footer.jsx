import React from "react";
import { Box, Typography, Grid, Button, Link } from "@mui/material";
import theme from "../../config/theme";

const Footer = () => {
    return (
        <Box
            sx={{
                padding: "2rem",
                marginTop: "20px",
                backgroundColor: "#f2f2f2",
            }}
        >
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                {/* 텍스트 영역 */}
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        PPyPPy와 함께하는 사랑의 소식, 지금 받아보세요
                    </Typography>
                    <Typography variant="body2" paragraph style={{}}>
                        뉴스레터 신청하기
                        <hr style={{ borderColor: "#ff7600" }} />
                    </Typography>
                </Grid>

                {/* 각 Grid가 하나의 행을 차지하도록 xs={12} 적용 */}
                <Grid item xs={12}>
                    <Typography variant="body1" gutterBottom>
                        자주하는 질문 | 사이트맵 | 이용약관 | 아동 및 성인 보호 정책 | 개인정보처리방침 | 인재채용
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="body1" gutterBottom>
                        <b>Team JackPot</b> - <b>팀장</b> 김학현 <b>팀원</b> 김명진 김민준 김현빈 박우람 전세계
                    </Typography>
                </Grid>
            </Grid>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    marginTop: "2rem",
                    padding: "1rem",
                    color: "black",
                    textAlign: "center",
                }}
            >
                <Typography variant="body2">
                    © 2024 My Website. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;
