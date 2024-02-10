"use client";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Popular() {
  // keeping information of the data
  const [getPopular, setGetPopular] = useState([]);
  // 'currentPage' keeps track of the page we're currently on
  const [currentPage, setCurrentPage] = useState(1);
  // data will load before they are fetched
  const [isLoading, setIsLoading] = useState(true);
  // tells us how many pages there are
  const [totalPages, setTotalPages] = useState(0);
  // 'displays the page numbers
  const [displayedPages, setDisplayedPages] = useState([]);

  // renders the current page 
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // renders the current and total pages 
  useEffect(() => {
    generateDisplayedPages();
  }, [totalPages, currentPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/top/anime?page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error(
          `Error fetching anime data: ${response.status} - ${response.statusText}`
        );
      }
      // parse the response as JSON
      const data = await response.json();
      // remove the loading as it the info is fetched
      setIsLoading(false);
      // store it in the usestate
      setGetPopular(data.data);
      // how many pages they are in the popular api
      setTotalPages(data.pagination.last_visible_page);
    } catch (error) {
      console.error("Something went wrong:", error);
      // if an error occurs, error will also be set false
      setIsLoading(false);
    }
  };

  // decieds which page number to show
  const generateDisplayedPages = () => {
    // showingly up to 5 pages at a time
    const maxDisplayedPages = 5;
    // cut the number in half
    const halfDisplayedPages = Math.floor(maxDisplayedPages / 2);
    let startPage = Math.max(currentPage - halfDisplayedPages, 1);
    let endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages);

    if (endPage - startPage + 1 < maxDisplayedPages) {
      startPage = Math.max(endPage - maxDisplayedPages + 1, 1);
    }

    // displays the page number
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    setDisplayedPages(pages);
  };

  const handleNextPage = async () => {
    // goes to the next page
    setCurrentPage((prevPage) => prevPage + 1);
    // brings the user back to the top of the page
    await window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousPage = async () => {
    // goes to the previous page
    setCurrentPage((prevPage) => prevPage - 1);
    // brings the user back to the top of the page
    await window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageClick = async (page) => {
    // pressing a number brings us to that page
    setCurrentPage(page);
    // brings the user back to the top of the page
    await window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="my-40 px-8">
        <h2 className="font-bold uppercase text-xl xl:text-2xl mb-8">
          What's Popular
        </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
            {isLoading
              ? Array.from({ length: 25 }).map((_, index) => (
                  <div key={`loader-${index}`}>
                    <div>
                      <h1>loading...</h1>
                    </div>
                  </div>
                ))
              : getPopular.map((x) => (
                  <div key={x.mal_id}>
                    <Link href={`/anime/${x.mal_id}`}>
                      <img
                        src={x.images.jpg.image_url}
                        alt={x.title}
                        className="sm:h-[300px] md:h-[280px] lg:h-[280px] xl:h-[300px] 2xl:h-[370px] rounded duration-300 hover:opacity-40 w-full"
                      />
                      <h3 className="mt-2 w-11/12">{x.title}</h3>
                    </Link>
                  </div>
                ))}
          </div>
      </div>

      <div className="flex uppercase justify-center mt-6 mb-20 text-[#ff9100] text-2xl">
        {currentPage > 1 && (
          <button onClick={handlePreviousPage}>
            <MdOutlineKeyboardDoubleArrowLeft />
          </button>
        )}
        {displayedPages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`mx-1 px-2 ${
              currentPage === page
                ? "text-white bg-orange-600"
                : "text-white bg-[#1a1a1a] hover:bg-orange-600 duration-300"
            }`}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button onClick={handleNextPage}>
            <MdOutlineKeyboardDoubleArrowRight />
          </button>
        )}
      </div>
    </>
  );
}
