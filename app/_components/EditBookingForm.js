"use client";

import { useState, useEffect } from "react";
import { updateBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function EditBookingForm({
  bookingId,
  numGuests,
  observations,
  maxCapacity,
  initialTimeSlots,
}) {
  const [timeSlots, setTimeSlots] = useState(initialTimeSlots);

  useEffect(() => {
    const handleTimeSlotUpdate = (event) => {
      if (event.detail && event.detail.timeSlots) {
        setTimeSlots(event.detail.timeSlots);
      }
    };

    window.addEventListener("timeSlotsUpdated", handleTimeSlotUpdate);
    return () =>
      window.removeEventListener("timeSlotsUpdated", handleTimeSlotUpdate);
  }, []);

  const handleSubmit = async (formData) => {
    formData.append("timeSlots", JSON.stringify(timeSlots));
    await updateBooking(formData);
  };

  return (
    <form action={handleSubmit} className="text-lg flex gap-6 flex-col">
      <input type="hidden" value={bookingId} name="bookingId" />

      <div className="space-y-2">
        <label htmlFor="numGuests">How many people?</label>
        <select
          name="numGuests"
          id="numGuests"
          defaultValue={numGuests}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
        >
          <option value="" key="">
            Select number of people...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "person" : "people"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">Any special requirements or notes?</label>
        <textarea
          name="observations"
          defaultValue={observations}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="Updating...">Update booking</SubmitButton>
      </div>
    </form>
  );
}

export default EditBookingForm;
