const SingleReview = ({ review }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-5">
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src="user-avatar-url"
              alt="User Avatar"
            />
          </div>
          <div className="ml-4">
            <p className="text-lg font-semibold">{review.title}</p>
            <p className="text-sm text-gray-500">{review.date}</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-gray-700">{review.comment}</p>
        </div>
        <div className="mt-4">
          <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded-full">
            Rating: {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleReview;
