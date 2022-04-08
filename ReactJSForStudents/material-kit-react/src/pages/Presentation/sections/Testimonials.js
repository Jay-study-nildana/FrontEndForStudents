/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultReviewCard from "examples/Cards/ReviewCards/DefaultReviewCard";

// Images
// import appleLogo from "assets/images/logos/gray-logos/logo-apple.svg";
// import facebookLogo from "assets/images/logos/gray-logos/logo-facebook.svg";
// import nasaLogo from "assets/images/logos/gray-logos/logo-nasa.svg";
// import vodafoneLogo from "assets/images/logos/gray-logos/logo-vodafone.svg";
// import digitalOceanLogo from "assets/images/logos/gray-logos/logo-digitalocean.svg";

function Information() {
  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          justifyContent="center"
          sx={{ mx: "auto", textAlign: "center" }}
        >
          <MKTypography variant="h2">Trusted Tutor</MKTypography>
          <MKTypography variant="h2" color="info" textGradient mb={2}>
            From student clients from all over the world.
          </MKTypography>
          <MKTypography variant="body1" color="text" mb={2}>
            Read more reviews on my <MKTypography
                                      component="a"
                                      href="https://www.linkedin.com/services/page/b1460530a450056762/"
                                      target="_blank"
                                      rel="noreferrer" >
            Linked In Page </MKTypography>
        </MKTypography>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 8 }}>
          <Grid item xs={12} md={6} lg={4}>
            <DefaultReviewCard
              name="Alexzandria Bennett"
              date="February 18th 2022"
              review="Jay goes above and beyond to help. I am forever thankful for his knowledge and kindness"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DefaultReviewCard
              color="info"
              name="Jan Bryndal"
              date="February 25th 2022"
              review="He is very professional and he can approach teaching from multiple angles. He strives and does the upmost to handle such a students as I am"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DefaultReviewCard
              name="Vincent Diciglio"
              date="March 6, 2022"
              review="Jay went above and beyond to assist me with a complex project I needed assistance with.."
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 6 }} />
        {/* <Grid container spacing={3} justifyContent="center">
          <Grid item xs={6} md={4} lg={2}>
            <MKBox component="img" src={appleLogo} alt="Apple" width="100%" opacity={0.6} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MKBox component="img" src={facebookLogo} alt="Facebook" width="100%" opacity={0.6} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MKBox component="img" src={nasaLogo} alt="Nasa" width="100%" opacity={0.6} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MKBox component="img" src={vodafoneLogo} alt="Vodafone" width="100%" opacity={0.6} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MKBox
              component="img"
              src={digitalOceanLogo}
              alt="DigitalOcean"
              width="100%"
              opacity={0.6}
            />
          </Grid>
        </Grid> */}
      </Container>
    </MKBox>
  );
}

export default Information;
