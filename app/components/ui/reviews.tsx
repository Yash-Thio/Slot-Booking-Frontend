'use client';

import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

export const ReviewCard = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        id: number;
        attributes: any; 
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollerRef = useRef<HTMLUListElement>(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
        if (items.length > 0) {
            setUpAnimation();
        }
    }, [items]);

    const setUpAnimation = () => {
        const scrollerElement = scrollerRef.current;
        if (scrollerElement) {
            // Clear previous children if any
            scrollerElement.innerHTML = "";

            // Duplicate items to create seamless scrolling
            const content = items.concat(items); // Duplicate the items
            content.forEach(item => {
                const listItem = document.createElement("li");
                listItem.className =
                    "w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]";
                listItem.style.background =
                    "linear-gradient(180deg, var(--stone-800), var(--stone-900)";
                listItem.innerHTML = `
                    <blockquote>
                        <div aria-hidden="true" class="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"></div>
                        <span class="relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">${item.attributes.Review}</span>
                        <div class="relative z-20 mt-6 flex flex-row items-center">
                            <span class="flex flex-col gap-1">
                                <span class="text-sm leading-[1.6] text-gray-400 font-normal">${item.attributes.Name}</span>
                            </span>
                        </div>
                    </blockquote>
                `;
                scrollerElement.appendChild(listItem);
            });

            // Apply animation after items are rendered
            setStart(true);
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 overflow-hidden",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
                style={{
                    "--animation-duration": speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s",
                    "--animation-direction": direction === "left" ? "forwards" : "reverse"
                } as React.CSSProperties}
            />
        </div>
    );
};
