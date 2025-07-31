import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import SelectCountry from "@/app/_components/SelectCountry";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export const metadata = {
  title: "Update profile",
};

export default async function Page() {
  const session = await auth();
  const guest = await getGuest(session.user.email);

  return (
    <div>
      <h2 className="text-4xl font-semibold text-center mb-10 text-accent-400">
        Update your profile
      </h2>

      <p className="text-lg mb-8 text-primary-200 text-center">
        Help us personalize your experience by providing your academic
        information.
      </p>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          defaultCountry={guest.nationality}
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </UpdateProfileForm>
    </div>
  );
}
