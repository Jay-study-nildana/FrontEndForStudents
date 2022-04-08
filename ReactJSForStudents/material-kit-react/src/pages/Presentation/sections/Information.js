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

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Images
import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/rotating-card-bg-back.jpeg";

function Information() {
  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                icon="touch_app"
                title={
                  <>
                    I am 
                    <br />
                    Jay
                  </>
                }
                description="I would like to teach you coding."
              />
              <RotatingCardBack
                image={bgBack}
                title="Just keep spinning"
                description="You will truly enjoy learning with me."
                action={{
                  type: "external",
                  route: "https://jay-study-nildana.github.io/developerprofile/",
                  label: "contact me",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="content_copy"
                  title="Top Rated on Upwork"
                  description="At the time of building this website, April 2022, I am a Top Rated badge holder on Upwork. "
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="flip_to_front"
                  title="Level Two on Fiverr"
                  description="At the time of building this website, April 2022, I am Level Two on Fiverr"
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="price_change"
                  title="Excellent Spoken English"
                  description="All of my clients are from the western world, and I speak with a neutral English accent"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="devices"
                  title="Punctual"
                  description="I am either on time, or 10 minutes early"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
