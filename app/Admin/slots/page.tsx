"use client";
import { useSlots, Slot, useBookings } from "@/app/hooks/Connect";
import Header from "@/app/components/Header";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { isLogin } from "@/app/store/atoms/islogin";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

export default function Page1() {
  const slots = useSlots();
  const router = useRouter();
  const isLoggedIn = useRecoilValue(isLogin);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!isLoggedIn) {
      router.push("/Admin");
    }
  }, [isLoggedIn, router]);

  const uniqueDates = useMemo(() => {
    if (!slots || slots.length === 0) return [];
    const dates = slots.map((slot) => slot.date);
    return Array.from(new Set(dates));
  }, [slots]);

  if (!isMounted) {
    return null; // Avoid rendering on the server side
  }

  if (isLoggedIn) {
    return (
      <div className="flex flex-col gap-6 p-4">
        <div className="h-10">
          <Link href="/Admin/create">
            <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
              Create Slot
            </button>
          </Link>
        </div>
        {uniqueDates.length > 0 ? (
          uniqueDates.map((date) => (
            <div key={date} className="">
              <Header label={date} />
              <div className="flex flex-wrap gap-4">
                {slots
                  .filter((slot) => slot.date === date)
                  .map((slot) => (
                    <Link href={`/Admin/slots/${slot._id}`} key={slot._id}>
                      <button
                        className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
                      >
                        {slot.time} {slot.confirmedGuests}/{slot.maxGuests}
                      </button>
                    </Link>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <p>No slots available.</p>
        )}
      </div>
    );
  } else {
    return null;
  }
}
