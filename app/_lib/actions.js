"use server";

import { auth, signIn, signOut } from "./auth";
import { getBookings, getBooking, getResource } from "./data-service";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const studentNumber = formData.get("studentNumber");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const major = formData.get("major");

  if (!studentNumber.trim())
    throw new Error("Please provide your student number");
  if (!major.trim()) throw new Error("Please enter your field of study");

  const updateData = { nationality, countryFlag, studentNumber, major };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const numGuests = Number(formData.get("numGuests"));
  const timeSlots = bookingData.timeSlots;
  const totalHours = bookingData.totalHours;
  const totalPrice = bookingData.totalPrice;

  const newBooking = {
    resourceId: bookingData.resourceId,
    guestId: session.user.guestId,
    numHours: totalHours,
    numGuests,
    timeSlots: JSON.stringify(timeSlots),
    resourcePrice: totalPrice,
    observations: formData.get("observations").slice(0, 1000),
    totalPrice: totalPrice,
    status: "unconfirmed",
  };

  const { data: insertedData, error: insertError } = await supabase
    .from("bookings")
    .insert([newBooking]);

  if (insertError) {
    console.error("Supabase error details:", insertError);
    throw new Error(`Booking could not be created: ${insertError.message}`);
  }

  revalidatePath(`/resources/${bookingData.resourceId}`);

  redirect("/resources/thankyou");
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));

  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  // 3) Building update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // Handle time slots if provided
  const timeSlotsData = formData.get("timeSlots");
  if (timeSlotsData) {
    try {
      const timeSlots = JSON.parse(timeSlotsData);
      updateData.timeSlots = JSON.stringify(timeSlots);

      // Recalculate total hours and price
      const totalHours = timeSlots.reduce((sum, slot) => sum + slot.hours, 0);
      const booking = await getBooking(bookingId);
      const resource = await getResource(booking.resourceId);
      const totalPrice =
        totalHours * (resource.regularPrice - resource.discount);

      updateData.numHours = totalHours;
      updateData.totalPrice = totalPrice;
      updateData.resourcePrice = totalPrice;
    } catch (error) {
      console.error("Error parsing time slots:", error);
    }
  }

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // 5) Error handling
  if (error) throw new Error("Booking could not be updated");

  // 6) Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  // 7) Redirecting
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
