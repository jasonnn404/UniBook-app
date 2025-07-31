import { notFound } from "next/navigation";
import {
  getResource,
  getBookedDatesByResourceId,
  getResources,
} from "@/app/_lib/data-service";
import Reservation from "@/app/_components/Reservation";
import Resource from "@/app/_components/Resource";
import { auth } from "@/app/_lib/auth";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";
import { ReservationProvider } from "@/app/_components/ReservationContext";

export async function generateMetadata({ params }) {
  const resource = await getResource(params.resourceId);
  return { title: `Resource ${resource?.name || "Details"}` };
}

export async function generateStaticParams() {
  const resources = await getResources();
  const ids = resources.map((resource) => ({
    resourceId: String(resource.id),
  }));
  return ids;
}

export default async function Page({ params }) {
  const resource = await getResource(params.resourceId);

  if (!resource) notFound();

  const session = await auth();

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Resource resource={resource} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 mt-10 text-accent-400">
          Reserve {resource.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <ReservationProvider>
            <Reservation resource={resource} />
          </ReservationProvider>
        </Suspense>
      </div>
    </div>
  );
}
