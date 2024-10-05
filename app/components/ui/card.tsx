"use client";
import React from "react";
import { cn } from "../../utils/cn";

export function CardDemo(props: any) {
  // Safely access the image data
  const imageData = (props.data.Image.data[0].attributes.url)? props.data.Image.data[0].attributes.url : "/path/to/placeholder-image.jpg";

  return (
    <div className="max-w-xs w-full group/card p-4">
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4"
        )}
        style={{
          backgroundImage: `url(${imageData})`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-1"></div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-neutral-200 relative z-1">
            {props.data?.Title || "No Title Available"}
          </h1>
          <p className="font-bold text-sm text-neutral-200 relative z-1 my-4">
            {props.data?.Small_Description || "No Description Available"}
          </p>
        </div>
      </div>
    </div>
  );
}
