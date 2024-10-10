import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AddReview = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState(null);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersResponse = await fetch("http://localhost:3001/users");
        const usersData = await usersResponse.json();
        const currentUser = usersData.find((user) => user.email === userEmail);
        if (currentUser) {
          setUserId(currentUser.id);
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUserData();
  }, [userEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not logged in. Please log in to submit a review.");
      return;
    }

    try {
      const reviewsResponse = await fetch(
        `http://localhost:3001/announcements/${id}`
      );
      const reviewsData = await reviewsResponse.json();
      console.log("Fetched Reviews Data:", reviewsData);

      const reviewId = reviewsData.length
        ? Math.max(reviewsData.map((r) => r.reviewId)) + 1
        : 1;

      const reviewData = {
        reviewId,
        announcementId: id,
        userId,
        comment,
        rating,
        title,
        date: new Date().toLocaleDateString(),
      };

      console.log("Review Data to Post:", reviewData);

      const response = await fetch(
        `http://localhost:3001/announcements/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reviews: [reviewData] }),
        }
      );

      if (!response.ok) {
        alert("failed to add review :(");
      }

      alert("Review added successfully");

      setTitle("");
      setRating(0);
      setComment("");
    } catch (error) {
      alert("Failed to add review, please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Submit Your Review</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rating</label>
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRating(index + 1)}
                  className={`h-8 w-8 flex items-center justify-center ${
                    rating > index ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.121-6.537L1 7.5l6.545-.957L10 1l2.455 5.543L19 7.5l-4.243 3.053 1.121 6.537z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="comment">
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
