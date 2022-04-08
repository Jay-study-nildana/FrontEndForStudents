const simpleAlertsCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKAlert from "components/MKAlert";

function SimpleAlerts() {
  return (
    <MKBox component="section" py={6}>
      <Container>
        <Grid container item xs={12} lg={10} mx="auto">
          <Grid item xs={12}>
            <MKAlert color="primary">A simple primary alert—check it out!</MKAlert>
          </Grid>
          <Grid item xs={12}>
            <MKAlert color="secondary">A simple secondary alert—check it out!</MKAlert>
          </Grid>
          <Grid item xs={12}>
            <MKAlert color="success">A simple success alert—check it out!</MKAlert>
          </Grid>
          <Grid item xs={12}>
            <MKAlert color="error">A simple error alert—check it out!</MKAlert>
          </Grid>
          <Grid item xs={12}>
            <MKAlert color="warning">A simple warning alert—check it out!</MKAlert>
          </Grid>
          <Grid item xs={12}>
            <MKAlert color="info">A simple info alert—check it out!</MKAlert>
          </Grid>
          <Grid item xs={12}>
            <MKAlert color="light">A simple light alert—check it out!</MKAlert>
          </Grid>
          <Grid item xs={12}>
            <MKAlert color="dark">A simple dark alert—check it out!</MKAlert>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default SimpleAlerts;`;

export default simpleAlertsCode;
