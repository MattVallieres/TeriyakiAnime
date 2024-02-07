"use client"
import { BiRightArrow } from "react-icons/bi";
import { useState, useEffect } from "react";
import { GiChicken } from 'react-icons/gi';
import Link from "next/link";

export const Recommendations = () => {
  // keeping information of the data
  const [recommend, setRecommend] = useState([]);
  // data will load before they are fetched
  const [isLoading, setIsLoading] = useState(true);

  // renders the page when the page loads
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/recommendations/anime`);
      // checks if the response is successful 
      if (!response.ok) {
        throw new Error(`Error fetching recommendations: ${response.status} - ${response.statusText}`);
      }
      // parse the response as JSON
      const data = await response.json();
      // show only 6 recommendations
      const slicedData = data.data.slice(0, 6);
      setRecommend(slicedData);
      // if the data is fetched, the loading will now show the data
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      // false in case of an error
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="my-20 px-4 md:px-8">
        <h1 className="mb-4 uppercase font-bold text-lg md:text-xl">recommendations</h1>
        <div className="flex">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-8 w-50">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                <div key={`${index}`} className="w-44 relative">
                  <div className="text-4xl animate-pulse my-20">
                    <GiChicken />
                  </div>
                </div>
              ))
              : recommend.map((x, index) => (
                <div key={`${x.entry[1].mal_id}-${index}`} className="w-44 relative">
                  <Link href={`/anime/${x.entry[1].mal_id}`}>
                    <img
                      src={x.entry[1].images.jpg.image_url}
                      alt={x.entry[1].title}
                      className="h-60 w-44 rounded duration-300 ease-in-out hover:scale-105 hover:opacity-75"
                    />
                    <h3 className="flex-wrap text-base my-2">
                      {x.entry[1].title.length > 50 ? `${x.entry[1].title.slice(0, 50)}...` : x.entry[1].title}
                    </h3>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div className="flex">
          <Link href="/recommendation" className="text-sm font-bold uppercase bg-[#202124] py-2 px-4 mt-10 hover:bg-orange-600 duration-200 flex items-center">browse Recommendations</Link>
        </div>
      </div>
    </div>
  );
};