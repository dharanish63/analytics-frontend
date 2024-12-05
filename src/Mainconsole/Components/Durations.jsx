import { Box, Grid2, Typography } from "@mui/material";
// import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// import { formatDistanceToNow } from "date-fns";
// import { useQuery } from "@tanstack/react-query";
// import { useUser } from "../../Store/userStore";
// import { useDomain } from "../../Store/usedomain";
import styles from "./css/Duration.module.css";
import { useState, useEffect } from "react";
import { useDomain } from "../../store/useDomain";
import axios from "axios";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
// const Rangefetcher = async ({ queryKey }) => {
//   const { startDate, endDate, selectedDomain } = queryKey[1];
//   const formattedStartDate = format(startDate, "yyyy-MM-dd");
//   const formattedEndDate = format(endDate, "yyyy-MM-dd");
//   const url = `${process.env.REACT_APP_DEV_URL}/record/get-bounce-rate/${selectedDomain.value}?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
//   const token = process.env.REACT_APP_AUTH_TOKEN;

//   const response = await axios.get(url, {
//     headers: {
//       Authorization: token,
//     },
//   });
//   console.log("rangedata", response.data);
//   return response.data;
// };
const DurationCom = () => {
  // const { token } = useUser();
  // const { selectedDomain } = useDomain();
  const [tab, setTab] = useState(0);
  const [chartData, setChartData] = useState();
  // const [usersData, setUserData] = useState();
  // const [sessionsData, setSessionsData] = useState();
  // const [sessionData, setSessionData] = useState();
  // const [durationData, setDurationData] = useState();
  // const [data, setdata] = useState("");
  const { setSelectedDomain, selectedDomain, startDate, endDate } = useDomain();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["duration", { selectedDomain, startDate, endDate, tab }],
    queryFn: async ({ queryKey }) => {
      const { startDate, endDate, selectedDomain } = queryKey[1];
      const formattedStartDate = format(startDate, "yyyy-MM-dd");
      const formattedEndDate = format(endDate, "yyyy-MM-dd");
      const url = `${process.env.REACT_APP_DEV_URL}/record/get-bounce-rate/${selectedDomain.value}?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
      const token = process.env.REACT_APP_AUTH_TOKEN;

      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      console.log("rangedata", response.data);
      return response.data;
    },
  });
  console.log("start Data", startDate);
  console.log("end data", endDate);
  console.log("domain", selectedDomain.value);
  console.log("url", process.env.REACT_APP_DEV_URL);
  const usersData = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  const sessionsData = [
    { name: "Page A", uv: 5000, pv: 3200, amt: 2500 },
    { name: "Page B", uv: 4000, pv: 1500, amt: 2000 },
    { name: "Page C", uv: 3000, pv: 7000, amt: 2500 },
    { name: "Page D", uv: 3500, pv: 4700, amt: 2300 },
    { name: "Page E", uv: 4200, pv: 5200, amt: 2600 },
    { name: "Page F", uv: 4600, pv: 3800, amt: 2700 },
    { name: "Page G", uv: 3900, pv: 4300, amt: 2500 },
  ];

  const bounceData = [
    { name: "Page A", uv: 1000, pv: 2400, amt: 1200 },
    { name: "Page B", uv: 1200, pv: 1800, amt: 1400 },
    { name: "Page C", uv: 1300, pv: 2200, amt: 1500 },
    { name: "Page D", uv: 1400, pv: 2000, amt: 1600 },
    { name: "Page E", uv: 1100, pv: 2100, amt: 1350 },
    { name: "Page F", uv: 900, pv: 2000, amt: 1300 },
    { name: "Page G", uv: 1500, pv: 2300, amt: 1700 },
  ];

  const durationData = [
    { name: "Page A", uv: 4000, pv: 3500, amt: 3000 },
    { name: "Page B", uv: 4500, pv: 3200, amt: 2800 },
    { name: "Page C", uv: 4200, pv: 3300, amt: 2900 },
    { name: "Page D", uv: 5000, pv: 3800, amt: 3500 },
    { name: "Page E", uv: 5500, pv: 3900, amt: 3600 },
    { name: "Page F", uv: 4600, pv: 4000, amt: 3100 },
    { name: "Page G", uv: 4700, pv: 4100, amt: 3400 },
  ];

  // Update the chart data when the tab changes
  useEffect(() => {
    if (tab === 0) {
      setChartData(usersData);
    } else if (tab === 1) {
      setChartData(sessionsData);
    } else if (tab === 2) {
      setChartData(bounceData);
    } else if (tab === 3) {
      setChartData(durationData);
    }
  }, [tab]);

  console.log("start", startDate);
  console.log("end", endDate);
  return (
    <Box className={styles.container}>
      <Grid2 container className={styles.tab}>
        <Box
          className={styles.textContainer}
          onClick={() => setTab(0)}
          sx={{ borderColor: tab == 0 ? "#000AFF" : "#fff" }}
        >
          <Typography
            className={styles.titleText}
            sx={{ color: tab == 0 ? "#000AFF" : "grey" }}
          >
            Users
          </Typography>
          <Typography className={styles.value}>13,000</Typography>
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
            Sessions
          </Typography>
          <Typography className={styles.value}>17,000</Typography>
        </Box>
        <Box
          className={styles.textContainer}
          onClick={() => setTab(2)}
          sx={{ borderColor: tab === 2 ? "#000AFF" : "#fff" }}
        >
          <Typography
            className={styles.titleText}
            sx={{ color: tab === 2 ? "#000AFF" : "grey" }}
          >
            Bounce
          </Typography>
          <Typography className={styles.value}>58.9%</Typography>
        </Box>
        <Box
          className={styles.textContainer}
          onClick={() => setTab(3)}
          sx={{ borderColor: tab === 3 ? "#000AFF" : "#fff" }}
        >
          <Typography
            className={styles.titleText}
            sx={{ color: tab === 3 ? "#000AFF" : "grey" }}
          >
            Duration
          </Typography>
          <Typography className={styles.value}>3m 22s</Typography>
        </Box>
      </Grid2>
      <Grid2 container>
        <Box className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={730}
              height={250}
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000AFF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#000AFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                style={{ fontSize: "10px" }}
                tickLine={false}
              />
              <YAxis axisLine={false} style={{ fontSize: "10px" }} />
              <Tooltip />
              <Area
                dataKey="uv"
                stroke="#000AFF"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              {/* <Area
              type="monotone"
              dataKey="pv"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            /> */}
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Grid2>
    </Box>
  );
};

export default DurationCom;
