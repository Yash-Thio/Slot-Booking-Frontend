'use client';
import { useState, useEffect } from 'react';
import { useBookings } from '@/app/hooks/Connect';
import Request from './Request';
import { isLogin } from '@/app/store/atoms/islogin';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from "recoil";

function Page({ params }: { params: { slotId: string } }) {
  const [refresh, setRefresh] = useState(false);
  const bookings = useBookings(params.slotId, refresh);
  console.log(bookings);
  const router = useRouter();
  const isLoggedIn = useRecoilValue(isLogin);

  useEffect(()=>{
    console.log("inside useEffect");
    if(!isLoggedIn){
      router.push('/Admin');
    }
  },[isLoggedIn, router]);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  // Categorize bookings based on their status
  const pendingBookings = bookings.filter((booking) => booking.status === 'pending');
  const confirmedBookings = bookings.filter((booking) => booking.status === 'confirmed');
  const deniedBookings = bookings.filter((booking) => booking.status === 'denied');

  if(isLoggedIn)
  {
    return (
      <div className="ml-12">
    <div className="p-4 flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Pending Bookings</h2>
        <div className="flex flex-wrap gap-4">
          {pendingBookings.map((booking) => (
            <Request
              key={booking.requestId}
              name={booking.name}
              email={booking.email}
              phoneNumber={booking.phoneNumber}
              address={booking.address}
              status={booking.status}
              requestId={booking.requestId}
              triggerRefresh={triggerRefresh}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Confirmed Bookings</h2>
        <div className="flex flex-wrap gap-4">
          {confirmedBookings.map((booking) => (
            <Request
              key={booking.requestId}
              name={booking.name}
              email={booking.email}
              phoneNumber={booking.phoneNumber}
              address={booking.address}
              status={booking.status}
              requestId={booking.requestId}
              triggerRefresh={triggerRefresh}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Denied Bookings</h2>
        <div className="flex flex-wrap gap-4">
          {deniedBookings.map((booking) => (
            <Request
              key={booking.requestId}
              name={booking.name}
              email={booking.email}
              phoneNumber={booking.phoneNumber}
              address={booking.address}
              status={booking.status}
              requestId={booking.requestId}
              triggerRefresh={triggerRefresh}
            />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
else{
  return null;
}
}

export default Page;
