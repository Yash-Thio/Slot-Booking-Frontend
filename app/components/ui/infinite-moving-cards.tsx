"use client";

import { cn } from "../../utils/cn";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Card = {
    id: number;
    className: string;
    thumbnail: string;
  };

export const InfiniteMovingCards = ({
    cards,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
    cards: {
        id: number;
        className: string;
        thumbnail: string;
      }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
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
      </ul>
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