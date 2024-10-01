"use client";
import React from "react";
import { CardDemo } from "../../components/ui/card";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

type Item = {
    id: number;
    attributes: any; 
  };

function Page() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_ITEMS}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
          }
        );
        // console.log(result.data.data);
        setItems(result.data.data);
      } catch (error) {
        console.error("Error fetching Items", error);
      }
    };

    fetchItems();
  }, []);

  const renderedCards = useMemo(() => {
    return items.map((item) => (
      <CardDemo key={item.id} data={item.attributes} />
    ));
  }, [items]);

  return (
    // <div className="overflow-x-hidden">
    //   <Sidebar />
      <div className="ml-12">
        <div className="flex flex-wrap">
            {renderedCards}
            </div>
      </div>
    // </div>
  );
}

export default Page;
