import Link from "next/link";
import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";

export const formatDistanceFromNow = (dateStr) => {
  if (!dateStr) return "Unknown date";

  try {
    return formatDistance(parseISO(dateStr), new Date(), {
      addSuffix: true,
    }).replace("about ", "");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numHours,
    totalPrice,
    resourcePrice,
    numGuests,
    created_at,
    resources,
  } = booking;

  const resourceName = resources?.name || "Unknown Resource";
  const resourceImage = resources?.image || "/default-resource.jpg";

  let timeSlots = [];
  try {
    timeSlots = JSON.parse(booking.timeSlots || "[]");
  } catch (error) {
    console.error("Error parsing timeSlots:", error);
  }

  return (
    <div className="flex border border-primary-800">
      <div className="relative h-32 aspect-square">
        <Image
          src={resourceImage}
          alt={`Resource ${resourceName}`}
          fill
          className="object-cover border-r border-primary-800"
        />
      </div>

      <div className="flex-grow px-6 py-3 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {numHours || 0} hours in {resourceName}
          </h3>
          {(() => {
            if (timeSlots.length > 0) {
              return timeSlots.every((slot) => isPast(new Date(slot.date))) ? (
                <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                  past
                </span>
              ) : (
                <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                  upcoming
                </span>
              );
            } else if (
              startDate &&
              (isPast(new Date(startDate)) ||
                (endDate && isPast(new Date(endDate))))
            ) {
              return (
                <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                  past
                </span>
              );
            } else {
              return (
                <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                  upcoming
                </span>
              );
            }
          })()}
        </div>

        {timeSlots.length > 0 ? (
          <div className="text-lg text-primary-300">
            {timeSlots.map((slot, index) => (
              <span key={index}>
                {format(new Date(slot.date), "MMM dd")}: {slot.startTime} -{" "}
                {slot.endTime}
                {index < timeSlots.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        ) : startDate && endDate ? (
          <p className="text-lg text-primary-300">
            {format(new Date(startDate), "EEE, MMM dd yyyy")} (
            {isToday(new Date(startDate))
              ? "Today"
              : isPast(new Date(startDate)) ||
                (endDate && isPast(new Date(endDate)))
              ? "Past"
              : formatDistanceFromNow(startDate)}
            ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
          </p>
        ) : (
          <p className="text-lg text-primary-300">
            Date information unavailable
          </p>
        )}

        <div className="flex gap-5 mt-auto items-baseline">
          <p className="text-xl font-semibold text-accent-400">
            ${totalPrice || resourcePrice || 0}
          </p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-lg text-primary-300">
            {numGuests || 0} guest{(numGuests || 0) > 1 && "s"}
          </p>
          <p className="ml-auto text-sm text-primary-400">
            Booked{" "}
            {created_at
              ? format(new Date(created_at), "EEE, MMM dd yyyy, p")
              : "Unknown date"}
          </p>
        </div>
      </div>

      <div className="flex flex-col border-l border-primary-800 w-[100px]">
        {timeSlots.length > 0 ? (
          // Check if any time slot is in the future
          timeSlots.some((slot) => !isPast(new Date(slot.date))) ? (
            <>
              <Link
                href={`/account/reservations/edit/${id}`}
                className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
              >
                <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
                <span className="mt-1">Edit</span>
              </Link>
              <DeleteReservation bookingId={id} onDelete={onDelete} />
            </>
          ) : (
            <div className="flex-grow px-3 py-2 text-xs text-primary-400">
              Past booking
            </div>
          )
        ) : startDate ? (
          !isPast(new Date(startDate)) &&
          !(endDate && isPast(new Date(endDate))) ? (
            <>
              <Link
                href={`/account/reservations/edit/${id}`}
                className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
              >
                <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
                <span className="mt-1">Edit</span>
              </Link>
              <DeleteReservation bookingId={id} onDelete={onDelete} />
            </>
          ) : (
            <div className="flex-grow px-3 py-2 text-xs text-primary-400">
              Past booking
            </div>
          )
        ) : (
          <div className="flex-grow px-3 py-2 text-xs text-primary-400">
            No date
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
