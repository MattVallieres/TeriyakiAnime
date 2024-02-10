"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Search() {
  // user's search query
  const [searchTerm, setSearchTerm] = useState("");
  // stores the search results obtained from an API request
  const [searchResults, setSearchResults] = useState([]);
  // indicates whether data is currently being loaded
  const [isLoading, setIsLoading] = useState(false);

  // function to handle changes in the search input field
  const handleSearchTermChange = (event) => {
    // update the 'searchTerm' state with the current value of the input field
    setSearchTerm(event.target.value);
  };

  // function to handle the search form submission
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setSearchResults([]);
    setIsLoading(true);

    try {
      // Fetch data based on the search term
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${searchTerm}&sfw`
      );
      if (!response.ok) {
        throw new Error(
          `Error fetching anime data: ${response.status} - ${response.statusText}`
        );
      }
      // parse the response as JSON
      const data = await response.json();
      const results = data.data;
      setSearchResults(results);
      // set loading off when data is fetched
      setIsLoading(false);
    } catch (error) {
      console.error("Error searching for anime:", error);
      // even if theres an error turn off the laoding
      setIsLoading(false);
    }
  };

  return (
    <div className="px-8">
      <div className="flex justify-center">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="bg-[#141519] border border-neutral-600 rounded px-4 m-6 py-2"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {isLoading && (
        <div className="flex items-center justify-center mt-40">
          <h1>loading...</h1>
        </div>
      )}
      {searchResults.length > 0 && (
        <div className="mb-20">
          <h2 className="text-3xl font-bold my-6">Search Results:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
            {searchResults.map((result) => (
              <div key={result.mal_id}>
                <Link href={`/anime/${result.mal_id}`}>
                  <img
                    src={result.images.jpg.image_url}
                    alt={result.title}
                    className="sm:h-[300px] md:h-[280px] lg:h-[280px] xl:h-[300px] 2xl:h-[370px] rounded duration-300 hover:opacity-40 w-full"
                  />
                  <h3 className="mt-2 w-11/12">{result.title}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      {searchTerm !== "" && searchResults.length === 0 && !isLoading && (
        <div className="my-20 px-4 md:px-8 text-center text-gray-500">
          No results found.
        </div>
      )}
    </div>
  );
}
