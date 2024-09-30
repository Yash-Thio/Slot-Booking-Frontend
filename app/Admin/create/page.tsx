"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { isLogin } from "@/app/store/atoms/islogin";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

function Page() {
  const [formData, setFormData] = useState({
    date: "",
    time: "00:00",
    maxGuests: 0,
  });

  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const isLoggedIn = useRecoilValue(isLogin);

  useEffect(() => {
    // Mark the component as mounted on the client side
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log("inside useEffect");
    if (isMounted && !isLoggedIn) {
      router.push("/Admin");
    }
  }, [isLoggedIn, router, isMounted]);

  const handleSubmit = async (event: React.FormEvent) => {
    console.log("submitted");
    event.preventDefault();

    // Check if all data is entered
    if (!formData.date || !formData.time || !formData.maxGuests) {
      alert("Please fill in all fields");
      return;
    }

    const slotData = {
      date: formData.date,
      time: formData.time,
      maxGuests: Number(formData.maxGuests),
    };

    try {
      const token = sessionStorage.getItem("Authorization");
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_CREATE_Slot}`,
        slotData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response) {
        console.log(response);
        alert("Slot created successfully!");
        // Reset form
        setFormData({
          date: "",
          time: "00:00",
          maxGuests: 0,
        });
      } else {
        // Handle error
      }
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const handleChange = (event: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  if (!isMounted) {
    // Prevent rendering on the server
    return null;
  }

  if (isLoggedIn) {
    return (
      <div className="ml-12 flex justify-center items-center min-h-screen">
        <div className="p-4 max-w-sm w-full">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                datepicker-orientation="bottom right"
                type="date"
                className="bg-amber-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="Select date"
                id="date"
                name="date"
                onChange={handleChange}
                value={formData.date}
              />
            </div>
            <input
              type="time"
              className="bg-amber-200 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-200 focus:border-yellow-200 block w-full p-2.5"
              required
              id="time"
              name="time"
              onChange={handleChange}
              value={formData.time}
            />
            <input
              type="number"
              placeholder="Max Guests"
              className="bg-amber-200 leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-200 focus:border-yellow-200 block w-full p-2.5"
              required
              id="maxGuests"
              name="maxGuests"
              onChange={handleChange}
              value={formData.maxGuests}
            />
            <button
              type="submit"
              className="flex justify-center gap-4 text-lg px-4 py-2 rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Page;
