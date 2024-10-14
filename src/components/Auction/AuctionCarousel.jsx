import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import mainCarousel1 from "../../static/mainCarousel1.jpg";
import mainCarousel2 from "../../static/mainCarousel2.jpg";
import mainCarousel3 from "../../static/mainCarousel3.jpg";
import mainCarousel4 from "../../static/mainCarousel4.jpg";

function AuctionCarousel() {
  const auctionCarousels = [
    mainCarousel1,
    mainCarousel2,
    mainCarousel3,
    mainCarousel4,
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };
  return (
    <SliderContainer>
      <Slider {...settings}>
        {auctionCarousels.map((carousel, index) => (
          <div key={index} style={{borderRadius:'20px', border:'none'}}>
            <img
              src={carousel}
              alt={`carousel-${index}`}
              style={{ height: "400px", width: "100%", borderRadius:'20px', border:'none' }}
            />
          </div>
        ))}
      </Slider>
    </SliderContainer>
  );
}

const SliderContainer = styled.div`
  position: relative;
  .slick-prev,
  .slick-next {
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background-color: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-prev {
    left: 10px;
  }

  .slick-next {
    right: 10px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 20px;
    color: white;
  }
`;

export default AuctionCarousel;
