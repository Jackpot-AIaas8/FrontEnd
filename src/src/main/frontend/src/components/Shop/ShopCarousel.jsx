import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dogSupplies from "../../static/images/dogSupplies.jpg"
import dogSupplies2 from "../../static/images/dogSupplies2.jpg"

function MainCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    
  };
  return (
    <div className="slider-container" style={{display: "block", width: '60%', margin: "30px auto"}}>
      <Slider {...settings}>
        <div>
          <img src={dogSupplies} alt="" style={{height: '400px', width: '100%', margin: "0 auto"}}/>
        </div>
        <div>
          <img src={dogSupplies2} alt="" style={{height: '400px', width: '100%', margin: "0 auto"}}/>
        </div>
      </Slider>
      </div>
  );
}
export default MainCarousel;
