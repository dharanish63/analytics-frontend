import { Box } from "@mui/material";
import styles from "./css/Home.module.css";
import NoResult from "../../assets/NoData.jpg";
import Range from "../Components/Range";
const Nodata = () => {
  return (
    <Box className={styles.wrapContainer}>
      <Box className={styles.RangeContainer}>
        <Box className={styles.select}>
          <Range />
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img src={NoResult} alt="No data Available" className={styles.image} />
      </Box>
    </Box>
  );
};

export default Nodata;
