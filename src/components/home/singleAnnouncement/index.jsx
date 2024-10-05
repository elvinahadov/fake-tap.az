import React from "react";
import { Link } from "react-router-dom";

const SingleAnnouncements = ({
  title,
  image,
  description,
  location,
  price,
  id,
}) => {
  return (
    <div className="xl:w-1/4 md:w-1/2 p-4">
      <Link to={`/detailPage/${id}`}>
        <div className="bg-gray-100 p-6 rounded-lg h-[400px] flex flex-col gap-1">
          <img
            className="h-40 w-full object-fill object-center rounded"
            src={`${image}`}
          />
          <p className="leading-relaxed font-bold text-red-500 text-2xl">
            {title}
          </p>
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-gray-900 font-medium title-font">
              {location}
            </h2>
            <p className="text-lg text-gray-900 font-medium title-font">
              {`${price} ₼`}
            </p>
          </div>
          <div className="w-full h-[200px] overflow-auto">
            <p className="text-red-500 text-[22px] ">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SingleAnnouncements;
