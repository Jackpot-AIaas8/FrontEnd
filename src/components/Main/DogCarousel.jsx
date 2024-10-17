import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import apiClient from "../../token/AxiosConfig";
import styled from "styled-components";
import { apiNoToken } from "../../token/AxiosConfig";

function DogCarousel() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const dogListAPI = async () => {
      try {
        const response = await apiClient.get("dog/dogList", {
          params: {
            page: 1,
            size: 10,
            sort: "heart",
          },
        });
        setDogs(response.data.dogList);
      } catch (err) {
        console.error(err);
      }
    };
    dogListAPI();
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <div
      className="slider-container"
      style={{ marginBottom: "200px", width: "100%" }}
    >
      <Slider {...settings}>
        {dogs.map((dog) => (
          <StyledWrapper key={dog.dogId}>
            <div className="card">
              <div className="card-image">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWAKSR0zHQrRZfEUhbpewPESqP85h9afAquw&s"
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <p className="card-title">{dog.name}</p>
              <p className="card-body">
                <span>{dog.age}살</span>
              </p>
              <p className="card-body">{dog.species}</p>
            </div>
          </StyledWrapper>
        ))}
      </Slider>
    </div>
  );
}

const StyledWrapper = styled.div`
  .card {
    padding: 20px;
    width: 330px;
    min-height: 370px;
    border-radius: 20px;
    transition: 0.4s;
  }

  .card:hover {
    translate: 0 -10px;
  }

  .card-title {
    font-size: 18px;
    font-weight: 600;
    color: #2e54a7;
    margin: 15px 0 0 10px;
  }

  .card-image {
    min-height: 170px;
    background-color: #c9c9c9;
    border-radius: 15px;
    box-shadow: inset 8px 8px 10px #c3c3c3, inset -8px -8px 10px #cfcfcf;
    overflow: hidden; /* 이미지가 부모를 넘지 않도록 */
  }

  .card-body {
    margin: 13px 0 0 10px;
    color: rgb(31, 31, 31);
    font-size: 15px;
  }

  .footer {
    float: right;
    margin: 28px 0 0 18px;
    font-size: 13px;
    color: #636363;
  }

  .by-name {
    font-weight: 700;
  }
`;

export default DogCarousel;
