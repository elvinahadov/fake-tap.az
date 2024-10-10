import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddReview from "../../components/detailPage/addReview";
import SingleReview from "../../components/detailPage/singleReview";

const DetailPage = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAnnouncement = async () => {
    const response = await fetch(
      `http://localhost:3001/announcements/${params.id}`
    );
    const data = await response.json();
    setData(data);
    setReviews(data.reviews);
  };

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              {data.title}
            </h1>
            <div className="flex mb-4">
              <p className="flex-grow text-red-500 border-b-2 border-red-500 py-2 text-lg px-1">
                Description
              </p>
            </div>
            <p className="leading-relaxed text-black font-semibold mb-4">
              {data.description}
            </p>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Location</span>
              <span className="ml-auto text-gray-900">{data.location}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Date</span>
              <span className="ml-auto text-gray-900">{data.date}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Time</span>
              <span className="ml-auto text-gray-900">{data.time}</span>
            </div>
            <div className="flex border-t border-gray-200 py-4">
              <span className="title-font font-medium text-2xl text-gray-900">
                {`Price: ${data.price} ₼`}
              </span>
              <button
                onClick={toggleModal}
                className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
              >
                Contact Info
              </button>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-contain rounded"
            src={`${data.imageUrl}`}
          />
        </div>
      </div>
      <div className="container max-w-[1128px] mx-auto items-center flex">
        {reviews.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold">Reviews</h3>
            {reviews.map((review) => (
              <div key={review.reviewId} className="border-b py-2">
                <h4 className="font-bold">{review.title}</h4>
                <p>{review.comment}</p>
                <p className="text-sm text-gray-500">
                  Rating: {review.rating} / 5
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
        <AddReview />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
          <div className="modal-container bg-white w-11/12 md:w-1/3 rounded shadow-lg z-50">
            <div className="modal-header flex justify-between items-center p-4">
              <h2 className="text-lg font-semibold">Contact Information</h2>
              <button onClick={toggleModal} className="text-red-500">
                X
              </button>
            </div>
            <div className="modal-body p-4">
              <p className="text-gray-700">Email: {data.contactEmail}</p>
              <p className="text-gray-700">Phone: {data.contactPhone}</p>
            </div>
            <div className="modal-footer flex justify-end p-4">
              <button
                onClick={toggleModal}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailPage;
