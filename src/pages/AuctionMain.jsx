import Sidebar from "../components/Shop/SideBar";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import { height } from "@mui/system";

const AuctionMain = () => {
  return (
    <>
      <Container style={{marginTop: "200px"}}>
        <Grid container rowSpacing={20} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={6} style={{ backgroundColor: "red", height:"300px" }}>
            <div>
              <p>1</p>
            </div>
          </Grid>
          <Grid size={6} style={{ backgroundColor: "blue" }}>
            <div>
              <p>2</p>
            </div>
          </Grid>
          <Grid size={6} style={{ backgroundColor: "yellow", height: "100px" }}>
            <div>
              <p>2</p>
            </div>
          </Grid>
          <Grid size={6} style={{ backgroundColor: "green" }}>
            <div>
              <p>3</p>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Sidebar />
    </>
  );
};

export default AuctionMain;
