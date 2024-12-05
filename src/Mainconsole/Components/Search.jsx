import {
  Box,
  Grid2,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Button,
} from "@mui/material";
import { useState } from "react";
import styles from "./css/search.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const Search = () => {
  const [tab, setTab] = useState(0);
  const [value, setValue] = useState("");
  return (
    <Box className={styles.container}>
      <Grid2 container className={styles.tab}>
        <Box
          className={styles.textContainer}
          onClick={() => setTab(0)}
          sx={{ borderColor: tab === 0 ? "#000AFF" : "#fff" }}
        >
          <Typography
            className={styles.titleText}
            sx={{ color: tab === 0 ? "#000AFF" : "grey" }}
          >
            Traffic Channels
          </Typography>
        </Box>
        <Box
          className={styles.textContainer}
          onClick={() => setTab(1)}
          sx={{ borderColor: tab === 1 ? "#000AFF" : "#fff" }}
        >
          <Typography
            className={styles.titleText}
            sx={{ color: tab === 1 ? "#000AFF" : "grey" }}
          >
            Source Medium
          </Typography>
        </Box>
        <Box>
          <FormControl
            sx={{
              m: 1,
              minWidth: 100,
              backgroundColor: "white",
            }}
            size="small"
          >
            <InputLabel
              id="demo-select-small-label"
              className={styles.inputLabel}
            >
              Users
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={value}
              label="Age"
              // onChange={handleChange}
              sx={{
                "& .MuiSelect-select": {
                  padding: "0.3rem",
                },
                width: {
                  xs: "100%",
                  sm: "80%",
                  md: "75%",
                  lg: "100%",
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid2>
      <Grid2 container direction="column" className={styles.maincontainer}>
        <Box>
          <Box className={styles.boxcontainer}>
            <Typography className={styles.boxtext}>
              Organic Search(SEO)
            </Typography>
            <Typography className={styles.boxtext}>1000</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={60}
            className={styles.progressBar}
            sx={{
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#000AFF",
                borderRadius: "1rem",
              },
              height: "5px",
            }}
          />
        </Box>
        <Box>
          <Box className={styles.boxcontainer}>
            <Typography className={styles.boxtext}>Paid Search(PPC)</Typography>
            <Typography className={styles.boxtext}>1000</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={60}
            className={styles.progressBar}
            sx={{
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#000AFF",
                borderRadius: "1rem",
              },
              // height:""
            }}
          />
        </Box>
        <Box>
          <Box className={styles.boxcontainer}>
            <Typography className={styles.boxtext}>
              Social Media Marketing
            </Typography>
            <Typography className={styles.boxtext}>1000</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={60}
            className={styles.progressBar}
            sx={{
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#000AFF",
                borderRadius: "1rem",
              },
              // height:""
            }}
          />
        </Box>
        <Box>
          <Box className={styles.boxcontainer}>
            <Typography className={styles.boxtext}> Email Marketing</Typography>
            <Typography className={styles.boxtext}>1000</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={60}
            className={styles.progressBar}
            sx={{
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#000AFF",
                borderRadius: "1rem",
              },
              // height:""
            }}
          />
        </Box>
        <Box>
          <Box className={styles.boxcontainer}>
            <Typography className={styles.boxtext}>Email Marketing</Typography>
            <Typography className={styles.boxtext}>1000</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={60}
            className={styles.progressBar}
            sx={{
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#000AFF",
                borderRadius: "1rem",
              },
              // height:""
            }}
          />
        </Box>
      </Grid2>
      <Grid2 container>
        <Box className={styles.button}>
          <Typography className={styles.buttonText}>
            View Traffic Details
          </Typography>
          <ArrowForwardIcon className={styles.icon} />
        </Box>
      </Grid2>
    </Box>
  );
};

export default Search;
