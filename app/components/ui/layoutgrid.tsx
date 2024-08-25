"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/app/utils/cn";

type Card = {
  id: number;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  return (
    <div className="p-10 w-full h-full align-middle grid grid-cols-1 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.id} className={cn(card.className, "relative")}>
          <motion.div
            className="relative overflow-hidden bg-white rounded-xl h-80 aspect-square"
            layoutId={`card-${card.id}`}
          >
            <ImageComponent card={card} />
          </motion.div>
        </div>
      ))}
    </div>
  );
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      height="500"
      width="500"
      className="object-cover object-top absolute inset-0 h-full w-full transition duration-200"
      alt="thumbnail"
    />
  );
};
