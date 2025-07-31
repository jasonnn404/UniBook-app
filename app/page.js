import Link from "next/link";
import Image from "next/image";
import bg from "@/public/bg.jpg";

import {
  AcademicCapIcon,
  ComputerDesktopIcon,
  UserGroupIcon,
  BeakerIcon,
  HeartIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

export default function Page() {
  return (
    <main className="mt-24">
      {/* Hero Section */}
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={90}
        className="object-cover object-top"
        alt="University landscape"
      />

      <div className="relative z-10 text-center mb-16">
        <h1 className="text-6xl md:text-8xl text-primary-50 mb-6 tracking-tight font-normal">
          Welcome to UniBook
        </h1>
        <p className="text-xl text-primary-200 mb-10 max-w-2xl mx-auto">
          Your one-stop platform for booking university resources. From study
          rooms to labs, gyms to meeting spaces - everything you need for
          academic success.
        </p>
        <Link
          href="/resources"
          className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all rounded-lg shadow-lg"
        >
          Explore Resources
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        <div className="bg-primary-900/50 p-6 rounded-lg border border-primary-800">
          <AcademicCapIcon className="h-12 w-12 text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold text-primary-100 mb-2">
            Study Rooms
          </h3>
          <p className="text-primary-300">
            Quiet spaces for focused studying and group projects
          </p>
        </div>

        <div className="bg-primary-900/50 p-6 rounded-lg border border-primary-800">
          <ComputerDesktopIcon className="h-12 w-12 text-green-400 mb-4" />
          <h3 className="text-xl font-semibold text-primary-100 mb-2">
            Computer Labs
          </h3>
          <p className="text-primary-300">
            High-tech computer facilities for research and development
          </p>
        </div>

        <div className="bg-primary-900/50 p-6 rounded-lg border border-primary-800">
          <UserGroupIcon className="h-12 w-12 text-purple-400 mb-4" />
          <h3 className="text-xl font-semibold text-primary-100 mb-2">
            Meeting Rooms
          </h3>
          <p className="text-primary-300">
            Professional spaces for presentations and collaborations
          </p>
        </div>

        <div className="bg-primary-900/50 p-6 rounded-lg border border-primary-800">
          <BeakerIcon className="h-12 w-12 text-yellow-400 mb-4" />
          <h3 className="text-xl font-semibold text-primary-100 mb-2">
            Labs & Equipment
          </h3>
          <p className="text-primary-300">
            Specialized laboratories and research equipment
          </p>
        </div>

        <div className="bg-primary-900/50 p-6 rounded-lg border border-primary-800">
          <HeartIcon className="h-12 w-12 text-red-400 mb-4" />
          <h3 className="text-xl font-semibold text-primary-100 mb-2">
            Gym & Recreation
          </h3>
          <p className="text-primary-300">
            Fitness facilities and recreational spaces
          </p>
        </div>

        <div className="bg-primary-900/50 p-6 rounded-lg border border-primary-800">
          <CalendarIcon className="h-12 w-12 text-indigo-400 mb-4" />
          <h3 className="text-xl font-semibold text-primary-100 mb-2">
            Easy Booking
          </h3>
          <p className="text-primary-300">
            Simple and efficient booking system for all resources
          </p>
        </div>
      </div>
    </main>
  );
}
