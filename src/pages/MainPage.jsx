import MainCarousel from "../components/Main/MainCarousel";
import MainContent from "../components/Main/MainContent";
import Button from "../components/Button";

function MainPage() {
    return (
        <>
            <MainCarousel/>
            <MainContent/>
            {/*<div style={{display: "inline-block", float: "right", marginRight: "50px", zIndex: 1000}}>*/}
            {/*    <Button/>*/}
            {/*</div>*/}
        </>
    );
}

export default MainPage;