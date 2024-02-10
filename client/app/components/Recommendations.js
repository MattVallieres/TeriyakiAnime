"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export const Recommendations = () => {
  // keeping information of the data
  const [recommend, setRecommend] = useState([]);
  // data will load before they are fetched
  const [isLoading, setIsLoading] = useState(true);

  // fetches the data when page loads
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/recommendations/anime`
      );
      // checks if the response is successful
      if (!response.ok) {
        throw new Error(
          `Error fetching recommendations: ${response.status} - ${response.statusText}`
        );
      }
      // parse the response as JSON
      const data = await response.json();
      // show only 12 recommendations
      const slicedData = data.data.slice(0, 12);
      setRecommend(slicedData);
      // if the data is fetched, the loading will now show the data
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      // false in case of an error
      setIsLoading(false);
    }
  };

  return (
    <div className="my-40 px-8">
      <h2 className="font-bold uppercase text-xl xl:text-2xl mb-8">
        Today's Recommendations
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <div key={index}>
                <h1>loading...</h1>
              </div>
            ))
          : recommend.map((x, index) => (
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
                  <h3 className="mt-2 w-11/12"> {x.entry[1].title}</h3>
                </Link>
              </div>
            ))}
      </div>
      <div className="flex mt-10">  
        <Link
          href="/recommendation"
          className="border-[#1a1a1a] uppercase bg-[#1a1a1a] font-bold p-2 px-4 hover:bg-orange-600 duration-300 hover:border-orange-600 text-lg "
        >
          Browse more
        </Link>
      </div>
    </div>
  );
};
