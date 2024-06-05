import React, { useEffect, useState, useContext } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";
import axios from "axios";
import StarIcon from "@/components/ui/StarIcon";
import { searchContext } from "@/layout/Layout";
import { booksContext } from "@/layout/Layout";

function Home() {
  const { searchText } = useContext(searchContext);
  const { bookData, setBookData } = useContext(booksContext);
  const itemsPerPage = 8;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemsPerPage);
  const [totalBooks, setTotalBooks] = useState(0);
  const [filteredBookData, setFilteredBookData] = useState([]);

  const getBooks = async () => {
    let headersList = {
      Accept: "*/*",
    };

    let reqOptions = {
      url: "http://localhost:8080/api/books/getAllBooks",
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    if (response) {
      setBookData(response.data);
      let booksCount = response.data.length;
      setTotalBooks(response.data.length);
    }
    // console.log(response.data);
  };

  useEffect(() => {
    getBooks();
  }, []);

  const getRandomGradient = () => {
    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const angle = Math.floor(Math.random() * 360);
    const color1 = getRandomColor();
    const color2 = getRandomColor();

    return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  };

  useEffect(() => {
    if (searchText.trim() !== "") {
      const filteredBooks = bookData.filter(
        (book) =>
          book.title.toLowerCase().includes(searchText.toLowerCase()) ||
          book.author.toLowerCase().includes(searchText.toLowerCase()) ||
          book.genre.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredBookData(filteredBooks);
      setStartIndex(0);
      setEndIndex(Math.min(itemsPerPage, filteredBooks.length));
    } else {
      setFilteredBookData(bookData);
      setStartIndex(0);
      setEndIndex(Math.min(itemsPerPage, bookData.length));
    }
  }, [searchText, bookData]);

  return (
    <main className="flex-1 py-8 px-12 mt-3 md:px-12 lg:px-28 2xl:px-62 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4    gap-6">
        {filteredBookData.slice(startIndex, endIndex).map((book, index) => (
          <Link key={index} to={`/book/${book._id}`} className="group">
            {/* <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-lg"> */}
            <div className=" rounded-lg overflow-hidden shadow-md transition-transform duration-300 ">
              <div className="relative">
                <img
                  // src="/placeholder.svg"
                  width={300}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div
                  className="absolute top-0 left-0 w-full h-full opacity-50 transition-opacity duration-300 group-hover:opacity-0"
                  style={{ background: getRandomGradient() }}
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-lg font-bold mb-2 text-gray-900">
                  {book.title}
                </h3>
                <p className="text-gray-600 text-sm">{book.author}</p>
                <div className="flex items-center mt-2">
                  <StarIcon
                    className={`w-5 h-5 ${
                      book.averageRating >= 1
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                  <StarIcon
                    className={`w-5 h-5 ${
                      book.averageRating >= 2
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                  <StarIcon
                    className={`w-5 h-5 ${
                      book.averageRating >= 3
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                  <StarIcon
                    className={`w-5 h-5 ${
                      book.averageRating >= 4
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                  <StarIcon
                    className={`w-5 h-5 ${
                      book.averageRating >= 5
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                  <span className="ml-2 text-gray-500 text-sm">
                    {book.averageRating}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className={
                  startIndex === 0
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
                onClick={() => {
                  const newStartIndex = Math.max(startIndex - itemsPerPage, 0);
                  const newEndIndex = Math.min(
                    newStartIndex + itemsPerPage,
                    bookData.length
                  );
                  setStartIndex(newStartIndex);
                  setEndIndex(newEndIndex);
                }}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                className={
                  endIndex >= bookData.length
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
                onClick={() => {
                  const newStartIndex = Math.min(
                    startIndex + itemsPerPage,
                    bookData.length
                  );
                  const newEndIndex = Math.min(
                    newStartIndex + itemsPerPage,
                    bookData.length
                  );
                  setStartIndex(newStartIndex);
                  setEndIndex(newEndIndex);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}

export default Home;
