import {
  Box,
  Grid2,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import styles from "./css/visitors.module.css";
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useDomain } from "../../store/useDomain";
const fetcher = async ({ queryKey }) => {
  const selectedDomain = queryKey[1];
  const url = `${process.env.REACT_APP_DEV_URL}/session/activeusers/${selectedDomain.value}`;
  const token = process.env.REACT_APP_AUTH_TOKEN;

  const response = await axios.get(url, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const Visitors = () => {
  const data1 = [
    { name: "Page A", uv: 4000, pv: 2400 },
    { name: "Page B", uv: 3000, pv: 1398 },
    { name: "Page C", uv: 2000, pv: 9800 },
    { name: "Page D", uv: 2780, pv: 3908 },
    { name: "Page E", uv: 1890, pv: 4800 },
    { name: "Page F", uv: 2390, pv: 3800 },
    { name: "Page G", uv: 3490, pv: 4300 },
  ];
  const { selectedDomain } = useDomain();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["visitorsdata", selectedDomain],
    queryFn: fetcher,
  });
  console.log("data", data);
  console.log("domain", selectedDomain);
  return (
    <Box className={styles.wrapContainer}>
      <Grid2 container className={styles.textContainer}>
        <Typography className={styles.text1}>Active users right now</Typography>
        <Typography className={styles.text2}>1,920</Typography>
      </Grid2>
      <Box className={styles.chartContainer}>
        <ResponsiveContainer
          width="100%"
          height="50%"
          left={0}
          className={styles.areachart}
        >
          <BarChart width={730} height={250} data={data1}>
            <XAxis
              dataKey="name"
              axisLine={false}
              style={{ fontSize: "10px" }}
              hide={true}
            />
            <YAxis axisLine={false} style={{ fontSize: "10px" }} hide={true} />
            {/* <Tooltip /> */}
            {/* <Bar dataKey="pv" fill="#8884d8" /> */}
            <Bar dataKey="uv" fill="#000AFF" barSize={15} />
          </BarChart>
        </ResponsiveContainer>
        <Box className={styles.activeText}>
          <Typography className={styles.activeText1}>
            Top active pages
          </Typography>
          <Typography className={styles.activeText2}>Active users</Typography>
        </Box>
        <List>
          {data?.map((item, index) => (
            <ListItem
              key={index}
              sx={{ borderTop: "2px solid white", padding: "0.3rem 0.5rem" }}
            >
              <Box className={styles.listitemContainer}>
                <Typography className={styles.listitemText1}>
                  /{item.pageUrl}
                </Typography>
                <Typography className={styles.listitemText2}>
                  {item.activeUsers}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          textAlign: "end",
          width: "100%",
          // padding: "5px",
        }}
      >
        <Typography className={styles.text}>Real-time report</Typography>
      </Box>
    </Box>
  );
};

export default Visitors;
