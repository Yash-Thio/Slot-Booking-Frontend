'use client'
import Sidebar from "../components/adminSidebar";

export default function UserLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
      <div className="overflow-x-hidden w-screen h-screen no-scrollbar">
        <Sidebar/>
        {children}
      </div>
    );
  }