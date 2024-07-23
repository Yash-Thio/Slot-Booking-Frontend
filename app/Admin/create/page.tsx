"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { isLogin } from "@/app/store/atoms/islogin";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

function page() {
  const [formData, setFormData] = useState({
    date: "",
    time: "00:00",
    maxGuests: 0,
  });

  const router = useRouter();
  const isLoggedIn = useRecoilValue(isLogin);

  useEffect(() => {
    console.log("inside useEffect");
    if (!isLoggedIn) {
      router.push("/Admin");
    }
  }, [isLoggedIn, router]);

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
      const token = localStorage.getItem("Authorization");
      const response = await axios.put(
        "http://localhost:5000/api/v1/admin/createslot",
        slotData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response) {
        // const data = await response.json();
        console.log(response);
        alert("Slot created successfully!");
        // Reset form
        setFormData({
          date: "",
          time: "00:00",
          maxGuests: 0,
        });
      } else {
        // const errorData = await response.json();
        // alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  function handleChange(event: any) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }

  if (isLoggedIn) {
    return (
      <div className="p-4">
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
            className="flex justify-center gap-4 px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
          >
            Create
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </form>
      </div>
    );
  } else {
    return null;
  }
}

export default page;
