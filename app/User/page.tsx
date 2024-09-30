"use client";
import React from "react";
import Sidebar from "../components/sidebar";
import { motion } from "framer-motion";
import { ImagesSlider } from "../components/ui/images-slider";
import { LayoutGrid } from "../components/ui/layoutgrid";
import {InfiniteMovingCards} from "../components/ui/infinite-moving-cards"

export default function page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return(
    // <div className="overflow-x-hidden w-screen h-screen overflow-y-hidden no-scrollbar">
    // <Sidebar />
    <div className="ml-12 h-full flex items-center justify-center">
      <div className="w-full">
      <div className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600 py-4">
            <h1 className="text-7xl lg:text-7xl font-bold text-center text-opacity-80 text-black relative z-1">
              Love Thy Self
            </h1>
            <h1 className="text-xl text-center text-opacity-80 font-bold">
              
            </h1>
          </div>
      </div>
    </div>
  // </div>
  
  );
}

