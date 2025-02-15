import { useState, useEffect } from "react";
import { getDatesInRange } from "../utils/CalendarCalc";
import CarService from "../services/carService";

const useBlockedDates = (carId) => {
  const [blockedDates, setBlockedDates] = useState([]);
  const [blockedDatesIntervals, setBlockedDatesIntervals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!carId) return;

    const fetchBlockedIntervals = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await CarService.getAvailabilities(carId);
        setBlockedDatesIntervals(data);
        let unavailableDatesArray = [];
        data.forEach((interval) => {
          const unavailableDatesPart = getDatesInRange(
            interval.unavailableFrom,
            interval.unavailableTo
          );
          unavailableDatesArray.push(...unavailableDatesPart);
        });
        const typedUnaivailableDatesArray = unavailableDatesArray.map((el) => {
          return new Date(el);
        });
        setBlockedDates(typedUnaivailableDatesArray);
      } catch (err) {
        console.error("Error fetching blocked intervals:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlockedIntervals();
  }, [carId]);

  const removeBlockedDateInterval = (intervalToRemove) => {
    setBlockedDatesIntervals((prevIntervals) => {
      const updatedIntervals = prevIntervals.filter(
        (interval) => interval.id !== intervalToRemove.id
      );
      return updatedIntervals;
    });
  };
  const addBlockedDateInterval = (intervalToAdd) => {
    setBlockedDatesIntervals((prevIntervals) => {
      return [...prevIntervals, intervalToAdd];
    });
  };

  return {
    blockedDates,
    isLoading,
    error,
    blockedDatesIntervals,
    removeBlockedDateInterval,
    addBlockedDateInterval,
  };
};

export default useBlockedDates;
