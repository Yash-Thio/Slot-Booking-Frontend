"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "../../components/sidebar";
import { TypewriterEffect } from "@/app/components/ui/typewritter";
import { motion } from "framer-motion";
import axios from "axios";
import { useSlots } from '@/app/hooks/Connect';

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



function page() {

  const slots = useSlots();
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [open, setOpen]= useState(false);

  const [formData, setFormData] = useState(
    {name: "", email: "", phoneNumber:0, address: "" }
  )

  function handleClick(){
    setOpen(true)
  }

  function handleClose ()  {
    setOpen(false);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    console.log("submitted")
    event.preventDefault();

    // Check if all data is entered
    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.address) {
      alert('Please fill in all fields');
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      phoneNumber: Number(formData.phoneNumber),
      address: formData.address,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/v1/user/createuser',userData);

      if (response) {
        const data = response.data;
        const res = await axios.post('http://localhost:5000/api/v1/user/requestslot',
          {
          userId:data, 
          slotId:selectedSlotId
        });
        console.log(res);
        console.log(data);
        if(res){
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
  }

  function handleChange(event:any){
    setFormData((prevData)=>{
      return{
        ...prevData,
        [event.target.name] : event.target.value
      }
    })
  }

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlotId(slotId);
  };

  return (
    <div>
      <Sidebar />
      <div className="ml-12 flex flex-col gap-8 items-center h-screen w-screen p-4">

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
                  <label className="block text-sm font-bold mb-2">Phone Number</label>
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
                  <label className="block text-sm font-bold mb-2">Address</label>
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
                <label className="block text-sm font-bold mb-2">Select a Slot</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {slots.map((slot) => (
                    <button
                      type="button"
                      key={slot._id}
                      onClick={() => handleSlotSelect(slot._id)}
                      className={`px-4 py-2 border rounded-lg ${
                        selectedSlotId === slot._id ? 'bg-blue-500 text-white' : 'bg-white'
                      }`}
                    >
                      {slot.date}  |  {slot.time}
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
        <div className="text-justify">
          Crafted Colors of India &#45; An exclusive home show revering India&#39;s handloom legacy. <br/>
          
          Step into a world of exquisite craftsmanship and timeless elegance! <br/>
          
          Join us for an exclusive home showcase of beautifully handcrafted sarees, scarves, and stoles, lovingly created by local artisans. <br/>
          
          You will discover a stunning array of handcrafted treasures including <br/>
          
          &#45; Luxury Phulkari Dupattas<br/>
          &#45; Madhubani Print Silk Sarees <br/>
          &#45; Geecha Silk known for its soft<br/>
          texture and rick , lustrous appearance <br/>
          &#45; Scarves and Stoles <br/>
          
          Each piece tells a story of tradition, skill, and community. By choosing<br/>
          from our curated collection, you&#39;re not just adding a stunning<br/>
          piece to your wardrobe; you&#39;re also supporting local artisans and<br/>
          their families. Your purchase helps preserve age&#45;old techniques,<br/>
          sustain livelihoods, and empower communities. Date: Aug 10 and Aug 11<br/>
          Time: Based on the slots available, link will be out soon Location: In<br/>
          your neighborhood, coming soon! Come, be a part of something<br/>
          meaningful. Let&#39;s celebrate the beauty of handcrafted artistry and<br/>
          make a difference together. RSVP to reserve your spot at Artisan&#39;s<br/>
          Haven! Don&#39;t miss the surprise element with this show case !<br/>
        </div>
        <button className="px-6 py-2 bg-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" onClick={handleClick}>
          Book Now
        </button>
      </div>
    </div>
  );
}

export default page;
