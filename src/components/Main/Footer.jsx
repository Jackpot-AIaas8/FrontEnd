import React from "react";
import {Box, Typography, Grid2, Button, Link} from "@mui/material";
import theme from "../../config/theme";

const Footer = () => {
    return (
        <Box
            sx={{
                padding: "2rem",
                marginTop: "20px",
                backgroundColor: theme.colors.gray
            }}
        >
            <Grid2 container spacing={2} justifyContent="center" alignItems="center">
                {/* 메인 이미지 */}
                {/*<Grid2 item xs={12} md={6}>*/}
                {/*    <img*/}
                {/*        src="이미지_URL"*/}
                {/*        alt="description"*/}
                {/*        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}*/}
                {/*    />*/}
                {/*</Grid2>*/}

                {/* 텍스트 영역 */}
                <Grid2 xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Team JackPot
                    </Typography>
                    <Typography variant="body2" paragraph>
                        안녕하세요 잭팟 입니다. 여기는 푸터 영역 입니다
                    </Typography>
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Team JackPot
                    </Typography>
                    <Typography variant="body2" paragraph>
                        안녕하세요 잭팟 입니다. 여기는 푸터 영역 입니다
                    </Typography>
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Team JackPot
                    </Typography>
                    <Typography variant="body2" paragraph>
                        안녕하세요 잭팟 입니다. 여기는 푸터 영역 입니다
                    </Typography>
                </Grid2>
            </Grid2>

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
