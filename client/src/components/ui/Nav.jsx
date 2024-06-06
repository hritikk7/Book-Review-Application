import React, { useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { searchContext } from "@/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { booksContext } from "@/layout/Layout";
function Nav() {
  const { setSearchText } = useContext(searchContext);
  const { setBookData } = useContext(booksContext);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
  });
  const [errors, setErrors] = useState({});

  const getBooks = async () => {
    let headersList = {
      Accept: "*/*",
    };

    let reqOptions = {
      url: "https://book-review-application-backend.vercel.app/api/books/getAllBooks",
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    if (response) {
      setBookData(response.data);
    }
  };

  const handleAddBookSubmit = async () => {
    let validationErrors = {};
    if (!newBook.title) validationErrors.title = "Title is required";
    if (!newBook.author) validationErrors.author = "Author is required";
    if (!newBook.description) validationErrors.description = "Description is required";
    if (!newBook.genre) validationErrors.genre = "Genre is required";
  
    // If there are errors, set them in the state and return early
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    let bodyContent = JSON.stringify({
      title: newBook.title,
      author: newBook.author,
      description: newBook.description,
      genre: newBook.genre,
    });

    let reqOptions = {
      url: `https://book-review-application-backend.vercel.app/api/books/createBook`,
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);

    setNewBook({
      title: "",
      author: "",
      description: "",
      genre: "",
    });
    getBooks()
    setShowAddBookModal(false);


  };
  return (
    <header className="bg-gray-900 text-white py-4 px-6 md:px-8 flex items-center justify-between">
      <Link href="#" className="text-xl font-bold">
        Book Reviews
      </Link>
      <div className="relative w-full max-w-md">
        <Input
          type="search"
          placeholder="Search books..."
          className="bg-gray-800 border-none pl-10 pr-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
          onChange={(e) => setSearchText(e.target.value)}
        />
        
      </div>
      <Button
        onClick={() => setShowAddBookModal(true)}
        className="inline-flex items-center justify-center rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-primary-500/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-600 disabled:pointer-events-none disabled:opacity-50"
      >
        Post Book
      </Button>
      <Dialog open={showAddBookModal} onOpenChange={setShowAddBookModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a Book</DialogTitle>
            <DialogDescription>
              Add a new book to the library.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newBook.title}
                onChange={(e) =>
                  setNewBook((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
              {errors.title && <span className="text-sm   text-center text-red-500">{errors.title}</span>}
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="author" className="text-right">
                Author
              </Label>
              <Input
                id="author"
                value={newBook.author}
                onChange={(e) =>
                  setNewBook((prev) => ({
                    ...prev,
                    author: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
                 {errors.author && <span className="text-sm  text-center text-red-500">{errors.author}</span>}
            <div className="grid items-start grid-cols-4 gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newBook.description}
                onChange={(e) =>
                  setNewBook((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="col-span-3 h-24"
              />
            </div>
                {errors.description && <span className="text-sm  text-center text-red-500">{errors.description}</span>}
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="genre" className="text-right">
                Genre
              </Label>
              <Input
                id="genre"
                value={newBook.genre}
                onChange={(e) =>
                  setNewBook((prev) => ({
                    ...prev,
                    genre: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
                 {errors.genre && <span className="text-sm  text-center text-red-500">{errors.genre}</span>}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddBookModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddBookSubmit}>Add Book</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Nav;
