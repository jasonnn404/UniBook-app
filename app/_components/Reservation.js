import { auth } from "../_lib/auth";
import { getBookedDatesByResourceId, getSettings } from "../_lib/data-service";
import ReservationForm from "./ReservationForm";
import DateSelector from "./DateSelector";
import Link from "next/link";

async function Reservation({ resource }) {
  const [settings, bookingData] = await Promise.all([
    getSettings(),
    getBookedDatesByResourceId(resource.id),
  ]);
  const session = await auth();

  return (
    <div className="scale-[1.01]">
      {session?.user ? (
        <ReservationForm
          resource={resource}
          user={session.user}
          bookedDates={bookingData.bookedDates}
          detailedBookings={bookingData.detailedBookings}
        />
      ) : (
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
          <DateSelector
            settings={settings}
            bookedDates={bookingData.detailedBookings}
            resource={resource}
          />
          <div className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col">
            <h3 className="text-xl font-semibold text-primary-200 mb-4">
              Sign in to make a reservation
            </h3>
            <p className="text-primary-300">
              You need to be logged in to make a reservation. Please sign in to
              continue.
            </p>
            <div className="mt-auto">
              <Link
                href="/login"
                className="inline-block bg-accent-500 text-primary-800 py-3 px-6 rounded-sm font-semibold hover:bg-accent-600 transition-colors"
              >
                Sign in to continue
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reservation;
