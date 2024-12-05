import {
  Box,
  Grid2,
  Typography,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { useState } from "react";
import styles from "./css/piechart.module.css";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
const Piechart = () => {
  const [tab, setTab] = useState(0);
  const [value, setValue] = useState("allusers");
  const data = [
    { name: "Group A", value: 30 },
    { name: "Group B", value: 70 },
    { name: "Group C", value: 900 },
  ];
  const COLORS = ["#e0e0ff", "#a1a3e7", " #000AFF"];
  return (
    <Box className={styles.piecontainer}>
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
            Devices
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
            Browser
          </Typography>
        </Box>
        <Box>
          <FormControl
            // sx={{
            //   m: 1,
            //   minWidth: 100,
            //   backgroundColor: "white",
            // }}
            className={styles.formcontrol}
            size="small"
          >
            <Select
              id="demo-select-small"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                "& .MuiSelect-select": {
                  padding: "0.1rem 0.3rem",
                },
                // width: {
                //   xs: "100%",
                //   sm: "80%",
                //   md: "100%",
                //   lg: "100%",
                // },
                fontSize: "0.8rem",
                fontWeight: "500",
              }}
            >
              <MenuItem value={"allusers"} sx={{ fontSize: "0.8rem" }}>
                All User
              </MenuItem>
              <MenuItem value={20} sx={{ fontSize: "0.8rem" }}>
                Twenty
              </MenuItem>
              <MenuItem value={30} sx={{ fontSize: "0.8rem" }}>
                Thirty
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid2>
      <Grid2>
        <Box className={styles.piechart}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={730} height={250}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
                cx="50%"
                cy="50%"
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Grid2>
      <Grid2>
        <Box className={styles.maindetails}>
          <Box>
            <Box className={styles.details}>
              <FiberManualRecordIcon
                sx={{ color: " #000AFF" }}
                className={styles.icon}
              />
              <Typography className={styles.text}>Mobile</Typography>
            </Box>
            <Typography className={styles.value}>98.10%</Typography>
          </Box>
          <Box>
            <Box className={styles.details}>
              <FiberManualRecordIcon
                sx={{ color: " #a1a3e7" }}
                className={styles.icon}
              />
              <Typography className={styles.text}>Tablet</Typography>
            </Box>
            <Typography className={styles.value}>98.10%</Typography>
          </Box>
          <Box>
            <Box className={styles.details}>
              <FiberManualRecordIcon
                sx={{ color: " #e0e0ff" }}
                className={styles.icon}
              />
              <Typography className={styles.text}>Desktop</Typography>
            </Box>
            <Typography className={styles.value}>98.10%</Typography>
          </Box>
        </Box>
      </Grid2>
    </Box>
  );
};

export default Piechart;
