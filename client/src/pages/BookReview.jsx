import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "react-router-dom";
import StarIcon from "@/components/ui/StarIcon";
import axios from "axios";

function BookReview() {
  const { bookId } = useParams();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [bookDetails, setBookDetails] = useState([]);
  const [newReview, setNewReview] = useState({
    user: "",
    rating: 0,
    comment: "",
  });

  const getBookDetails = async () => {
    let headersList = {
      Accept: "*/*",
    };

    let reqOptions = {
      url: `http://localhost:8080/api/books/getBookById/${bookId}`,
      method: "GET",
      headers: headersList,
    };
    let response = await axios.request(reqOptions);
    if (response) {
      console.log("response", response);
      setBookDetails([response.data]);
    }
  };
  useState(() => {
    getBookDetails();
  }, []);

  console.log("bookDetails", bookDetails);

  const handleReviewSubmit = async () => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    let bodyContent = JSON.stringify({
      user: newReview.user,
      rating: newReview.rating,
      comment: newReview.comment,
    });

    let reqOptions = {
      url: `http://localhost:8080/api/book/review/${bookId}`,
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    console.log("response", response.data);

    setNewReview({
      user: "",
      rating: 0,
      comment: "",
    });
    setShowReviewModal(false);
    getBookDetails();
  };

  const handleRatingChange = (e) => {
    setNewReview((prev) => ({ ...prev, rating: Number(e) }));
  };
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {bookDetails.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="relative">
                <img
                  // src="/placeholder.svg"
                  // alt={book.title}
                  width={600}
                  height={800}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-900 to-transparent opacity-50" />
              </div>
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-2 text-gray-900">
                  {book.title}
                </h1>
                <div className=" flex justify-between">
                  <p className="text-gray-600 text-sm mb-4">{book.author}</p>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                    {book.genre}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {book.description}
                </p>{" "}
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
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
                  </div>
                  <span className="ml-2 text-gray-500 text-sm">
                    {book.averageRating}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Reviews</h2>
                  <Button onClick={() => setShowReviewModal(true)}>
                    Post Review
                  </Button>
                </div>
                <div className="space-y-4">
                  {book.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-100 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          <StarIcon
                            className={`w-5 h-5 ${
                              review.rating >= 1
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                          <StarIcon
                            className={`w-5 h-5 ${
                              review.rating >= 2
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                          <StarIcon
                            className={`w-5 h-5 ${
                              review.rating >= 3
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                          <StarIcon
                            className={`w-5 h-5 ${
                              review.rating >= 4
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                          <StarIcon
                            className={`w-5 h-5 ${
                              review.rating >= 5
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        </div>
                        <span className="ml-2 text-gray-500 text-sm">
                          {review.rating}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                      <p className="text-gray-500 text-sm mt-2">
                        - {review.user} | Posted on {review.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>
              Share your thoughts on this book.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="user" className="text-right">
                Name
              </Label>
              <Input
                id="user"
                value={newReview.user}
                onChange={(e) =>
                  setNewReview((prev) => ({
                    ...prev,
                    user: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="rating" className="text-right">
                Rating
              </Label>
              <Select
                id="rating"
                value={newReview.rating}
                onValueChange={handleRatingChange}
                className="col-span-3"
              >
                <SelectTrigger>
                  {/* Directly reference rating for displayed value */}
                  <SelectValue>
                    {newReview.rating ? newReview.rating : "Select rating"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={1}>1</SelectItem>
                  <SelectItem value={2}>2</SelectItem>
                  <SelectItem value={3}>3</SelectItem>
                  <SelectItem value={4}>4</SelectItem>
                  <SelectItem value={5}>5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid items-start grid-cols-4 gap-4">
              <Label htmlFor="comment" className="text-right">
                Comment
              </Label>
              <Textarea
                id="comment"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
                className="col-span-3 h-24"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReviewModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleReviewSubmit}>Submit Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BookReview;
