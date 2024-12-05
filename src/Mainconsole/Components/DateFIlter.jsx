import React, { useState, useRef } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS
import { enUS } from "date-fns/locale";
import { Button } from "@mui/material"; // Optional: MUI button

const CustomDatePicker = () => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [isPickerOpen, setPickerOpen] = useState(false); // State to control picker visibility
  const calendarRef = useRef(null);

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
    setPickerOpen(false); // Close picker after selection (optional)
  };

  const togglePicker = () => {
    setPickerOpen(!isPickerOpen);
  };

  return (
    <div style={{ margin: "20px" }}>
      {/* Calendar Icon or Button */}
      <Button
        variant="outlined"
        onClick={togglePicker}
        style={{ marginBottom: "10px" }}
      >
        📅 Select Date Range
      </Button>

      {/* Conditional Rendering of DateRangePicker */}
      {isPickerOpen && (
        <div style={{ position: "absolute", zIndex: 1000 }}>
          <DateRangePicker
            ref={calendarRef}
            ranges={[selectionRange]}
            onChange={handleSelect}
            locale={enUS}
            months={2}
            direction="horizontal"
            // scroll={{ enabled: true }}
            showMonthAndYearPickers={true}
          />
        </div>
      )}
      {/* 
      Display Selected Date Range
      <div style={{ marginTop: "20px" }}>
        <p>Start Date: {selectionRange.startDate.toDateString()}</p>
        <p>End Date: {selectionRange.endDate.toDateString()}</p>
      </div> */}
    </div>
  );
};

export default CustomDatePicker;
