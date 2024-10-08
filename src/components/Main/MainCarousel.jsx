import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mainCarousel1 from "../../static/mainCarousel1.jpg"
import mainCarousel2 from "../../static/mainCarousel2.jpg"
import mainCarousel3 from "../../static/mainCarousel3.jpg"
import mainCarousel4 from "../../static/mainCarousel4.jpg"



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
                    <img src={mainCarousel1} alt="" style={{height: '700px', width: '100%'}}/>
                </div>  
                <div>
                    <img src={mainCarousel2} alt="" style={{height: '700px', width: '100%'}}/>
                </div>
                <div>
                    <img src={mainCarousel3} alt="" style={{height: '700px', width: '100%'}}/>
                </div>
                <div>
                    <img src={mainCarousel4} alt="" style={{height: '700px', width: '100%'}}/>
                </div>
            </Slider>
        </div>
    );
}

export default MainCarousel;
