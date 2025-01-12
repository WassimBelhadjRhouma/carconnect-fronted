import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import {
  DatePicker,
  DateTimePicker,
  DateValidationError,
} from "@mui/x-date-pickers";
import CarService from "../../services/carService";
var isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
// import isSameOrAfter from 'dayjs/plugin/isSameOrAfter' // ES 2015

dayjs.extend(isSameOrAfter);

interface ComponentProps {
  handleStartDate: (date: string | Date) => void; // Callback to handle the start date
  handleEndDate: (date: string | Date) => void; // Callback to handle the end date
  clearCalendar?: () => void; // Callback to handle the end date
  handleCalendarError: (error: boolean) => void; // Callback to handle calendar errors
  blockedDates: string[];
}
const Calendar: React.FC<ComponentProps> = ({
  handleStartDate,
  handleEndDate,
  handleCalendarError,
  blockedDates,
  clearCalendar,
}) => {
  const [datesValidated, setDatesValidated] = useState(false);
  // const [startDate, setStartDate] = useState(dayjs("2025-01-20"));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minDate, setMinDate] = useState(null);

  // Add 6 months
  const sixMonthsLater = Math.floor(
    (Date.now() + 6 * 30.44 * 24 * 60 * 60 * 1000) / 1000
  );

  const shouldDisableDate = (date) => {
    // Check if the date matches any of the manually blocked dates
    return blockedDates.includes(dayjs(date).format("YYYY-MM-DD"));
  };

  return (
    <>
      <div className="mb-9">
        {/* Date and time chooser */}
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="from"
            disablePast
            maxDate={dayjs.unix(sixMonthsLater)}
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
              setMinDate(dayjs(newValue).add(3, "hour"));
              handleStartDate(newValue);
            }}
          />
        </LocalizationProvider> */}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="From"
            disablePast
            // minDate={startDate || minDate}
            maxDate={dayjs.unix(sixMonthsLater)}
            value={startDate}
            shouldDisableDate={shouldDisableDate} // Pass the function to disable dates
            onChange={(newValue) => {
              setStartDate(newValue);
              setMinDate(dayjs(newValue).add(24, "hour"));
              handleStartDate(newValue);
            }}
          />
        </LocalizationProvider>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="To"
          disablePast
          minDate={minDate}
          maxDate={dayjs.unix(sixMonthsLater)}
          value={endDate}
          onChange={(newValue) => {
            setEndDate(newValue);
            handleEndDate(newValue);
          }}
          shouldDisableDate={shouldDisableDate} // Pass the function to disable dates
          onError={(err) => {
            if (err) {
              handleCalendarError(true);
            } else {
              handleCalendarError(false);
            }
          }}
        />
      </LocalizationProvider>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="To"
          // disablePast
          minDate={startDate || minDate}
          maxDate={dayjs.unix(sixMonthsLater)}
          value={endDate}
          minTime={startDate ? dayjs(startDate).add(3, "hour") : null}
          onChange={(newValue) => {
            setEndDate(newValue);
            handleEndDate(newValue);
          }}
        />
      </LocalizationProvider> */}
    </>
  );
};

export default Calendar;
