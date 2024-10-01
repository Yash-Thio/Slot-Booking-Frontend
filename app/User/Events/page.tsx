"use client";
import React from "react";
import { useState, useEffect } from "react";
import { TypewriterEffect } from "@/app/components/ui/typewritter";
import { motion } from "framer-motion";
import axios from "axios";
import { useSlots } from "@/app/hooks/Connect";
import Paragraph from "./Paragraph";
import { ReviewCard } from "@/app/components/ui/reviews";
import { LayoutGrid } from "@/app/components/ui/layoutgrid";

const Coming_soon = [
  {
    text: "Coming",
    classname: "",
  },
  {
    text: "Soon",
    classname: "",
  },
];

type Review = {
  id: number;
  attributes: any;
};
type Image = {
  id: number;
  className: string;
  thumbnail: string;
  format: "Landscape" | "Portrait";
};

function Page() {
  const slots = useSlots();
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_GET_REVIEWS}`);
        setReviews(result.data.data);
      } catch (error) {
        console.error("Error fetching content", error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_GET_IMAGES}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
          });
        const processedImages = result.data.data.map((img: any) => {
          const format = img.attributes.Format;
          return {
            id: img.id,
            thumbnail: img.attributes.Image.data[0].attributes.url,
            format: format,
            className: format === "Landscape" ? "md:col-span-2" : "col-span-1",
          };
        });
        setImages(processedImages);
      } catch (error) {
        console.error("Error fetching content", error);
      }
    };

    fetchImages();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: 0,
    address: "",
  });

  function handleClick() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    console.log("submitted");
    event.preventDefault();

    // Check if all data is entered
    if (
      !formData.name ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.address
    ) {
      alert("Please fill in all fields");
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      phoneNumber: Number(formData.phoneNumber),
      address: formData.address,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_CREATE_USER}`,
        userData
      );

      if (response) {
        const data = response.data;
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_REQUEST_SLOTS}`,
          {
            userId: data,
            slotId: selectedSlotId,
          }
        );
        console.log(res);
        console.log(data);
        if (res) {
          alert(res.data.message);
        }
        setFormData({
          name: "",
          email: "",
          phoneNumber: 0,
          address: "",
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

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlotId(slotId);
  };

  return (
    // <div className="overflow-x-hidden no-scrollbar pb-11">
    //   <Sidebar />
    <div className="ml-12">
      <div className="relative mx-auto py-20 md:py-40 w-full h-screen flex items-center justify-center">
        <div className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600 py-4">
          <h1 className="text-7xl lg:text-7xl font-bold text-center text-opacity-80 text-black relative z-1">
            Timeless Threads of India
          </h1>
          <h1 className="text-xl text-center text-opacity-80 font-bold">
            Experience the Artistry of India's Handloom Legacy
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-8 items-center w-screen p-4">
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={
            open
              ? { opacity: 1, backdropFilter: "blur(10px)", zIndex: 50 }
              : { opacity: 0, backdropFilter: "blur(0px)", zIndex: -1 }
          }
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={handleClose}
        />

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <button
                className="absolute top-4 right-4 text-black"
                onClick={handleClose}
              >
                Close
              </button>
              <h2 className="text-2xl mb-4">Book Now</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full p-2 border border-gray-300 rounded"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">
                    Select a Slot
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {slots.map((slot) => (
                      <button
                        type="button"
                        key={slot._id}
                        onClick={() => handleSlotSelect(slot._id)}
                        className={`px-4 py-2 border rounded-lg ${
                          selectedSlotId === slot._id
                            ? "bg-blue-500 text-white"
                            : "bg-white"
                        }`}
                      >
                        {slot.date} | {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded-lg font-bold"
                >
                  Submit
                </button>
              </form>
            </div>
          </motion.div>
        )}

        <TypewriterEffect words={Coming_soon} />
        <Paragraph />
        <div className="">
          <button
            className="px-6 py-2 mb-10 bg-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
            onClick={handleClick}
          >
            Book Now
          </button>
        </div>
        <div className="h-full py-20 w-full">
          <LayoutGrid cards={images} />
        </div>
        <div className="z-10 overflow-x-hidden w-screen h-screen overflow-y-hidden no-scrollbar">
          <div className=" h-full flex items-center justify-center">
            <div className="w-full">
              <ReviewCard items={reviews} direction="right" speed="normal" />
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Page;

