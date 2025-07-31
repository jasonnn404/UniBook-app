import Image from "next/image";

function Resource({ resource }) {
  return (
    <div className="grid grid-cols-[60fr,40fr] gap-y-10 items-start">
      <div>
        <h1 className="text-4xl font-semibold text-primary-100 mb-4">
          {resource.name}
        </h1>

        <p className="text-lg text-primary-200 mb-8">{resource.description}</p>

        <div className="flex gap-6 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👥</span>
            <span className="text-primary-200">
              Capacity:{" "}
              <span className="font-semibold">{resource.maxCapacity}</span>{" "}
              people
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <span className="text-primary-200">
              Price:{" "}
              <span className="font-semibold">${resource.regularPrice}</span> /
              hour
            </span>
          </div>
        </div>

        {resource.discount > 0 && (
          <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4 mb-8">
            <p className="text-green-400 font-semibold">
              🎉 Special Offer: ${resource.discount} off per hour!
            </p>
            <p className="text-green-300 text-sm">
              Final price: ${resource.regularPrice - resource.discount} / hour
            </p>
          </div>
        )}
      </div>

      <div className="relative aspect-square -ml-8">
        <Image
          src={resource.image || "/about-1.jpg"}
          fill
          className="object-cover rounded-lg"
          alt={resource.name}
          priority
        />
      </div>
    </div>
  );
}

export default Resource;
