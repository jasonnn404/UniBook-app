import Link from "next/link";

export const metadata = {
  title: "Booking Confirmed",
};

export default function Page() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-semibold text-blue-400 mb-8">
        Booking Confirmed! 🎉
      </h1>

      <p className="text-lg text-primary-200 mb-8 max-w-2xl mx-auto">
        Thank you for booking with UniBook! Your resource reservation has been
        successfully created and is now pending confirmation. You'll receive an
        email confirmation shortly with all the details of your booking.
      </p>

      <div className="bg-primary-900/50 p-6 rounded-lg border border-primary-800 max-w-md mx-auto mb-8">
        <h2 className="text-xl font-semibold text-primary-100 mb-4">
          What happens next?
        </h2>
        <ul className="text-left text-primary-200 space-y-2">
          <li>• Your booking will be reviewed by our team</li>
          <li>• You'll receive a confirmation email within 24 hours</li>
          <li>• Check your account for booking status updates</li>
          <li>• Arrive on time for your scheduled resource use</li>
        </ul>
      </div>

      <div className="flex gap-4 justify-center">
        <Link
          href="/resources"
          className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all rounded-lg"
        >
          Book Another Resource
        </Link>

        <Link
          href="/account/reservations"
          className="bg-primary-800 px-6 py-3 text-primary-100 font-semibold hover:bg-primary-700 transition-all rounded-lg border border-primary-700"
        >
          View My Bookings
        </Link>
      </div>
    </div>
  );
}
