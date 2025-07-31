import SubmitButton from "@/app/_components/SubmitButton";
import { updateBooking } from "@/app/_lib/actions";
import {
  getBooking,
  getResource,
  getBookedDatesByResourceId,
} from "@/app/_lib/data-service";
import DateSelector from "@/app/_components/DateSelector";
import { ReservationProvider } from "@/app/_components/ReservationContext";
import EditBookingForm from "@/app/_components/EditBookingForm";

export default async function Page({ params }) {
  const { bookingId } = params;
  const booking = await getBooking(bookingId);
  const { numGuests, observations, resourceId, timeSlots } = booking;
  const { maxCapacity, regularPrice, discount } = await getResource(resourceId);
  const bookingData = await getBookedDatesByResourceId(resourceId);

  // Parse timeSlots
  let parsedTimeSlots = [];
  try {
    parsedTimeSlots = JSON.parse(timeSlots || "[]");
  } catch (error) {
    console.error("Error parsing timeSlots:", error);
  }

  return (
    <div>
      <h2 className="font-semibold text-2xl text-blue-400 mb-7">
        Edit Booking #{bookingId}
      </h2>

      <div className="grid grid-cols-2 gap-8">
        {/* Left side - Time slot editing */}
        <div className="bg-primary-900 p-6 rounded-sm">
          <h3 className="text-lg font-semibold text-primary-200 mb-4">
            Edit Time Slots
          </h3>

          <ReservationProvider>
            <DateSelector
              settings={{ minBookingLength: 1, maxBookingLength: 30 }}
              resource={{ id: resourceId, maxCapacity, regularPrice, discount }}
              bookedDates={bookingData.detailedBookings}
              existingTimeSlots={parsedTimeSlots}
            />
          </ReservationProvider>
        </div>

        {/* Right side - Other booking details */}
        <div className="bg-primary-900 p-6 rounded-sm">
          <h3 className="text-lg font-semibold text-primary-200 mb-4">
            Booking Details
          </h3>

          <EditBookingForm
            bookingId={bookingId}
            numGuests={numGuests}
            observations={observations}
            maxCapacity={maxCapacity}
            initialTimeSlots={parsedTimeSlots}
          />
        </div>
      </div>
    </div>
  );
}
