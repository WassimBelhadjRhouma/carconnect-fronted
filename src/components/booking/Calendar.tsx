import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import { addDays, subDays } from "date-fns";
import { DateRange } from "react-date-range";
import { addMonths } from "date-fns";

interface ComponentProps {
  handleStartDate: (date: string | Date) => void;
  handleEndDate: (date: string | Date) => void;
  clearCalendar?: () => void;
  handleCalendarError: (error: boolean) => void;
  blockedDates: string[];
  months: number;
}

const Calendar: React.FC<ComponentProps> = ({
  handleStartDate,
  handleEndDate,
  blockedDates,
  months = 1,
}) => {
  const [state, setState] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    handleStartDate(selection.startDate);
    handleEndDate(selection.endDate);

    setState([selection]);
  };

  return (
    <>
      <div className="mb-9 w-full">
        <DateRange
          onChange={handleOnChange}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={state}
          editableDateInputs={true}
          showDateDisplay={true}
          minDate={new Date()}
          dateDisplayFormat="dd/MM/yyyy"
          maxDate={addMonths(new Date(), 6)}
          disabledDates={blockedDates}
        />
      </div>
    </>
  );
};

export default Calendar;
