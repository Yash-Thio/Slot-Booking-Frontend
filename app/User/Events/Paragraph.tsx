'use client'; // Ensure this is a Client Component
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";

export default function Paragraph() {
  const [content, setContent] = useState<BlocksContent>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_EVENT_DETAILS}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
          }
        );
        setContent(result.data.data.attributes.Details);
      } catch (error) {
        console.error("Error fetching content", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="prose mx-auto my-10 text-neutral-300 text-lg font-bold">
        <BlocksRenderer content={content} />
      
    </div>
  );
}
