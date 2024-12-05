import { Box, Grid2 } from "@mui/material";
import styles from "./css/Home.module.css";
import DurationCom from "../Components/Durations";
import Range from "../Components/Range";
import Visitors from "../Components/Visitors";
import Search from "../Components/Search";
import Piechart from "../Components/Piechart";
import MapData from "../Components/MapData";
const Home = () => {
  return (
    <Box className={styles.wrapContainer}>
      <Box className={styles.RangeContainer}>
        <Box className={styles.select}>
          <Range />
        </Box>
      </Box>
      <Box className={styles.mainContainer}>
        <Grid2 container spacing={2} className={styles.firstContainer}>
          <Grid2 className={styles.chartBox} size={{ xs: 12, sm: 12, md: 9 }}>
            <DurationCom />
          </Grid2>
          <Grid2
            className={styles.activeVisitorsBox}
            size={{ xs: 12, sm: 12, md: 3 }}
          >
            <Visitors />
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2} className={styles.secondContainer}>
          <Grid2 className={styles.mapBox} size={{ xs: 12, sm: 12, md: 7 }}>
            <MapData />
          </Grid2>
          <Grid2 className={styles.trafficBox} size={{ xs: 12, sm: 12, md: 5 }}>
            <Search />
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2} className={styles.thirdContainer}>
          <Grid2 className={styles.pieChart} size={{ xs: 12, sm: 12, md: 4 }}>
            <Piechart />
          </Grid2>
          <Grid2 className={styles.pageBox} size={{ xs: 12, sm: 12, md: 8 }}>
            Active Vistors
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default Home;
