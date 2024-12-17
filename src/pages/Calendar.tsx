import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { DateTimePicker, DateValidationError } from "@mui/x-date-pickers";

export default function Calendar({ handleStartDate, handleEndDate }) {
  const [error, setError] = useState(null);
  const [datesValidated, setDatesValidated] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minDate, setMinDate] = useState(null);

  // Add 6 months
  const sixMonthsLater = Math.floor(
    (Date.now() + 6 * 30.44 * 24 * 60 * 60 * 1000) / 1000
  );

  useEffect(() => {
    startDate ? setMinDate(dayjs(startDate).add(3, "hour")) : setMinDate(null);
  }, [startDate]);

  return (
    <div className="p-9">
      <div className="mb-9">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="from"
            disablePast
            maxDate={dayjs.unix(sixMonthsLater)}
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
              handleStartDate(newValue);
            }}
          />
        </LocalizationProvider>
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
      </LocalizationProvider>
    </div>
  );
}
