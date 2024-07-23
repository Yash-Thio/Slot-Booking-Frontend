import React from 'react'
import axios from 'axios';

export interface request{
  name: string;
  email: string;
  phoneNumber: number;
  address: string;
  status: string;
  requestId: string;
  triggerRefresh: () => void;
}

function Request(param:request) {

  async function handleConfirm(){
    try{
      const token = localStorage.getItem('Authorization');
      const response = await axios.put('http://localhost:5000/api/v1/admin/confirm',{bookingId: param.requestId},{
        headers:{
          'Authorization': token,
        }
      });
      if (response.status === 200) {
        param.triggerRefresh(); // Trigger refresh on success
      }
    }catch(e){
      console.log(e);
    }
  }
  async function handleDeny(){
    try{
      const token = localStorage.getItem('Authorization');
      const response = await axios.put('http://localhost:5000/api/v1/admin//deny',{bookingId: param.requestId},{
        headers:{
          'Authorization': token,
        }
      });
      if (response.status === 200) {
        param.triggerRefresh(); // Trigger refresh on success
      }
    }catch(e){
      console.log(e);
    }
  }

  return (
    <div className="flex flex-col mt-6 bg-white shadow-md bg-clip-border rounded-xl w-96">
      <div className="p-6 flex flex-col ">
        <div className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900" id="name">{param.name}</div>
        <div className="flex gap-7">
          <div id="phoneNumber">{param.phoneNumber}</div>
          <div id="email">{param.email}</div>
        </div>
        <div id="address">{param.address}</div>
      </div>
      <div className="px-6">status : {param.status}</div>
      <div className="flex p-6 justify-between">
        <button onClick={handleConfirm} className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
          Confirm
        </button>
        <button onClick={handleDeny} className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
          Deny
        </button>
      </div>
    </div>
  )
}

export default Request