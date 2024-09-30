import { useState, useEffect } from "react";
import axios from "axios";

export interface Slot{
  _id: string;
  date: string;
  time: string;
  confirmedGuests: number;
  maxGuests: number;
}

export interface Bookings{
  name: string;
  email: string;
  phoneNumber: number;
  address: string;
  status: string;
  requestId: string;
}

export const useBookings = (slot : string, refresh: boolean) => {
  const [bookings, setBookings] = useState<Bookings[]>([]);

  useEffect(() => {
    if(!slot) return;

    const fetchBookings = async () => {
      try {
        const token = sessionStorage.getItem('Authorization');
        const result = await axios.post(`${process.env.NEXT_PUBLIC_BOOKINGS}`,{'id' : slot},{
          headers: {
            'Authorization': token,
          }
        })
        setBookings(result.data);
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };

    fetchBookings();
  }, [slot, refresh]);

  return bookings;
};

export const useSlots = (): Slot[] => {
  const [slots, setSlots] = useState<Slot[]>([]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_GET_SLOTS}`);
        setSlots(result.data);
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };

    fetchSlots();
  }, []);

  return slots;
};