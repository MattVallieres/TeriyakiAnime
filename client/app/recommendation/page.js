"use client";
import React, { useEffect, useState } from "react";
import { GiChicken } from "react-icons/gi";
import Link from "next/link";

export default function Recommendation() {
  const [fetchRecommend, setFetchRecommend] = useState([]);
  // When we're waiting to see the anime, we show a spinning icon. When we see the anime, we stop the spinning icon
  const [isLoading, setIsLoading] = useState(true);

  // fetch data when page loads
  useEffect(() => {
    fetchData();
  }, []);

  // fetch api
  const fetchData = async () => {
    try {
      // Hey API, give us the top anime for the current page!
      const response = await fetch(
        `https://api.jikan.moe/v4/recommendations/anime`
      );
      // Check if the response is successful (status code 200)
      if (!response.ok) {
        throw new Error(
          `Error fetching anime data: ${response.status} - ${response.statusText}`
        );
      }
      // Parse the response as JSON
      const data = await response.json();
      // We're done fetching data, so set isLoading to false
      setIsLoading(false);
      setFetchRecommend(data.data);
    } catch (error) {
      console.error("Something went wrong:", error);
      // Also, set isLoading to false in case of an error
      setIsLoading(false);
    }
  };

  return (
    <div className="my-40 px-8">
        <h2 className="font-bold uppercase text-xl xl:text-2xl mb-8">Today's recommendations!</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
            {isLoading
              ? Array.from({ length: 25 }).map((_, index) => (
                  <div key={`loader-${index}`} className="">
                    <div>
                      <h1>loading...</h1>
                    </div>
                  </div>
                ))
              : fetchRecommend.map((x, index) => (
                  <div key={`${x.entry[1].mal_id}-${index}`}>
                    <Link
                      href={`/anime/${x.entry[1].mal_id}`}
                      className="flex flex-col"
                    >
                      <img
                        src={x.entry[1].images.jpg.image_url}
                        alt={x.entry[1].title}
                        className="sm:h-[300px] md:h-[280px] lg:h-[280px] xl:h-[300px] 2xl:h-[370px] rounded duration-300 hover:opacity-40 w-full"
                      />
                      <h3 className="mt-2 w-11/12">{x.entry[1].title}</h3>
                    </Link>
                  </div>
                ))}
          </div>
        </div>
  );
}
