import { Suspense } from "react";
import ResourceList from "../_components/ResourceList";
import Spinner from "../_components/Spinner";
import Counter from "../_components/Counter";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const revalidate = 3600;
// export const revalidate = 15;

export const metadata = {
  title: "Resources",
};

export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-blue-400 font-medium">
        University Resources
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Discover and book a wide range of university facilities. From quiet
        study rooms for focused learning to high-tech computer labs for research
        projects, meeting rooms for collaborative work, and recreational spaces
        for fitness and relaxation. Find the perfect space for your academic and
        research needs.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <ResourceList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
