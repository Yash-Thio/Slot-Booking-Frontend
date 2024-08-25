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
    <div className="overflow-x-hidden w-screen h-screen overflow-y-hidden no-scrollbar">
    <Sidebar />
    <div className="ml-12 h-full flex items-center justify-center">
      <div className="w-full">
        {/* <InfiniteMovingCards cards={cards} direction="right" speed="slow" />
        <InfiniteMovingCards cards={cards} direction="left" speed="slow" /> */}
      </div>
    </div>
  </div>
  
  );
}

const cards = [
  {
    id: 1,
    className: "md:col-span-1",
    thumbnail:
      "/lovethyself.jpeg",
  },
  {
    id: 2,
    className: "col-span-1",
    thumbnail:
      "/lovethyself.jpeg",
  },
  {
    id: 3,
    className: "col-span-1",
    thumbnail:
      "/lovethyself.jpeg",
  },

  {
    id: 4,
    className: "md:col-span-1",
    thumbnail:
      "/lovethyself.jpeg",
  },
  {
    id: 5,
    className: "col-span-1",
    thumbnail:
      "/lovethyself.jpeg",
  },
  {
    id: 6,
    className: "col-span-1",
    thumbnail:
      "/lovethyself.jpeg",
  },

  {
    id: 7,
    className: "col-span-1",
    thumbnail:
      "/lovethyself.jpeg",
  },
  {
    id: 8,
    className: "md:col-span-1",
    thumbnail:
      "/lovethyself.jpeg",
  },
];
