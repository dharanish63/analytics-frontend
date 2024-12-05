import MainIndex from "./Mainconsole";
import { Navigate, Route, Routes } from "react-router-dom";
const Router = () => {
  return (
    <Routes>
      <Route path="/main/*" element={<MainIndex />} />
      <Route path="*" element={<Navigate to={"/main"} />} />
    </Routes>
  );
};

export default Router;
