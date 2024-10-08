import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";

import { useNavigate } from "react-router-dom";
import HeartButton from "./HeartButton";

const Dog = ({ dog, onHeartToggle }) => {
  const [checkImage, setCheckImage] = useState(false);
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (dog.image) {
      setCheckImage(true);
      setImage(dog.image);
    } else {
      setCheckImage(false);
      setImage("");
    }
  }, [dog.image]);

  const handleDogDetail = () => {
    navigate(`/dog/${dog.dogId}`);
  };

  return (
    <>
      <Container>
        <Grid container flexDirection={"column"}>
          <Card
            onClick={handleDogDetail}
            sx={{ maxWidth: 250, position: "relative", overflow: "visible" }}
          >
            <CardActionArea
              sx={{
                zIndex: 0,
              }}
            >
              {checkImage ? (
                <CardMedia
                  sx={{ height: 140 }}
                  component="img"
                  image={image}
                  loading="lazy"
                />
              ) : (
                <Skeleton
                  animation="wave"
                  variant="rectangular" // 직사각형 형태로 Skeleton을 설정
                  sx={{
                    width: "100%",
                    height: 140,
                    bgColor: "#bbbbbb", // 배경 색상이 적용됨
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></Skeleton>
              )}
              <CardContent>
                <Typography>{dog.name}</Typography>
                <Typography>{dog.species}</Typography>
                <Typography>{dog.heart}</Typography>
              </CardContent>
            </CardActionArea>
            <HeartButton dog={dog} onHeartToggle={onHeartToggle} />
          </Card>
        </Grid>
      </Container>
    </>
  );
};

export default Dog;
