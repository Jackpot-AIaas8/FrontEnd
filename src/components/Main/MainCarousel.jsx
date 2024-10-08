import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dog1 from "../../static/dog1.jpg"
import dog2 from "../../static/dog2.jpeg"

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
        <div className="slider-container" style={{display: "block"}}>
            <Slider {...settings}>
                <div>
                    <img src={dog1} alt="" style={{height: '700px', width: '100%'}}/>
                </div>
                <div>
                    <img src={dog2} alt="" style={{height: '700px', width: '100%'}}/>
                </div>
            </Slider>
        </div>
    );
}

export default MainCarousel;
