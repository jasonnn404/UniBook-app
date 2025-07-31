"use client";

import { differenceInDays, format } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import { useState, useEffect } from "react";

function ReservationForm({ resource, user, bookedDates, detailedBookings }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = resource;
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  const startDate = range?.from;
  const endDate = range?.to;

  // Calculate total hours and price from selected time slots
  const totalHours = selectedTimeSlots.reduce(
    (sum, slot) => sum + slot.hours,
    0
  );
  const totalPrice = totalHours * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    resourceId: id,
    timeSlots: selectedTimeSlots,
    totalHours,
    totalPrice,
  };

  const removeTimeSlot = (index) => {
    setSelectedTimeSlots((prev) => prev.filter((_, i) => i !== index));
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  // If user is not logged in, show login message
  if (!user) {
    return (
      <div className="scale-[1.01]">
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
          <DateSelector
            settings={{ minBookingLength: 1, maxBookingLength: 30 }}
            resource={resource}
            bookedDates={detailedBookings}
          />
          <LoginMessage />
        </div>
      </div>
    );
  }

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
        <DateSelector
          settings={{ minBookingLength: 1, maxBookingLength: 30 }}
          resource={resource}
          bookedDates={detailedBookings}
          onTimeSlotSelect={(timeSlot) =>
            setSelectedTimeSlots((prev) => [...prev, timeSlot])
          }
        />

        <form
          // action={createBookingWithData}
          action={async (formData) => {
            await createBookingWithData(formData);
            resetRange();
          }}
          className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
        >
          <div className="space-y-2">
            <label htmlFor="numGuests">How many guests?</label>
            <select
              name="numGuests"
              id="numGuests"
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
              required
            >
              <option value="" key="">
                Select number of guests...
              </option>
              {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="timeSlots">Selected Time Slots</label>
            <div className="bg-primary-800 p-4 rounded-sm min-h-[60px]">
              {selectedTimeSlots.length === 0 ? (
                <p className="text-primary-400 text-sm">
                  No time slots selected
                </p>
              ) : (
                <div className="space-y-2">
                  {selectedTimeSlots.map((slot, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-primary-700 p-2 rounded"
                    >
                      <span className="text-primary-200">
                        {format(new Date(slot.date), "MMM dd")} -{" "}
                        {slot.startTime} to {slot.endTime} ({slot.hours} hours)
                      </span>
                      <button
                        type="button"
                        onClick={() => removeTimeSlot(index)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="border-t border-primary-600 pt-2 mt-2">
                    <p className="text-primary-200 font-semibold">
                      Total Hours: {totalHours} | Total Price: ${totalPrice}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="observations">
              Anything we should know about your visit?
            </label>
            <textarea
              name="observations"
              id="observations"
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
              placeholder="Any requirements, etc.?"
            />
          </div>

          <div className="flex justify-end items-center gap-6">
            {selectedTimeSlots.length === 0 ? (
              <p className="text-primary-300 text-base">
                Start by selecting time slots
              </p>
            ) : (
              <SubmitButton pendingLabel="Reserving...">
                Reserve now
              </SubmitButton>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReservationForm;
