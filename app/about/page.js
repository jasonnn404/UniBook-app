import Image from "next/image";
import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import { getResources } from "../_lib/data-service";

export const revalidate = 86400;

export const metadata = {
  title: "About",
};

export default async function Page() {
  const resources = await getResources();

  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-blue-400 font-medium">
          Welcome to UniBook
        </h1>

        <div className="space-y-8">
          <p>
            Your comprehensive university resource booking platform designed to
            enhance academic excellence and research productivity. UniBook
            connects students, faculty, and staff with the facilities they need
            to succeed in their educational and research endeavors.
          </p>
          <p>
            Our {resources.length} diverse resources provide everything from
            quiet study spaces for focused learning to high-tech laboratories
            for cutting-edge research. Whether you need a collaborative meeting
            room, a computer lab for software development, or recreational
            facilities for wellness, UniBook has you covered.
          </p>
          <p>
            This is where academic success meets convenience. Our modern booking
            system ensures that every member of the university community can
            easily access the resources they need, when they need them,
            fostering a productive and collaborative learning environment.
          </p>
        </div>
      </div>

      <div className="col-span-2">
        <Image
          src={image1}
          alt="Uoft library"
          placeholder="blur"
          className="w-full h-auto scale-110 mt-10"
        />
      </div>

      <div className="relative aspect-square col-span-2">
        <Image
          src="/about-2.jpg"
          fill
          className="object-cover"
          alt="Uoft study room"
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-blue-400 font-medium">
          Empowering Academic Excellence
        </h1>

        <div className="space-y-8">
          <p>
            UniBook represents the future of university resource management,
            designed to streamline access to campus facilities and enhance the
            overall educational experience. Our platform bridges the gap between
            traditional resource management and modern digital convenience.
          </p>
          <p>
            We understand that academic success requires more than just
            traditional classroom learning. That&apos;s why UniBook provides
            access to diverse facilities that support research, collaboration,
            wellness, and innovation. Our commitment is to ensure that every
            member of the university community can easily access the resources
            they need to excel in their academic and research pursuits.
          </p>

          <div>
            <a
              href="/resources"
              className="inline-block mt-4 bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-5 text-white text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all rounded-lg"
            >
              Explore our resources
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
