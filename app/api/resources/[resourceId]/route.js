import {
  getBookedDatesByResourceId,
  getResource,
} from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { resourceId } = params;

  try {
    const [resource, bookedDates] = await Promise.all([
      getResource(resourceId),
      getBookedDatesByResourceId(resourceId),
    ]);

    return Response.json({ resource, bookedDates });
  } catch {
    return Response.json({ message: "Resource not found" });
  }
}

// export async function POST() {}
