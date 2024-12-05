import {
  FormControl,
  Select,
  MenuItem,
  Box,
  OutlinedInput,
  InputAdornment,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContentText,
  Button,
  DialogContent,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import styles from "./css/Range.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Select1 from "react-select";
import { useNavigate } from "react-router-dom";
import { useDomain } from "../../store/useDomain";
import DateFIlter from "./DateFIlter";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS
import { enUS } from "date-fns/locale";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import format from "date-fns/format";
const fetcher = async () => {
  const url = `${process.env.REACT_APP_DEV_URL}/domain/get-domains`;
  const token = process.env.REACT_APP_AUTH_TOKEN;

  const response = await axios.get(url, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const Range = () => {
  const [value, setValue] = useState("allusers");
  const [domainValue, setDomainValue] = useState("none");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [domainName, setDomainName] = useState("");
  const [domainAddress, setDomainAddress] = useState("");
  const [successSnackBar, setSuccessSnackBar] = useState(false);
  const {
    setSelectedDomain,
    selectedDomain,
    startDate,
    endDate,
    setEndDate,
    setStartDate,
  } = useDomain();
  const [isPickerOpen, setPickerOpen] = useState(false);
  const today = new Date();
  const dayOfWeek = today.getDay();
  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(today.getDate() - dayOfWeek - 7);
  const lastWeekEnd = new Date(today);
  lastWeekEnd.setDate(today.getDate() - dayOfWeek - 1);
  const [selectionRange, setSelectionRange] = useState({
    startDate: lastWeekStart,
    endDate: lastWeekEnd,
    key: "selection",
  });
  setStartDate(selectionRange?.startDate);
  setEndDate(selectionRange?.endDate);
  const Navigate = useNavigate();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["get-data"],
    queryFn: fetcher,
  });
  const { data: isRange } = useQuery({
    queryKey: ["range-data", selectedDomain],
    queryFn: async () => {
      const formatstart = startDate.split("T")[0];
      const formatend = endDate.split("T")[0];
      const url = `${process.env.REACT_APP_DEV_URL}/record/get-bounce-rate/${selectedDomain.value}?startDate=${formatstart}&endDate=${formatend}`;
      const token = process.env.REACT_APP_AUTH_TOKEN;
      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    },
  });
  console.log("range", isRange);
  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const togglePicker = () => {
    setPickerOpen(!isPickerOpen);
  };
  const handleclose = () => {
    setOpen("");
    setError("");
  };
  const handledomain = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DEV_URL}/domain/create-domain`,
        { domainName, domain_url: domainAddress },
        {
          headers: {
            Authorization: process.env.REACT_APP_AUTH_TOKEN,
            "x-workspace": process.env.REACT_APP_WORKSPACEID,
          },
        }
      );
      setOpen(false);
      if (response.data) {
        setSelectedDomain(response.data[0].domainName);
        setSuccessSnackBar(true);
      }
      console.log("domain", response.data);
    } catch (error) {
      setError(error);
    }
  };
  if (data?.length === 0) return Navigate("/main/no-data");
  const formattedOptions = data?.map((domain) => ({
    value: domain.domainId,
    label: domain.domainName,
  }));

  const handleChange = (domain) => {
    setSelectedDomain(domain);
    Navigate(`/main/domain/${domain.value}`);
  };
  const handleDone = () => {
    setPickerOpen(false); // Close the picker when done
    console.log("Selected Range:", selectionRange);
  };

  const handleClear = () => {
    setSelectionRange({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
    setPickerOpen(false);
  };
  // if (startDate instanceof Date && !isNaN(startDate)) {
  //   const formattedStartDate = format(selectionRange.startDate, "yyyy-MM-dd");
  //   console.log("hgch", formattedStartDate); // Output: "2024-12-24"
  // } else {
  //   console.log("Invalid date");
  // }
  // console.log("Start Date:", selectionRange.startDate);
  // console.log("End Date:", selectionRange.endDate);
  console.log("selectedrange", startDate, endDate);

  return (
    <Box className={styles.wrapContainer}>
      <Box className={styles.iconContainer}>
        <DomainAddIcon
          sx={{ fontSize: "1.5rem" }}
          className={styles.icon}
          onClick={togglePicker}
        />
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
          <DialogTitle id="alert-dialog-title">{"Add New Domain"}</DialogTitle>
          <DialogContent>
            {error && (
              <Alert severity="error" className={styles.error}>
                {" "}
                {error.message}
              </Alert>
            )}
            <TextField
              className={styles.textField}
              fullWidth
              label="Website name"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
            />
            <TextField
              className={styles.textField}
              fullWidth
              label="Website address"
              value={domainAddress}
              onChange={(e) => setDomainAddress(e.target.value)}
            />
          </DialogContent>
          <DialogActions className={styles.dialogActions}>
            <Button onClick={handleclose} sx={{ fontSize: "0.686rem" }}>
              Close
            </Button>
            <Button onClick={handledomain} autoFocus>
              Add Domain
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={successSnackBar}
          autoHideDuration={3000}
          onClose={() => setSuccessSnackBar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSuccessSnackBar(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Domain created successfully!
          </Alert>
        </Snackbar>
      </Box>
      <Box
        sx={{
          m: 1,
          minWidth: 100,
          backgroundColor: "white",
        }}
      >
        <Select1
          options={formattedOptions}
          value={selectedDomain}
          onChange={(domainValue) => handleChange(domainValue)}
          placeholder="Select a domain"
          styles={{
            control: (provided) => ({
              ...provided,
              padding: "2px",
              fontSize: "0.8rem",
              fontWeight: "500",
              height: "2rem",
              fontFamily: "Arial, sans-serif",
            }),
            menu: (provided) => ({
              ...provided,
              fontSize: "0.8rem",
              width: "100%",
            }),
            placeholder: (provided) => ({
              ...provided,
              fontSize: "0.8rem",
            }),
          }}
          noOptionsMessage={() => "No data available"}
        />
      </Box>
      <Box>
        <FormControl
          sx={{
            m: 1,
            minWidth: 100,
            backgroundColor: "white",
          }}
          // className={styles.formcontrol}
          size="small"
        >
          <Select
            id="demo-select-small"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            // inputProps={{ "aria-label": "Without label" }}
            sx={{
              "& .MuiSelect-select": {
                padding: "0.1rem 0.3rem",
              },
              // width: {
              //   xs: "100%",
              //   sm: "80%",
              //   md: "75%",
              //   lg: "100%",
              // },
              fontSize: "0.8rem",
              fontWeight: "500",
              width: "100%",
              height: "2rem",
            }}
            input={
              <OutlinedInput
                startAdornment={
                  <InputAdornment position="start">
                    <CalendarMonthIcon
                      sx={{ color: "gray", fontSize: "1rem" }}
                    />
                  </InputAdornment>
                }
              />
            }
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
      <Box style={{ position: "relative" }}>
        <FilterAltOutlinedIcon
          onClick={togglePicker}
          sx={{ color: "grey", fontSize: "1.7rem", padding: "0.6rem 0" }}
        />
        {isPickerOpen && (
          <Box
            sx={{
              position: "absolute",
              zIndex: 1000,
              transform: "translateX(-100%)",
              backgroundColor: "white",
            }}
          >
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
              locale={enUS}
              direction="horizontal"
              showMonthAndYearPickers={true}
              className={styles.dateRangePicker}
              initialFocusedRange={[0, 6]}
            />

            {/* Custom Done and Clear buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                padding: "1rem",
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClear}
              >
                Clear
              </Button>
              <Button variant="outlined" onClick={handleDone}>
                Done
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Range;
