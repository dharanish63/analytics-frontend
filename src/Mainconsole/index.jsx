import { Box } from "@mui/material";
import Home from "./Pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import NoData from "./Pages/Nodata";
import { useDomain } from "../store/useDomain";
const MainIndex = () => {
  const { selectedDomain } = useDomain();
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Routes>
        <Route path="/domain/:id" element={<Home />} />
        <Route path="/no-data" element={<NoData />} />
        <Route
          path="*"
          element={
            selectedDomain?.value ? (
              <Navigate to={`./domain/${selectedDomain?.value}`} replace />
            ) : (
              <Navigate to="./no-data" replace />
            )
          }
        />
      </Routes>
    </Box>
  );
};

export default MainIndex;
