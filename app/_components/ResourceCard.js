import Image from "next/image";
import Link from "next/link";
import { UsersIcon, ClockIcon } from "@heroicons/react/24/solid";

function ResourceCard({ resource }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    resource;

  // Get appropriate icon based on resource type
  const getResourceIcon = (resourceName) => {
    const name = resourceName.toLowerCase();
    if (name.includes("study")) return "📚";
    if (name.includes("meeting")) return "👥";
    if (name.includes("gym")) return "💪";
    if (name.includes("lab") || name.includes("computer")) return "💻";
    if (name.includes("party")) return "🎉";
    return "🏢";
  };

  return (
    <div className="flex border-primary-800 border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="flex-1 relative">
        <Image
          src={image}
          fill
          alt={`Resource ${name}`}
          className="object-cover border-r border-primary-800"
        />
        <div className="absolute top-2 left-2 bg-primary-900/80 text-2xl px-2 py-1 rounded">
          {getResourceIcon(name)}
        </div>
      </div>

      <div className="flex-grow">
        <div className="pt-5 pb-4 px-7 bg-primary-950">
          <h3 className="text-blue-400 font-semibold text-2xl mb-3">{name}</h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-lg text-primary-200">
              Capacity: <span className="font-bold">{maxCapacity}</span> people
            </p>
          </div>

          <div className="flex gap-3 items-center mb-3">
            <ClockIcon className="h-5 w-5 text-primary-600" />
            <p className="text-lg text-primary-200">Hourly rate</p>
          </div>

          <p className="flex gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350] text-green-400">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350] text-green-400">
                ${regularPrice}
              </span>
            )}
            <span className="text-primary-200">/ hour</span>
          </p>
        </div>

        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <Link
            href={`/resources/${id}`}
            className="border-l border-primary-800 py-4 px-6 inline-block hover:bg-blue-600 transition-all hover:text-white"
          >
            Details & booking &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResourceCard;
