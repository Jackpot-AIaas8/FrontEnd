import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Skeleton,
  
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";

import { useNavigate } from "react-router-dom";
import HeartButton from "./HeartButton";
import getTimeAgo from "../detailComponent/GetTImeAgo";

const Dog = ({ dog, onHeartToggle }) => {
  const [checkImage, setCheckImage] = useState(false);
  const [thumbNail, setThumbNail] = useState("");

  const navigate = useNavigate();

  const categories = [dog.name , dog.species];

  useEffect(() => {
    if (dog.thumbNail) {
      setCheckImage(true);
      setThumbNail(dog.thumbNail);
    } else {
      setCheckImage(false);
      setThumbNail("");
    }
  }, [dog.thumbNail]);

  const handleDogDetail = () => {
    navigate(`/dog/${dog.dogId}`);
  };

  return (
    <>
      <Container disableGutters>
        <Grid container flexDirection={"column"}>
          <Card
            onClick={handleDogDetail}
            sx={{ minWidth: "100%", position: "relative", paddingTop:"10px" }}
          >
            <CardActionArea
              sx={{
                zIndex: 0
              }}
            >
              {checkImage ? (
                <CardMedia
                  sx={{ height: 140, objectFit: "scale-down"}}
                  component="img"
                  image={thumbNail}
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
                
                {categories.map((category, index)=>
                  <p key={index}className="category">{category}</p>
                )}
                
                <p>{dog.regDate.slice(0, 10)}</p>
                <p>{getTimeAgo(dog.regDate)}</p>

                
                
                <p>{dog.heart}</p>
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
