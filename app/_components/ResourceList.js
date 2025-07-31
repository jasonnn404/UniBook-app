import { unstable_noStore as noStore } from "next/cache";

import ResourceCard from "@/app/_components/ResourceCard";
import { getResources } from "../_lib/data-service";

async function ResourceList({ filter }) {
  // noStore();

  const resources = await getResources();

  if (!resources.length) return null;

  let displayedResources;
  if (filter === "all") displayedResources = resources;
  if (filter === "small")
    displayedResources = resources.filter(
      (resource) => resource.maxCapacity >= 2 && resource.maxCapacity <= 6
    );
  if (filter === "medium")
    displayedResources = resources.filter(
      (resource) => resource.maxCapacity >= 7 && resource.maxCapacity <= 12
    );
  if (filter === "large")
    displayedResources = resources.filter(
      (resource) => resource.maxCapacity >= 13
    );

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedResources.map((resource) => (
        <ResourceCard resource={resource} key={resource.id} />
      ))}
    </div>
  );
}

export default ResourceList;
