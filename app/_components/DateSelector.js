"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
  eachDayOfInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";
import { useState, useEffect } from "react";

function isAlreadyBooked(range, datesArr) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

// Function to get all booked time slots for a specific date
function getBookedTimeSlotsForDate(date, bookedDates) {
  const bookedTimeSlots = [];

  // Convert bookedDates to actual Date objects and find matches
  bookedDates.forEach((booking) => {
    if (isSameDay(new Date(booking.date), date)) {
      bookedTimeSlots.push({
        startTime: booking.startTime,
        endTime: booking.endTime,
        hours: booking.hours,
      });
    }
  });

  return bookedTimeSlots;
}

// Function to check if a day is fully booked (all time slots taken)
function isDayFullyBooked(date, bookedDates) {
  const bookedTimeSlots = getBookedTimeSlotsForDate(date, bookedDates);
  const totalBookedHours = bookedTimeSlots.reduce(
    (sum, slot) => sum + slot.hours,
    0
  );

  // If more than 14 hours are booked (8am to 10pm = 14 hours), day is fully booked
  return totalBookedHours >= 14;
}

function DateSelector({
  settings,
  resource,
  bookedDates,
  onTimeSlotSelect,
  existingTimeSlots = [],
}) {
  const { range, setRange, resetRange } = useReservation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [currentTimeSlots, setCurrentTimeSlots] = useState(existingTimeSlots);

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { regularPrice, discount } = resource;
  // Price will be calculated based on manually selected hours in the form
  const resourcePrice = 0; // Placeholder - actual calculation happens in form

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setStartTime("");
    setEndTime("");
  };

  const handleAddTimeSlot = () => {
    if (!selectedDate || !startTime || !endTime) return;

    const startHour = parseInt(startTime);
    const endHour = parseInt(endTime);
    const hours = endHour - startHour;

    if (hours <= 0) return;

    const timeSlot = {
      date: selectedDate,
      startTime: `${startTime}:00`,
      endTime: `${endTime}:00`,
      hours: hours,
    };

    if (onTimeSlotSelect) {
      onTimeSlotSelect(timeSlot);
    } else {
      const newTimeSlots = [...currentTimeSlots, timeSlot];
      setCurrentTimeSlots(newTimeSlots);

      // Emit event for EditBookingForm to listen to
      window.dispatchEvent(
        new CustomEvent("timeSlotsUpdated", {
          detail: { timeSlots: newTimeSlots },
        })
      );
    }

    setStartTime("");
    setEndTime("");
  };

  const removeTimeSlot = (index) => {
    if (onTimeSlotSelect) {
      // If we have onTimeSlotSelect, we're in creation mode
      // This function should be handled by the parent
      return;
    }

    const newTimeSlots = currentTimeSlots.filter((_, i) => i !== index);
    setCurrentTimeSlots(newTimeSlots);

    // Emit event for EditBookingForm to listen to
    window.dispatchEvent(
      new CustomEvent("timeSlotsUpdated", {
        detail: { timeSlots: newTimeSlots },
      })
    );
  };

  const { minBookingLength, maxBookingLength } = settings;

  // Get booked time slots for selected date
  const bookedTimeSlotsForSelectedDate = selectedDate
    ? getBookedTimeSlotsForDate(selectedDate, bookedDates)
    : [];

  // Generate available time slots (8am to 10pm)
  const generateAvailableTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 21; hour++) {
      slots.push(hour);
    }
    return slots;
  };

  const availableTimeSlots = generateAvailableTimeSlots();

  // Filter out booked time slots
  const getAvailableStartTimes = () => {
    return availableTimeSlots.filter((startHour) => {
      // Check if this start time conflicts with any booked slot
      return !bookedTimeSlotsForSelectedDate.some((booked) => {
        const bookedStart = parseInt(booked.startTime.split(":")[0]);
        const bookedEnd = parseInt(booked.endTime.split(":")[0]);
        return startHour >= bookedStart && startHour < bookedEnd;
      });
    });
  };

  const getAvailableEndTimes = (selectedStartTime) => {
    if (!selectedStartTime) return [];

    const startHour = parseInt(selectedStartTime);
    return availableTimeSlots.filter((endHour) => {
      if (endHour <= startHour) return false;

      // Check if this time range conflicts with any booked slot
      return !bookedTimeSlotsForSelectedDate.some((booked) => {
        const bookedStart = parseInt(booked.startTime.split(":")[0]);
        const bookedEnd = parseInt(booked.endTime.split(":")[0]);
        return startHour < bookedEnd && endHour > bookedStart;
      });
    });
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary-200 mb-4">
          {existingTimeSlots.length > 0
            ? "Edit Time Slots"
            : "Select Date and Time"}
        </h3>

        <DayPicker
          className="pt-6 place-self-center"
          mode="single"
          onSelect={handleDateSelect}
          selected={selectedDate}
          fromMonth={new Date()}
          fromDate={new Date()}
          toYear={new Date().getFullYear() + 5}
          captionLayout="dropdown"
          numberOfMonths={1}
          disabled={(curDate) =>
            isPast(curDate) ||
            isDayFullyBooked(curDate, bookedDates) ||
            bookedDates.some((date) => isSameDay(date, curDate))
          }
        />

        {selectedDate && (
          <div className="mt-4 space-y-3">
            {/* Show booked time slots for selected date */}
            {bookedTimeSlotsForSelectedDate.length > 0 && (
              <div className="bg-primary-800 p-3 rounded-sm">
                <h4 className="text-sm font-semibold text-primary-300 mb-2">
                  Booked time slots for {selectedDate.toLocaleDateString()}:
                </h4>
                <div className="space-y-1">
                  {bookedTimeSlotsForSelectedDate.map((slot, index) => (
                    <div key={index} className="text-xs text-primary-400">
                      {slot.startTime} - {slot.endTime} ({slot.hours} hours)
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm text-primary-300 mb-1">
                  Start Time
                </label>
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 bg-primary-200 text-primary-800 rounded-sm"
                >
                  <option value="">Select time...</option>
                  {getAvailableStartTimes().map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}:00
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm text-primary-300 mb-1">
                  End Time
                </label>
                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 bg-primary-200 text-primary-800 rounded-sm"
                  disabled={!startTime}
                >
                  <option value="">Select time...</option>
                  {getAvailableEndTimes(startTime).map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}:00
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddTimeSlot}
              disabled={
                !startTime ||
                !endTime ||
                parseInt(startTime) >= parseInt(endTime)
              }
              className="w-full bg-accent-500 text-primary-800 py-2 px-4 rounded-sm font-semibold hover:bg-accent-600 disabled:bg-primary-700 disabled:text-primary-400 disabled:cursor-not-allowed"
            >
              Add Time Slot
            </button>
          </div>
        )}

        {/* Display current time slots */}
        {currentTimeSlots.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-primary-300 mb-2">
              Current Time Slots:
            </h4>
            <div className="space-y-2">
              {currentTimeSlots.map((slot, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-primary-800 p-2 rounded"
                >
                  <span className="text-primary-200 text-sm">
                    {new Date(slot.date).toLocaleDateString()} -{" "}
                    {slot.startTime} to {slot.endTime} ({slot.hours} hours)
                  </span>
                  {!onTimeSlotSelect && (
                    <button
                      type="button"
                      onClick={() => removeTimeSlot(index)}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/hour</span>
          </p>
          <p className="text-primary-300 text-sm">
            Select hours in the form to see total price
          </p>
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
